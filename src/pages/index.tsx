import { Box, Button, Heading } from '@chakra-ui/react';
import { Editor } from '@modules/editor';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Box>
      <Heading>Hello</Heading>

      <Box w="500px">
        <Editor />
      </Box>

      <Button>Submit</Button>
    </Box>
  );
};

export default Home;
