import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import React, { PropsWithChildren, ReactNode } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import FieldRequiredSymbol from './FieldRequiredSymbol';

type Props<FormValues extends FieldValues> = {
  controllerProps: UseControllerProps<FormValues>;
  label: ReactNode;
  helpText?: ReactNode;
  id?: string;
  isRequired?: boolean;
};
export function FormGroup<FormValues extends FieldValues>(
  props: PropsWithChildren<Props<FormValues>>
) {
  const controller = useController(props.controllerProps);

  return (
    <FormControl id={props.id} isInvalid={controller.fieldState.invalid}>
      <FormLabel>
        {props.label}
        {props.isRequired && <FieldRequiredSymbol />}
      </FormLabel>

      {props.children}

      {controller.fieldState.error && (
        <FormErrorMessage>
          {controller.fieldState.error.message}
        </FormErrorMessage>
      )}

      {props.helpText && <FormHelperText>{props.helpText}</FormHelperText>}
    </FormControl>
  );
}
