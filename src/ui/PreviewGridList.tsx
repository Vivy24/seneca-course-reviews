import { Grid, GridItem } from '@chakra-ui/react';
import React, { Children, PropsWithChildren } from 'react';

type Props = {};

export const PreviewGridList = ({ children }: PropsWithChildren<Props>) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={5}>
      {Children.map(children, (child) => (
        <GridItem shadow="sm" p="6">
          {child}
        </GridItem>
      ))}
    </Grid>
  );
};
