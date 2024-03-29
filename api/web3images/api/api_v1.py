from fastapi import APIRouter
from fastapi import Response

from web3images.manager import Web3ImagesManager


def create_api(web3ImagesManager: Web3ImagesManager) -> APIRouter:
    router = APIRouter()

    @router.get('/collections/{registryAddress}/tokens/{tokenId}/image')
    async def get_collection_token_image(registryAddress: str, tokenId: str) -> Response:
        imageData = await web3ImagesManager.get_collection_token_image(registryAddress=registryAddress, tokenId=tokenId)
        return Response(content=imageData.content, headers={'Content-Type': imageData.mimeType})

    @router.get('/accounts/{accountAddress}/image')
    async def get_account_image(accountAddress: str) -> Response:
        imageData = await web3ImagesManager.get_account_image(accountAddress=accountAddress)
        return Response(content=imageData.content, headers={'Content-Type': imageData.mimeType})

    return router
