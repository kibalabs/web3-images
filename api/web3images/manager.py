import base64
import json

from core.exceptions import FoundRedirectException
from core.util import chain_util
from core.web3.eth_client import EthClientInterface
from ens.utils import normal_name_to_hash as ens_name_to_hash
from ens.utils import normalize_name as ens_normalize_name

from web3images.internal.blockies_generator import BlockiesGenerator
from web3images.model import ImageData
from web3images.store.retriever import Retriever


class Web3ImagesManager:

    def __init__(self, retriever: Retriever, ethClient: EthClientInterface, blockiesGenerator: BlockiesGenerator):
        self.retriever = retriever
        self.ethClient = ethClient
        self.blockiesGenerator = blockiesGenerator
        with open('./contracts/ENSRegistry.json') as contractJsonFile:
            ensRegistryContractJson = json.load(contractJsonFile)
        self.ensRegistryContractAddress = ensRegistryContractJson['address']
        self.ensRegistryContractAbi = ensRegistryContractJson['abi']
        self.ensRegistryResolveFunctionAbi = [internalAbi for internalAbi in self.ensRegistryContractAbi if internalAbi.get('name') == 'resolver'][0]
        with open('./contracts/ENSDefaultReverseResolver.json') as contractJsonFile:
            ensReverseResolverContractJson = json.load(contractJsonFile)
        self.ensReverseResolverContractAbi = ensReverseResolverContractJson['abi']
        self.ensReverseResolverNameFunctionAbi = [internalAbi for internalAbi in self.ensReverseResolverContractAbi if internalAbi.get('name') == 'name'][0]
        with open('./contracts/ENSPublicResolver.json') as contractJsonFile:
            ensPublicResolverContractJson = json.load(contractJsonFile)
        self.ensPublicResolverContractAbi = ensPublicResolverContractJson['abi']
        self.ensPublicResolverTextFunctionAbi = [internalAbi for internalAbi in self.ensPublicResolverContractAbi if internalAbi.get('name') == 'text'][0]

    async def _resolve_image(self, imageString: str) -> ImageData:
        if imageString.startswith('ipfs://'):
            imageString = imageString.replace('ipfs://', 'https://ipfs.io/ipfs/')
        if imageString.startswith('data:'):
            header, data = imageString.split(',', 1)
            header = header.replace('data:', '', 1)
            if ';' in header:
                mimeType, encoding = header.split(';', 1)
            else:
                mimeType = header
                encoding = None
            if encoding.lower() == 'base64':
                data = base64.b64decode(data.encode('utf-8'))
            else:
                data = data.encode()
            return ImageData(mimeType=mimeType, content=data)
        raise FoundRedirectException(location=imageString)

    async def get_collection_token_image(self, registryAddress: str, tokenId: str) -> ImageData:
        normalizedAddress = chain_util.normalize_address(value=registryAddress)
        tokenMetadata = await self.retriever.get_token_metadata_by_registry_token_id(registryAddress=normalizedAddress, tokenId=tokenId)
        imageUrl = tokenMetadata.imageUrl
        # TODO(krishan711): resolve NotFounds
        return await self._resolve_image(imageString=imageUrl)

    async def get_account_image(self, accountAddress: str) -> ImageData:
        text = None
        accountAddress = chain_util.normalize_address(value=accountAddress)
        ensNormalizedAddress = ens_normalize_name(f'{accountAddress.lower().replace("0x", "", 1)}.addr.reverse')
        ensNormalizedHashedAddress = ens_name_to_hash(ensNormalizedAddress)
        addressNodeResult = await self.ethClient.call_function(toAddress=self.ensRegistryContractAddress, contractAbi=self.ensRegistryContractAbi, functionAbi=self.ensRegistryResolveFunctionAbi, arguments={'node': ensNormalizedHashedAddress})
        addressNode = addressNodeResult[0]
        if addressNode and addressNode != chain_util.BURN_ADDRESS:
            nameResult = await self.ethClient.call_function(toAddress=addressNode, contractAbi=self.ensReverseResolverContractAbi, functionAbi=self.ensReverseResolverNameFunctionAbi, arguments={'': ensNormalizedHashedAddress})
            name = nameResult[0]
            normalizedName = ens_normalize_name(name)
            normalizedHashedName = ens_name_to_hash(normalizedName)
            addressNodeResult = await self.ethClient.call_function(toAddress=self.ensRegistryContractAddress, contractAbi=self.ensRegistryContractAbi, functionAbi=self.ensRegistryResolveFunctionAbi, arguments={'node': normalizedHashedName})
            addressNode = addressNodeResult[0]
            if addressNode:
                textResult = await self.ethClient.call_function(toAddress=addressNode, contractAbi=self.ensPublicResolverContractAbi, functionAbi=self.ensPublicResolverTextFunctionAbi, arguments={'node': normalizedHashedName, 'key': 'avatar'})
                text = textResult[0]
        if text:
            if text.startswith('eip155:1/erc721:'):
                tokenParts = text.replace('eip155:1/erc721:', '').split('/')
                return await self.get_collection_token_image(registryAddress=tokenParts[0], tokenId=tokenParts[1])
            return await self._resolve_image(imageString=text)
        blockSvg = self.blockiesGenerator.create_svg_for_eth_address(address=accountAddress)
        return ImageData(mimeType='image/svg+xml', content=blockSvg.encode())

# token with url
# curl -i http://localhost:5000/v1/collections/0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e/tokens/4201/image
# token with data
# curl -i http://localhost:5000/v1/collections/0x3CA53BE299C765cDC66cC1723F8B3EEFB3aAa413/tokens/7596/image
# account with url
# curl -i http://localhost:5000/v1/accounts/0xdCf1220Cd53506B1e7137bffC2b8814C6Cc24421/image
# account without text
# curl -i http://localhost:5000/v1/accounts/0xdCf1220Cd53506B1e7137bffC2b8814C6Cc24421/image
