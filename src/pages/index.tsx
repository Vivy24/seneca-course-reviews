import { Box, Button, Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  //@ts-ignore
  () => import('@modules/editor/index').then((module) => module.Editor),
  {
    ssr: false,
  }
);

const Home: NextPage = () => {
  return (
    <Box>
      <Heading>Hello</Heading>

      <Editor />

      <Button>Submit</Button>
    </Box>
  );
};

export default Home;
