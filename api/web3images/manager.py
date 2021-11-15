import json
import os
from core.aws_requester import AwsRequester
from core.exceptions import NotFoundException
from core.util import chain_util
from core.web3.eth_client import EthClientInterface, RestEthClient
from ens.utils import normalize_name as ens_normalize_name
from ens.utils import normal_name_to_hash as ens_name_to_hash

from web3images.store.retriever import Retriever


class Web3ImagesManager:

    def __init__(self, retriever: Retriever, ethClient: EthClientInterface):
        self.retriever = retriever
        self.ethClient = ethClient
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

    async def get_collection_token_image(self, registryAddress: str, tokenId: str) -> str:
        normalizedAddress = chain_util.normalize_address(value=registryAddress)
        tokenMetadata = await self.retriever.get_token_metadata_by_registry_token_id(registryAddress=normalizedAddress, tokenId=tokenId)
        imageUrl = tokenMetadata.imageUrl
        if imageUrl.startswith('ipfs://'):
            imageUrl = imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/')
        # TODO(krishan711): resolve NotFounds
        return imageUrl

    async def get_account_image(self, accountAddress: str) -> str:
        normalizedAddress = ens_normalize_name(f'{accountAddress.lower().replace("0x", "", 1)}.addr.reverse')
        normalizedHashedAddress = ens_name_to_hash(normalizedAddress)
        addressNodeResult = await self.ethClient.call_function(toAddress=self.ensRegistryContractAddress, contractAbi=self.ensRegistryContractAbi, functionAbi=self.ensRegistryResolveFunctionAbi, arguments={'node': normalizedHashedAddress})
        addressNode = addressNodeResult[0]
        nameResult = await self.ethClient.call_function(toAddress=addressNode, contractAbi=self.ensReverseResolverContractAbi, functionAbi=self.ensReverseResolverNameFunctionAbi, arguments={'': normalizedHashedAddress})
        name = nameResult[0]
        normalizedName = ens_normalize_name(name)
        normalizedHashedName = ens_name_to_hash(normalizedName)
        addressNodeResult = await self.ethClient.call_function(toAddress=self.ensRegistryContractAddress, contractAbi=self.ensRegistryContractAbi, functionAbi=self.ensRegistryResolveFunctionAbi, arguments={'node': normalizedHashedName})
        addressNode = addressNodeResult[0]
        textResult = await self.ethClient.call_function(toAddress=addressNode, contractAbi=self.ensPublicResolverContractAbi, functionAbi=self.ensPublicResolverTextFunctionAbi, arguments={'node': normalizedHashedName, 'key': 'avatar'})
        text = textResult[0]
        if text.startswith('eip155:1/erc721:'):
            tokenParts = text.replace('eip155:1/erc721:', '').split('/')
            url = await self.get_collection_token_image(registryAddress=tokenParts[0], tokenId=tokenParts[1])
        elif text:
            url = text
        else:
            # TODO(krishan711): generate a blockie
            # https://github.com/ethereum/blockies/blob/master/blockies.js
            raise NotFoundException()
        return url
