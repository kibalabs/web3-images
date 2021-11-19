import datetime
from typing import Optional

from core.util.typing_util import JSON
from pydantic import dataclasses

@dataclasses.dataclass
class TokenMetadata:
    registryAddress: str
    tokenId: str
    metadataUrl: str
    imageUrl: Optional[str]
    name: Optional[str]
    description: Optional[str]
    attributes: JSON
    tokenMetadataId: int
    createdDate: datetime.datetime
    updatedDate: datetime.datetime


@dataclasses.dataclass
class ImageData:
    mimeType: str
    content: bytes
