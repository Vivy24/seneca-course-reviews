import {
  Heading,
  Link,
  ListItem,
  Stack,
  Tag,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { Course } from '@modules/course';
import { toFullDate, toISODate } from '@utils/date-utils';
import NextLink from 'next/link';
import React from 'react';

type Props = {
  course: Course;
};
export const CoursePreviewCard = ({ course }: Props) => {
  return (
    <Stack as="article" width="max-content">
      <NextLink href={`/course/${course.id}`} passHref>
        <Link>
          <Heading size="lg">{course.id.toUpperCase()}</Heading>
        </Link>
      </NextLink>

      <Text>
        Created:{' '}
        <Text as="time" dateTime={toISODate(course._createdAt)}>
          {toFullDate(course._createdAt)}
        </Text>
      </Text>

      <UnorderedList
        listStyleType="none"
        ml="0"
        display="flex"
        flexWrap="wrap"
        gridGap="1"
      >
        {course.programIdList.map((id) => (
          <ListItem key={id}>
            <Tag>
              <NextLink href={`/program/${id}`} passHref>
                <Link>{id.toUpperCase()}</Link>
              </NextLink>
            </Tag>
          </ListItem>
        ))}
      </UnorderedList>
    </Stack>
  );
};
