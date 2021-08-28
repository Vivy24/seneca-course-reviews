import { Box, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

function Footer() {
  return (
    <Box as="footer" mt={20}>
      <Text textAlign="right" fontSize="small">
        Interested in updating the design? Send me a message.
      </Text>

      <Box bgColor="InfoBackground" py="1" textAlign="center">
        Made by{' '}
        <Link
          isExternal
          href="https://github.com/Andrewnt219"
          display="inline-flex"
          alignItems="baseline"
          gridGap={1}
        >
          Andrew <FaExternalLinkAlt fontSize="0.75em" />
        </Link>
      </Box>
    </Box>
  );
}

export default Footer;
