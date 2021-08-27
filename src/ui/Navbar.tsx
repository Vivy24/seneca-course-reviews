import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

function Navbar() {
  return (
    <Box as="header" py="3" borderBottom="1px" borderBottomColor="gray.200">
      <Box as="nav">
        <Flex as="ul">
          <Box as="li">Home</Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default Navbar;
