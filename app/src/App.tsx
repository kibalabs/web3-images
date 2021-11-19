import React from 'react';

import { Route, Router, useFavicon } from '@kibalabs/core-react';
import { Head, KibaApp } from '@kibalabs/ui-react';

import { GlobalsProvider, IGlobals } from './globalsContext';
import { AccountPage } from './pages/AccountPage';
import { HomePage } from './pages/Homepage';
import { buildAppTheme } from './theme';

const theme = buildAppTheme();

const globals: IGlobals = {
  // apiUrl: 'https://web3-images-api.kibalabs.com',
  apiUrl: 'http://localhost:5000',
};

export const App = (): React.ReactElement => {
  useFavicon('/assets/favicon.svg');
  return (
    <KibaApp theme={theme}>
      <Head headId='app'>
        <title>Web3 Images</title>
      </Head>
      <GlobalsProvider globals={globals}>
        <Router>
          <Route path='/' page={HomePage} />
          <Route path='/accounts/:accountId' page={AccountPage} />
        </Router>
      </GlobalsProvider>
    </KibaApp>
  );
};
