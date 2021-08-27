import { Text } from '@chakra-ui/react';
import React from 'react';

function FieldRequiredSymbol() {
  return (
    <Text as="span" title="field is required" color="red">
      *
    </Text>
  );
}

export default FieldRequiredSymbol;
