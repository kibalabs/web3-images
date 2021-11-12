import React from 'react';

import { useFavicon } from '@kibalabs/core-react';
import { Alignment, BackgroundView, Direction, Head, KibaApp, Stack, Text } from '@kibalabs/ui-react';

import { GlobalsProvider } from './globalsContext';
import { buildNotdTheme } from './theme';

const theme = buildNotdTheme();

const globals = {
};

const defaultDate = new Date();
defaultDate.setHours(0, 0, 0, 0);

export const App = (): React.ReactElement => {
  useFavicon('/assets/favicon.svg');

  return (
    <KibaApp theme={theme}>
      <Head headId='app'>
        <title>Web3 Images</title>
      </Head>
      <GlobalsProvider globals={globals}>
        <BackgroundView linearGradient='#36D1DC,#1C92D2'>
          <Stack direction={Direction.Vertical} isFullWidth={true} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Start} isScrollableVertically={true}>
            <Text>Web3 Images</Text>
          </Stack>
        </BackgroundView>
      </GlobalsProvider>
    </KibaApp>
  );
};
