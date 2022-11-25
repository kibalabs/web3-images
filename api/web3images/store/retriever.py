from core.exceptions import NotFoundException
from core.store.retriever import Retriever as CoreRetriever

from web3images.model import TokenMetadata
from web3images.store.schema import TokenMetadataTable
from web3images.store.schema_conversions import token_metadata_from_row


class Retriever(CoreRetriever):

    async def get_token_metadata_by_registry_token_id(self, registryAddress: str, tokenId: str) -> TokenMetadata:
        query = TokenMetadataTable.select() \
            .where(TokenMetadataTable.c.registryAddress == registryAddress) \
            .where(TokenMetadataTable.c.tokenId == tokenId)
        result = await self.database.execute(query=query)
        row = result.mappings().first()
        if not row:
            raise NotFoundException(message=f'TokenMetadata with registry:{registryAddress} tokenId:{tokenId} not found')
        tokenMetadata = token_metadata_from_row(row)
        return tokenMetadata
