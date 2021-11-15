import React from 'react';

import { Alignment, BackgroundView, Direction, PaddingSize, Stack, Text } from '@kibalabs/ui-react';

export const AccountPage = (): React.ReactElement => {
  return (
    <BackgroundView linearGradient='#36D1DC,#1C92D2'>
      <Stack direction={Direction.Vertical} isFullWidth={true} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Start} isScrollableVertically={true} paddingTop={PaddingSize.Wide3} paddingBottom={PaddingSize.Wide3}>
        <Text variant='header1'>Web3 Images</Text>
        <Stack />
      </Stack>
    </BackgroundView>
  );
};
