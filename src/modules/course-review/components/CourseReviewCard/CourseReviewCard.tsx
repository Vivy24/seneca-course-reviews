import {
  Box,
  Divider,
  Heading,
  HStack,
  Link,
  ListItem,
  Tag,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react';
import { PopulatedCourseReview } from '@modules/course-review/service';
import { ReviewSerializer } from '@modules/editor';
import { RatingStars } from '@ui/RatingStars';
import { toFullDate, toISODate } from '@utils/date-utils';
import NextLink from 'next/link';
import React from 'react';

type Props = {
  review: PopulatedCourseReview;
};
export const CourseReviewCard = (props: Props) => {
  return (
    <VStack align="start" as="article">
      <header>
        <Heading as="h3" size="md">
          {props.review.title}
        </Heading>

        <HStack>
          <Text>Difficulty:</Text>
          <RatingStars value={props.review.difficulty} />
        </HStack>

        <HStack>
          <Text>Professors:</Text>
          <UnorderedList display="flex" listStyleType="none" gridGap="1">
            {props.review.professors.map((professor) => (
              <ListItem key={professor.id}>
                <NextLink href={`/professor/${professor.id}`} passHref>
                  <Link>
                    <Tag colorScheme="purple">{professor.name}</Tag>
                  </Link>
                </NextLink>
              </ListItem>
            ))}
          </UnorderedList>
        </HStack>

        <Text>
          Reviewed on {''}
          <Text as="time" dateTime={toISODate(props.review._createdAt)}>
            {toFullDate(props.review._createdAt)}
          </Text>
        </Text>
      </header>

      <Divider />

      <Box>
        <ReviewSerializer value={props.review.body} />
      </Box>
    </VStack>
  );
};
