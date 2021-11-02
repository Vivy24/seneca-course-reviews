import { Grid, GridItem } from '@chakra-ui/react';
import React, { Children, ReactNode } from 'react';

type Props = { children: ReactNode };

export const PreviewGridList = ({ children }: Props) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={5}>
      {Children.map(children, (child) => (
        <GridItem border="1px" borderColor="gray.100" p="5">
          {child}
        </GridItem>
      ))}
    </Grid>
  );
};
