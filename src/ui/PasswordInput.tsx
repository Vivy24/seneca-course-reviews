import { Button } from '@chakra-ui/button';
import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/input';
import React, { forwardRef, useState } from 'react';

type Ref = HTMLInputElement;
type Props = Omit<InputProps, 'type'>;
export const PasswordInput = forwardRef<Ref, Props>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => setIsVisible((prev) => !prev);

  return (
    <InputGroup>
      <Input {...props} ref={ref} type={isVisible ? 'text' : 'password'} />

      <InputRightElement mr="2">
        <Button size="sm" px={1} onClick={handleClick} variant="ghost">
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
});

PasswordInput.displayName = 'PasswordInput';
