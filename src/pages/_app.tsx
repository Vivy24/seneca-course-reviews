import { ChakraProvider } from '@chakra-ui/react';
import theme from '@styles/charka-theme';
import type { AppProps } from 'next/app';
import Layout from 'src/ui/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
export default MyApp;
