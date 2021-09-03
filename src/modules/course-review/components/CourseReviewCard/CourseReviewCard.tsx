import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { CourseReview } from '@modules/course-review';
import { ReviewSerializer } from '@modules/slatejs/components';
import { RatingStars } from '@ui/RatingStars';
import { toFullDate, toISODate } from '@utils/date-utils';
import React from 'react';

type Props = {
  review: CourseReview;
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

        <Text>
          Reviewed on {''}
          <Text as="time" dateTime={toISODate(props.review._createdAt)}>
            {toFullDate(props.review._createdAt)}
          </Text>
        </Text>
      </header>

      <ReviewSerializer value={props.review.body} />
    </VStack>
  );
};
