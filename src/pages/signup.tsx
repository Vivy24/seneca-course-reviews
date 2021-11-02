import { Box } from '@chakra-ui/react';
import { SignupForm } from '@modules/auth/components/SignupForm/SignupForm';
import type { NextPage } from 'next';
import Head from 'next/head';

const SignupPage: NextPage = () => {
  return (
    <Box mt="10">
      <Head>
        <title>Sign up | Vietnamese ICT at Seneca College</title>
      </Head>

      <SignupForm />
    </Box>
  );
};

export default SignupPage;
