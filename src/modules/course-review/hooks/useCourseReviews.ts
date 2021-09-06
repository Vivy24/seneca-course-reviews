import {
  CourseReviews_Index_GetData,
  CourseReviews_Index_GetQuery,
} from '@api/course-reviews';
import { Nullable } from '@utilities';
import axios from 'axios';
import { QueryFunctionContext, useQuery } from 'react-query';
import { CourseReview } from '..';

type QueryKey = [key: string, courseId: string | undefined];

async function fetcher(ctx: QueryFunctionContext<QueryKey>) {
  const params: CourseReviews_Index_GetQuery = {
    courseId: ctx.queryKey[1],
  };

  const res = await axios.get<CourseReviews_Index_GetData>(
    '/api/course-reviews',
    {
      params,
    }
  );

  return res.data.data;
}

export function useCourseReviews(
  coursesId: string | undefined,
  reviews: Nullable<CourseReview[]>
) {
  return useQuery(['course-reviews', coursesId], fetcher, {
    placeholderData: reviews,
    enabled: Boolean(coursesId),
  });
}
