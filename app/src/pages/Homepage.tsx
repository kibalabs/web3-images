import React from 'react';

import { Alignment, Box, Direction, EqualGrid, IconButton, Image, KibaIcon, LinkBase, MarkdownText, PaddingSize, ResponsiveContainingView, SingleLineInput, Spacing, Stack, Text } from '@kibalabs/ui-react';

import { useGlobals } from '../globalsContext';

export const HomePage = (): React.ReactElement => {
  const { apiUrl } = useGlobals();
  const [accountId, setAccountId] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const [registryAddress, setRegistryAddress] = React.useState<string | null>(null);
  const [tokenId, setTokenId] = React.useState<string | null>(null);

  const onAccountIdChanged = (value: string): void => {
    setAccountId(value);
  };

  const onAddressChanged = (value: string): void => {
    setAddress(value);
    const parts = value.split('/', 2);
    if (parts.length !== 2) {
      setRegistryAddress(null);
      setTokenId(null);
    } else {
      setRegistryAddress(parts[0]);
      setTokenId(parts[1]);
    }
  };

  return (
    <ResponsiveContainingView sizeResponsive={{ base: 12, medium: 10, large: 8 }}>
      <Stack direction={Direction.Vertical} isFullWidth={true} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} padding={PaddingSize.Wide2} shouldAddGutters={true}>
        <LinkBase target='/'>
          <Text variant='header1'>web3images</Text>
        </LinkBase>
        <Stack.Item growthFactor={1} shrinkFactor={1}>
          <Spacing variant={PaddingSize.Wide2} />
        </Stack.Item>
        <Stack.Item alignment={Alignment.Start}>
          <MarkdownText textVariant='large' source={'**web3images** is the easiest way to add avatars for eth accounts in your dapp 🖼.'} />
        </Stack.Item>
        <Stack.Item alignment={Alignment.Start}>
          <MarkdownText textVariant='large' source={'We use ENS\' new [Verified Avatar feature](https://medium.com/the-ethereum-name-service/nft-avatar-support-for-ens-profiles-bd4a5553f089) ✅. We also support any URLs saved in the avatar text field on ENS 🔥.'} />
        </Stack.Item>
        <Stack.Item alignment={Alignment.Start}>
          <MarkdownText textVariant='large' source={'Finally, if the eth account hasn\'t yet set up an ENS reverse record or avatars, the api will generate and return a blockie as seen on metamask to easily verify the account 🌈.'} />
        </Stack.Item>
        <Stack.Item alignment={Alignment.Start}>
          <MarkdownText textVariant='large' source={'Here are some examples (view source to see the awesome-ness of it):'} />
        </Stack.Item>
        <EqualGrid childSize={3} isFullHeight={false} shouldAddGutters={true}>
          {/* Krishan711.eth */}
          <Box>
            <Image
              source={`${apiUrl}/v1/accounts/0xdCf1220Cd53506B1e7137bffC2b8814C6Cc24421/image`}
              alternativeText='0xdCf1220Cd53506B1e7137bffC2b8814C6Cc24421 Avatar'
            />
          </Box>
          {/* TokenHunt.eth */}
          <Box>
            <Image
              source={`${apiUrl}/v1/accounts/0x18090cDA49B21dEAffC21b4F886aed3eB787d032/image`}
              alternativeText='0x18090cDA49B21dEAffC21b4F886aed3eB787d032 Avatar'
            />
          </Box>
          {/* Brantley.eth */}
          <Box>
            <Image
              source={`${apiUrl}/v1/accounts/0x983110309620d911731ac0932219af06091b6744/image`}
              alternativeText='0x983110309620d911731ac0932219af06091b6744 Avatar'
            />
          </Box>
          {/* KibaLabs.eth */}
          <Box>
            <Image
              source={`${apiUrl}/v1/accounts/0x112ded5A742708fe05fA07545A3A2394195aD948/image`}
              alternativeText='0x112ded5A742708fe05fA07545A3A2394195aD948 Avatar'
            />
          </Box>
        </EqualGrid>
        <Stack.Item alignment={Alignment.Start}>
          <MarkdownText textVariant='large' source={'Best of all, web3images is **completely free** during our alpha 🚀🚀'} />
        </Stack.Item>
        <Stack.Item growthFactor={1} shrinkFactor={1}>
          <Spacing variant={PaddingSize.Wide2} />
        </Stack.Item>
        <Stack.Item alignment={Alignment.Start}>
          <Text>Get a user&apos;s profile image:</Text>
        </Stack.Item>
        <Stack direction={Direction.Horizontal} isFullWidth={true} shouldAddGutters={true}>
          <Stack.Item growthFactor={1} shrinkFactor={1}>
            <SingleLineInput placeholderText='Account Address or ENS name e.g 0x123...789 OR Tokenhunt.eth' value={accountId} onValueChanged={onAccountIdChanged} />
          </Stack.Item>
          <IconButton icon={<KibaIcon iconId='ion-play' />} target={`/accounts/${accountId}`} isEnabled={!!accountId} />
        </Stack>
        <Stack.Item alignment={Alignment.Start}>
          <Text variant='note'>{accountId ? `via api: ${apiUrl}/v1/accounts/${accountId}/image` : `via api: ${apiUrl}/v1/accounts/{account-id}/image`}</Text>
        </Stack.Item>
        <Spacing variant={PaddingSize.Wide} />
        <Stack.Item alignment={Alignment.Start}>
          <Text>Get an NFT&apos;s image:</Text>
        </Stack.Item>
        <Stack direction={Direction.Horizontal} isFullWidth={true} shouldAddGutters={true}>
          <Stack.Item growthFactor={1} shrinkFactor={1}>
            <SingleLineInput placeholderText='NFT registryAddress/tokenId e.g 0x123...AbC/456' value={address} onValueChanged={onAddressChanged} />
          </Stack.Item>
          <IconButton icon={<KibaIcon iconId='ion-play' />} target={`/collections/${registryAddress}/tokens/${tokenId}`} isEnabled={!!registryAddress && !!tokenId} />
        </Stack>
        <Stack.Item alignment={Alignment.Start}>
          <Text variant='note'>{(!!registryAddress && !!tokenId) ? `via api: ${apiUrl}/v1/collections/${registryAddress}/tokens/${tokenId}/image` : `via api: ${apiUrl}/v1/collections/{registry-address}/tokens/{token-id}/image`}</Text>
        </Stack.Item>
        <Stack.Item growthFactor={1} shrinkFactor={1}>
          <Spacing variant={PaddingSize.Wide2} />
        </Stack.Item>
      </Stack>
    </ResponsiveContainingView>
  );
};
