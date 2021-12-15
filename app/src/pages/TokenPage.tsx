import React from 'react';

import { useRouteParams } from '@kibalabs/core-react';
import { Alignment, Box, Direction, Image, LinkBase, PaddingSize, ResponsiveContainingView, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { SponsorView } from '../components/Sponsors';
import { useGlobals } from '../globalsContext';

export const TokenPage = (): React.ReactElement => {
  const { apiUrl } = useGlobals();
  const routeParams = useRouteParams();
  const registryAddress = routeParams.registryAddress as string;
  const tokenId = routeParams.tokenId as string;

  return (
    <ResponsiveContainingView sizeResponsive={{ base: 12, medium: 10, large: 8 }}>
      <Stack direction={Direction.Vertical} isFullWidth={true} isFullHeight={true} childAlignment={Alignment.Center} contentAlignment={Alignment.Center} padding={PaddingSize.Wide2} shouldAddGutters={true}>
        <LinkBase target='/'>
          <Text variant='header1'>web3images</Text>
        </LinkBase>
        <Stack.Item growthFactor={1} shrinkFactor={1}>
          <Spacing variant={PaddingSize.Wide2} />
        </Stack.Item>
        <Stack.Item gutterAfter={PaddingSize.Wide}>
          <Text variant='header3'>{`${registryAddress}/${tokenId}`}</Text>
        </Stack.Item>
        <Box width='250px' height='250px'>
          <Image
            source={`${apiUrl}/v1/collections/${registryAddress}/tokens/${tokenId}/image`}
            alternativeText='Avatar'
            // onError={(error: React.SyntheticEvent): void => { error.target.onerror = null; error.target.src = '/assets/tokenhunt.jpg'; }}
          />
        </Box>
        <Text alignment={TextAlignment.Center}>{`via api: ${apiUrl}/v1/collections/${registryAddress}/tokens/${tokenId}/image`}</Text>
        <Stack.Item growthFactor={1} shrinkFactor={1}>
          <Spacing variant={PaddingSize.Wide2} />
        </Stack.Item>
        <SponsorView />
      </Stack>
    </ResponsiveContainingView>
  );
};
