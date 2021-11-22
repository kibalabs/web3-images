import React from 'react';

import { Alignment, BackgroundView, Box, Direction, LinkBase, PaddingSize, ResponsiveContainingView, Stack, Text } from '@kibalabs/ui-react';

import { SponsorView } from '../components/Sponsors';
import { useGlobals } from '../globalsContext';

export type AccountPageProps = {
  accountId: string;
}

export const AccountPage = (props: AccountPageProps): React.ReactElement => {
  const { apiUrl } = useGlobals();
  return (
    <BackgroundView linearGradient='#36D1DC, #1C92D2'>
      <Box isFullWidth={true} isFullHeight={true}>
        <ResponsiveContainingView sizeResponsive={{ base: 12, medium: 10, large: 8 }}>
          <Stack direction={Direction.Vertical} isFullWidth={true} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} isScrollableVertically={true} padding={PaddingSize.Wide2} shouldAddGutters={true}>
            <LinkBase target='/'>
              <Text variant='header1'>web3images</Text>
            </LinkBase>
            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <Stack.Item gutterAfter={PaddingSize.Wide}>
              <Text variant='header3'>{props.accountId}</Text>
            </Stack.Item>
            <Box width='250px' height='250px'>
              <img
                src={`${apiUrl}/v1/accounts/${props.accountId}/image`}
                // eslint-disable-next-line
            onError={(error: React.SyntheticEvent): void => { error.target.onerror = null; error.target.src = '/assets/tokenhunt.jpg'; }}
              />
            </Box>
            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <Stack.Item growthFactor={1} shrinkFactor={1} />
            <SponsorView />
          </Stack>
        </ResponsiveContainingView>
      </Box>
    </BackgroundView>
  );
};
