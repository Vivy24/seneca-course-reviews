import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';

const Home: NextPage = () => {
  return (
    <Box mt="10">
      <Head>
        <title>Homepage | Vietnamese ICT at Seneca College</title>
      </Head>

      <Heading as="h1" size="4xl">
        Seneca ICT reviews
      </Heading>

      <Flex gridGap="2" mt="5" flexWrap="wrap">
        <NextLink href="/course-review/add" passHref>
          <Button size="lg" as="a">
            Read reviews
          </Button>
        </NextLink>

        <NextLink href="/professor-review/add" passHref>
          <Button size="lg" variant="outline" as="a">
            Write a new review
          </Button>
        </NextLink>
      </Flex>
    </Box>
  );
};

export default Home;
