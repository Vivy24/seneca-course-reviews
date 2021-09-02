import { FormLabel, Spinner, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  isLoading: boolean;
  loadingLabel?: string;
  label: string;
};
export const AsyncFormLabel = ({ isLoading, label, loadingLabel }: Props) => {
  return (
    <FormLabel>
      {isLoading ? (
        <Text as="span">
          {loadingLabel ?? label} <Spinner size="xs" />
        </Text>
      ) : (
        <Text as="span">{label}</Text>
      )}
    </FormLabel>
  );
};
