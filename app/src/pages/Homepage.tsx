import React from 'react';

import { Alignment, BackgroundView, Box, Direction, IconButton, Image, KibaIcon, LinkBase, MarkdownText, PaddingSize, ResponsiveContainingView, ResponsiveTextAlignmentView, SingleLineInput, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { useGlobals } from '../globalsContext';

export const HomePage = (): React.ReactElement => {
  const { apiUrl } = useGlobals();
  const [accountId, setAccountId] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');

  return (
    <BackgroundView linearGradient='#36D1DC, #1C92D2'>
      <Box isFullWidth={true} isFullHeight={true}>
        <ResponsiveContainingView sizeResponsive={{ base: 12, medium: 10, large: 8 }}>
          <Stack direction={Direction.Vertical} isFullWidth={true} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} isScrollableVertically={true} padding={PaddingSize.Wide2} shouldAddGutters={true}>
            <Text variant='header1'>web3images</Text>
            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <Stack.Item alignment={Alignment.Start}>
              <Text>Get a user&apos;s profile image:</Text>
            </Stack.Item>
            <Stack direction={Direction.Horizontal} isFullWidth={true} shouldAddGutters={true}>
              <Stack.Item growthFactor={1} shrinkFactor={1}>
                <SingleLineInput placeholderText='Account Address or ENS name e.g 0x123...789 OR Tokenhunt.eth' value={accountId} onValueChanged={setAccountId} />
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
                <SingleLineInput placeholderText='NFT registryAddress/tokenId e.g 0x123...789/' value={address} onValueChanged={setAddress} />
              </Stack.Item>
              <IconButton icon={<KibaIcon iconId='ion-play' />} target={'/collections/{registry_address}/tokens/{token_id}'} isEnabled={!!address} />
            </Stack>
            <Stack.Item alignment={Alignment.Start}>
              <Text variant='note'>{address ? `via api: ${apiUrl}/v1/registries/${address}/image` : `via api: ${apiUrl}/v1/registries/{registry-address}/token/{token-id}/image`}</Text>
            </Stack.Item>
            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <Stack.Item gutterAfter={PaddingSize.Default}>
              <Text>Our Sponsors:</Text>
            </Stack.Item>
            <Stack directionResponsive={{ base: Direction.Vertical, medium: Direction.Horizontal }} shouldAddGutters={true} childAlignment={Alignment.Center}>
              <LinkBase variant='image' target='https://tokenhunt.io'>
                <Stack direction={Direction.Horizontal} shouldAddGutters={true} padding={PaddingSize.Default}>
                  <Box width='3em' height='3em'>
                    <Image source='/assets/tokenhunt.jpg' alternativeText='TokenHunt' />
                  </Box>
                  <Stack direction={Direction.Vertical} contentAlignment={Alignment.Center}>
                    <ResponsiveTextAlignmentView alignmentResponsive={{ base: TextAlignment.Center, medium: TextAlignment.Left }}>
                      <Text variant='bold'>Token Hunt</Text>
                      <Text>Your daily dose of the best NFTs</Text>
                    </ResponsiveTextAlignmentView>
                  </Stack>
                </Stack>
              </LinkBase>
              <LinkBase variant='image' target='https://milliondollartokenpage.com'>
                <Stack direction={Direction.Horizontal} shouldAddGutters={true} padding={PaddingSize.Default}>
                  <Box width='3em' height='3em'>
                    <Image source='/assets/mdtp-image.png' alternativeText='Million Dollar Token Page' />
                  </Box>
                  <Stack direction={Direction.Vertical} contentAlignment={Alignment.Center}>
                    <ResponsiveTextAlignmentView alignmentResponsive={{ base: TextAlignment.Center, medium: TextAlignment.Left }}>
                      <Text variant='bold'>Million Dollar Token Page</Text>
                      <Text>Homepage of the Metaverse </Text>
                    </ResponsiveTextAlignmentView>
                  </Stack>
                </Stack>
              </LinkBase>
            </Stack>
            <Spacing />
            <MarkdownText source='Made by [Kiba Labs](https://www.kibalabs.com)' />
          </Stack>
        </ResponsiveContainingView>
      </Box>
    </BackgroundView>
  );
};
