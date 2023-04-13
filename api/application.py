import os

from core import logging
from core.api.health import create_api as create_health_api
from core.api.middleware.database_connection_middleware import DatabaseConnectionMiddleware
from core.api.middleware.exception_handling_middleware import ExceptionHandlingMiddleware
from core.api.middleware.logging_middleware import LoggingMiddleware
from core.api.middleware.server_headers_middleware import ServerHeadersMiddleware
from core.web3.eth_client import RestEthClient
from core.store.database import Database
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.util.value_holder import RequestIdHolder
from core.http.basic_authentication import BasicAuthentication
from core.requester import Requester

from web3images.api.api_v1 import create_api as create_v1_api
from web3images.internal.blockies_generator import BlockiesGenerator
from web3images.manager import Web3ImagesManager
from web3images.store.retriever import Retriever

requestIdHolder = RequestIdHolder()
name = os.environ.get('NAME', 'notd-api')
version = os.environ.get('VERSION', 'local')
environment = os.environ.get('ENV', 'dev')
isRunningDebugMode = environment == 'dev'

if isRunningDebugMode:
    logging.init_basic_logging()
else:
    logging.init_json_logging(name=name, version=version, environment=environment, requestIdHolder=requestIdHolder)

ethNodeUsername = os.environ["ETH_NODE_USERNAME"]
ethNodePassword = os.environ["ETH_NODE_PASSWORD"]
ethNodeUrl = os.environ["ETH_NODE_URL"]

databaseConnectionString = Database.create_psql_connection_string(username=os.environ["DB_USERNAME"], password=os.environ["DB_PASSWORD"], host=os.environ["DB_HOST"], port=os.environ["DB_PORT"], name=os.environ["DB_NAME"])
database = Database(connectionString=databaseConnectionString)
retriever = Retriever(database=database)

ethNodeAuth = BasicAuthentication(username=ethNodeUsername, password=ethNodePassword)
ethNodeRequester = Requester(headers={'Authorization': f'Basic {ethNodeAuth.to_string()}'})
ethClient = RestEthClient(url=ethNodeUrl, requester=ethNodeRequester)
blockiesGenerator = BlockiesGenerator()

web3ImagesManager = Web3ImagesManager(retriever=retriever, ethClient=ethClient, blockiesGenerator=blockiesGenerator)

app = FastAPI()
app.include_router(router=create_health_api(name=name, version=version, environment=environment))
app.include_router(prefix='/v1', router=create_v1_api(web3ImagesManager=web3ImagesManager))
app.add_middleware(ExceptionHandlingMiddleware)
app.add_middleware(ServerHeadersMiddleware, name=name, version=version, environment=environment)
app.add_middleware(LoggingMiddleware, requestIdHolder=requestIdHolder)
app.add_middleware(DatabaseConnectionMiddleware, database=database)
app.add_middleware(CORSMiddleware, allow_credentials=True, allow_methods=['*'], allow_headers=['*'], expose_headers=['*'], allow_origins=['*'])

@app.on_event('startup')
async def startup():
    await database.connect()

@app.on_event('shutdown')
async def shutdown():
    await database.disconnect()
    await ethNodeRequester.close_connections()
