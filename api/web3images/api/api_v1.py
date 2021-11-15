from core.api.kiba_router import KibaRouter
from fastapi import Response

from web3images.manager import Web3ImagesManager


def create_api(web3ImagesManager: Web3ImagesManager) -> KibaRouter:
    router = KibaRouter()

    @router.get('/collections/{registryAddress}/tokens/{tokenId}/image')
    async def get_collection_token_image(registryAddress: str, tokenId: str):
        imageUrl = await web3ImagesManager.get_collection_token_image(registryAddress=registryAddress, tokenId=tokenId)
        return Response(status_code=301, headers={'Location': imageUrl})

    @router.get('/accounts/{accountAddress}/image')
    async def get_account_image(accountAddress: str):
        imageUrl = await web3ImagesManager.get_account_image(accountAddress=accountAddress)
        return Response(status_code=301, headers={'Location': imageUrl})

    return router
