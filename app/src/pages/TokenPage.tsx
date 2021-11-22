import React from 'react';

import { Alignment, Box, Direction, Image, LinkBase, PaddingSize, ResponsiveContainingView, Spacing, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { SponsorView } from '../components/Sponsors';
import { useGlobals } from '../globalsContext';

export type TokenPageProps = {
  registryAddress: string;
  tokenId: string;
}

export const TokenPage = (props: TokenPageProps): React.ReactElement => {
  const { apiUrl } = useGlobals();
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
          <Text variant='header3'>{`${props.registryAddress}/${props.tokenId}`}</Text>
        </Stack.Item>
        <Box width='250px' height='250px'>
          <Image
            source={`${apiUrl}/v1/collections/${props.registryAddress}/tokens/${props.tokenId}/image`}
            alternativeText='Avatar'
            // onError={(error: React.SyntheticEvent): void => { error.target.onerror = null; error.target.src = '/assets/tokenhunt.jpg'; }}
          />
        </Box>
        <Text alignment={TextAlignment.Center}>{`via api: ${apiUrl}/v1/collections/${props.registryAddress}/tokens/${props.tokenId}/image`}</Text>
        <Stack.Item growthFactor={1} shrinkFactor={1}>
          <Spacing variant={PaddingSize.Wide2} />
        </Stack.Item>
        <SponsorView />
      </Stack>
    </ResponsiveContainingView>
  );
};