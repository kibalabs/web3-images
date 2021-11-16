import React from 'react';

import { Alignment, BackgroundView, Box, Direction, Image, LinkBase, PaddingSize, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

export const AccountPage = (): React.ReactElement => {
  return (
    <BackgroundView linearGradient='#36D1DC,#1C92D2'>
      <Stack direction={Direction.Vertical} isFullWidth={true} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Start} isScrollableVertically={true} paddingTop={PaddingSize.Wide3} paddingBottom={PaddingSize.Wide3}>
        <Text variant='header1'>Web3 Images</Text>
        <Text variant='account'>Image for account: 0x123...789</Text>
        <Box width='250px' height='250px'>
          <Image source='/assets/mdtp-image.png' alternativeText='mdtp' />
        </Box>
        <Stack direction={Direction.Vertical} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} paddingTop={PaddingSize.Wide3} paddingBottom={PaddingSize.Wide3}>
          <Text>Our Sponsors:</Text>
          <Stack directionResponsive={{ base: Direction.Vertical, medium: Direction.Horizontal }} shouldAddGutters={true}childAlignment={Alignment.Center} paddingTop={PaddingSize.Wide2}>
            <LinkBase variant='image' target='https://tokenhunt.io'>
              <Box width='50px' height='50px'>
                <Image source='/assets/tokenhunt.jpg' alternativeText='Kronikz' />
              </Box>
            </LinkBase>
            <Stack direction={Direction.Vertical}>
              <Text alignment={TextAlignment.Center}>Token Hunt</Text>
              <Text variant='normal' alignment={TextAlignment.Center}>Your daily dose of the best NFTs</Text>
            </Stack>
            <LinkBase variant='image' target='https://milliondollartokenpage.com'>
              <Box width='50px' height='50px'>
                <Image source='/assets/mdtp-image.png' alternativeText='mdtp' />
              </Box>
            </LinkBase>
            <Stack direction={Direction.Vertical}>
              <Text alignment={TextAlignment.Center}>Million Dollar Token Page </Text>
              <Text variant='normal' alignment={TextAlignment.Center}>The homepage for the Metaverse </Text>
            </Stack>
          </Stack>
        </Stack>
        <Text>Made by kibalabs</Text>
        <Stack />
      </Stack>
    </BackgroundView>
  );
};