import { Course_Index_PostBody } from '@api/course';
import { Programs_Index_GetData, Programs_Index_GetQuery } from '@api/programs';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddProgramForm } from '@modules/program/components/AddProgramForm/AddProgramForm';
import { AsyncFormLabel } from '@ui/AsyncFormLabel';
import { MutationHandleSubmit } from '@utilities';
import { getAxiosError } from '@utils/api-utils';
import { errorsToString } from '@utils/parse-utils';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FieldRequiredSymbol from 'src/ui/FieldRequiredSymbol';
import {
  addCourseFormSchema,
  AddCourseFormValues,
} from './add-course-form-schema';

export function AddCourseForm() {
  const queryClient = useQueryClient();
  const {
    isOpen: isOpenProgram,
    onClose: onCloseProgram,
    onOpen: onOpenProgram,
  } = useDisclosure();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<AddCourseFormValues>({
    resolver: zodResolver(addCourseFormSchema),
    defaultValues: {
      _createdAt: new Date().toISOString(),
    },
  });

  const mutation: MutationHandleSubmit = useMutation(
    handleSubmit(async (data) => {
      await axios.post('/api/course', data as Course_Index_PostBody);
    }),
    {
      mutationKey: 'add-course',
      onSuccess: () => queryClient.invalidateQueries('courses'),
    }
  );

  const programsQuery = useQuery({
    queryFn: async () => {
      const params: Programs_Index_GetQuery = {
        sort: 'code',
      };

      const res = await axios.get<Programs_Index_GetData>('/api/programs', {
        params,
      });

      return res.data.data;
    },
    queryKey: 'programs',
  });

  return (
    <>
      <Flex
        as="form"
        onSubmit={mutation.mutate}
        noValidate
        direction="column"
        gridGap="5"
        alignItems="start"
      >
        <FormControl id="course-id" isInvalid={Boolean(errors.code)}>
          <FormLabel>
            Course code
            <FieldRequiredSymbol />
          </FormLabel>

          <Input type="text" {...register('code')} />

          <FormErrorMessage>{errors.code?.message}</FormErrorMessage>

          <FormHelperText>e.g. ULI101, IPC144, etc.</FormHelperText>
        </FormControl>

        <FormControl id="course-name" isInvalid={Boolean(errors.name)}>
          <FormLabel>
            Course name
            <FieldRequiredSymbol />
          </FormLabel>

          <Input type="text" {...register('name')} />

          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>

          <FormHelperText>
            e.g. Introduction to UNIX/Linux and the Internet
          </FormHelperText>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.programIdList)}>
          <AsyncFormLabel
            label="Related program(s)"
            loadingLabel="Loading programs"
            isLoading={programsQuery.isFetching}
          />

          <Select multiple h="32" iconSize="0" {...register('programIdList')}>
            {programsQuery.data?.map((program) => (
              <option key={program.id} value={program.id}>
                {`${program.id.toUpperCase()} - ${program.name}`}
              </option>
            ))}
          </Select>

          {errors.programIdList && (
            <FormErrorMessage>
              {errorsToString(errors.programIdList)}
            </FormErrorMessage>
          )}

          <FormHelperText>
            Cannot find your program?{' '}
            <Button onClick={onOpenProgram} variant="link">
              Create a new one
            </Button>
          </FormHelperText>
        </FormControl>

        <Button
          type="submit"
          spinner={<Spinner />}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Add
        </Button>

        {mutation.error && (
          <Flex gridGap="1" color="red" alignItems="center">
            <FaBan /> {getAxiosError(mutation.error)}
          </Flex>
        )}

        {isSubmitSuccessful && (
          <Flex gridGap="1" color="green" alignItems="center">
            <FaCheckCircle /> New course added successfully
          </Flex>
        )}
      </Flex>

      <Modal isOpen={isOpenProgram} onClose={onCloseProgram} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new program</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddProgramForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
