import { Box } from '@chakra-ui/react';
import { SigninForm } from '@modules/auth/components/SigninForm/SigninForm';
import type { NextPage } from 'next';
import Head from 'next/head';

const SigninPage: NextPage = () => {
  return (
    <Box mt="10">
      <Head>
        <title>Sign in | Vietnamese ICT at Seneca College</title>
      </Head>

      <SigninForm />
    </Box>
  );
};

export default SigninPage;
