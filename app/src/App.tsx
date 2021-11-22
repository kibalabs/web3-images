import React from 'react';

import { Route, Router, useInitialization } from '@kibalabs/core-react';
import { EveryviewTracker } from '@kibalabs/everyview-tracker';
import { Head, KibaApp } from '@kibalabs/ui-react';

import { GlobalsProvider, IGlobals } from './globalsContext';
import { AccountPage } from './pages/AccountPage';
import { HomePage } from './pages/Homepage';
import { TokenPage } from './pages/TokenPage';
import { buildAppTheme } from './theme';

const theme = buildAppTheme();
const tracker = new EveryviewTracker('8d6b7f803294435881c5e70ef9783011', true);

const globals: IGlobals = {
  // apiUrl: 'https://web3-images-api.kibalabs.com',
  apiUrl: 'http://localhost:5000',
};

export const App = (): React.ReactElement => {
  useInitialization((): void => {
    tracker.trackApplicationOpen();
  });

  return (
    <KibaApp theme={theme} background={{ linearGradient: 'rgb(54, 209, 220), rgb(28, 146, 210)' }}>
      <Head headId='app'>
        <title>Web3 Images</title>
      </Head>
      <GlobalsProvider globals={globals}>
        <Router>
          <Route path='/' page={HomePage} />
          <Route path='/accounts/:accountId' page={AccountPage} />
          <Route path='/collections/:registryAddress/tokens/:tokenId' page={TokenPage} />
        </Router>
      </GlobalsProvider>
    </KibaApp>
  );
};
