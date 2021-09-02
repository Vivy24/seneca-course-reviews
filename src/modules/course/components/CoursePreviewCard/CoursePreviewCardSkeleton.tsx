import { HStack, Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';

export const CoursePreviewCardSkeleton = () => {
  return (
    <Stack>
      <Skeleton height="12" />
      <Skeleton height="6" />

      <HStack spacing={1} alignItems="flex-start">
        <Skeleton height="6" w="12" />
        <Skeleton height="6" w="12" />
      </HStack>
    </Stack>
  );
};
