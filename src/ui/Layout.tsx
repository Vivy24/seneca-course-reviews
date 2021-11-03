import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

type Props = { children: ReactNode };
function Layout(props: Props) {
  return (
    <>
      <Navbar />

      <Box
        as="main"
        flex="1 1 0%"
        maxWidth="5xl"
        mx="auto"
        px="4"
        w="full"
        mt="5"
      >
        {props.children}
      </Box>

      <Footer />
    </>
  );
}

export default Layout;
