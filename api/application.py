import logging
import os

from core.api.health import create_api as create_health_api
from databases import Database
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from web3images.api.api_v1 import create_api as create_v1_api
from web3images.manager import Web3ImagesManager
from web3images.store.retriever import Retriever

logging.basicConfig(level=logging.INFO)

database = Database(f'postgresql://{os.environ["DB_USERNAME"]}:{os.environ["DB_PASSWORD"]}@{os.environ["DB_HOST"]}:{os.environ["DB_PORT"]}/{os.environ["DB_NAME"]}')
retriever = Retriever(database=database)

web3ImagesManager = Web3ImagesManager(retriever=retriever)

app = FastAPI()
app.include_router(router=create_health_api(name=os.environ.get('NAME', 'web3images'), version=os.environ.get('VERSION')))
app.include_router(prefix='/v1', router=create_v1_api(web3ImagesManager=web3ImagesManager))
app.add_middleware(CORSMiddleware, allow_credentials=True, allow_methods=['*'], allow_headers=['*'], expose_headers=[
    'X-Response-Time',
    'X-Server',
    'X-Server-Version',
    'X-Kiba-Token',
], allow_origins=[
    'https://web3-images.kibalabs.com',
    'http://localhost:3000',
])

@app.on_event('startup')
async def startup():
    await database.connect()

@app.on_event('shutdown')
async def shutdown():
    await database.disconnect()
    await requester.close_connections()
