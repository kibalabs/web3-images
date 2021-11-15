from typing import Mapping

from web3images.model import TokenMetadata
from web3images.store.schema import TokenMetadataTable


def token_metadata_from_row(row: Mapping) -> TokenMetadata:
    return TokenMetadata(
        tokenMetadataId=row[TokenMetadataTable.c.tokenMetadataId],
        createdDate=row[TokenMetadataTable.c.createdDate],
        updatedDate=row[TokenMetadataTable.c.updatedDate],
        registryAddress=row[TokenMetadataTable.c.registryAddress],
        tokenId=row[TokenMetadataTable.c.tokenId],
        metadataUrl=row[TokenMetadataTable.c.metadataUrl],
        imageUrl=row[TokenMetadataTable.c.imageUrl],
        name=row[TokenMetadataTable.c.name],
        description=row[TokenMetadataTable.c.description],
        attributes=row[TokenMetadataTable.c.attributes],
    )
