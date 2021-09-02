import { Button, Spinner } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

type Props = {
  isSubmitting: boolean;
};
export const FormSubmitButton = (props: PropsWithChildren<Props>) => {
  return (
    <Button
      type="submit"
      spinner={<Spinner />}
      disabled={props.isSubmitting}
      isLoading={props.isSubmitting}
    >
      {props.children}
    </Button>
  );
};
