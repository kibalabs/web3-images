import React from 'react';

import { useNavigator } from '@kibalabs/core-react';
import { Alignment, BackgroundView, Box, Direction, IconButton, Image, KibaIcon, LinkBase, PaddingSize, SingleLineInput, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

export const HomePage = (): React.ReactElement => {
  const navigator = useNavigator();
  const [account, setAccount] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const onAccountClicked = () => {
    navigator.navigateTo('/account');
  };
  const onAddressClicked = () => {
    navigator.navigateTo('/account');
  };
  return (
    <BackgroundView linearGradient='#36D1DC,#1C92D2'>
      <Stack direction={Direction.Vertical} isFullWidth={true} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Start} isScrollableVertically={true} paddingTop={PaddingSize.Wide3} paddingBottom={PaddingSize.Wide3}>
        <Text variant='header1'>Web3 Images</Text>
        <Stack direction={Direction.Vertical} contentAlignment={Alignment.Center} paddingTop={PaddingSize.Wide3} paddingBottom={PaddingSize.Wide2}paddingLeft={PaddingSize.Wide2}paddingRight={PaddingSize.Wide2}>
          <Text variant='default'>Get a user&apos;s profile image:</Text>
          <Stack direction={Direction.Horizontal} isFullWidth={true} shouldAddGutters={true}>
            <Stack.Item growthFactor={9} shrinkFactor={9}>
              <SingleLineInput placeholderText='Account Address or ENS name e.g 0x123...789 OR Tokenhutn.eth' value={account} onValueChanged={setAccount} isEnabled={true} />
            </Stack.Item>
            <IconButton variant='buttonVariant' icon={<KibaIcon iconId='ion-play' />} onClicked={onAccountClicked} />
          </Stack>
          <Text>Or access via api: https://images-api.tokenhunt.co/accounts/address/image....</Text>
        </Stack>
        <Stack direction={Direction.Vertical} contentAlignment={Alignment.Center} paddingTop={PaddingSize.Wide3} paddingBottom={PaddingSize.Wide2} paddingLeft={PaddingSize.Wide2}paddingRight={PaddingSize.Wide2}>
          <Text>Get an NFT image:</Text>
          <Stack direction={Direction.Horizontal} isFullWidth={true} shouldAddGutters={true}>
            <Stack.Item growthFactor={9} shrinkFactor={9}>
              <SingleLineInput placeholderText='Address/e.g 0x123...789 ' value={address} onValueChanged={setAddress}isEnabled={true} />
            </Stack.Item>
            <IconButton variant='buttonVariant' icon={<KibaIcon iconId='ion-play' />} onClicked={onAddressClicked} />
          </Stack>
          <Text>Or access via api: https://images-api.tokenhunt.co/registries/address/token/tokenid/image....</Text>
        </Stack>
        <Stack />
        <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} paddingTop={PaddingSize.Wide3} paddingBottom={PaddingSize.Wide3}>
          <Text>Our Sponsors:</Text>
          <Stack direction={Direction.Horizontal} shouldAddGutters={true}childAlignment={Alignment.Center} paddingTop={PaddingSize.Wide2}>
            <LinkBase variant='image' target='https://tokenhunt.io'>
              <Box width='50px' height='50px'>
                <Image source='/assets/tokenhunt.jpg' alternativeText='Kronikz' />
              </Box>
            </LinkBase>
            <Stack direction={Direction.Vertical}>
              <Text>Token Hunt</Text>
              <Text variant='normal' alignment={TextAlignment.Center}>Your daily dose of the best NFTs</Text>
            </Stack>
            <LinkBase variant='image' target='https://milliondollartokenpage.com'>
              <Box width='50px' height='50px'>
                <Image source='/assets/mdtp-image.png' alternativeText='mdtp' />
              </Box>
            </LinkBase>
            <Stack direction={Direction.Vertical}>
              <Text variant='normal' alignment={TextAlignment.Center}>Million Dollar Token Page </Text>
              <Text variant='normal' alignment={TextAlignment.Center}>The homepage for the Metaverse </Text>
            </Stack>
          </Stack>
        </Stack>
        <Text>Made by kibalabs</Text>
      </Stack>
    </BackgroundView>
  );
};