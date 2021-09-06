// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TResult } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import {
  CourseReview,
  CourseReviewsFormatOptions,
} from '@modules/course-review';
import { CourseReviewService } from '@modules/course-review/server-index';
import { ResultSuccess } from '@utils/api-utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export type CourseReviews_Index_GetData = CourseReview[];
export type CourseReviews_Index_GetQuery = CourseReviewsFormatOptions &
  Partial<{ courseId: string }>;

async function get(
  req: NextApiRequest,
  res: NextApiResponse<TResult<CourseReviews_Index_GetData>>
) {
  const query = req.query as CourseReviews_Index_GetQuery;

  let reviews: CourseReview[] = [];

  if (query.courseId) {
    reviews = await CourseReviewService.getReviewsByCourseId(query.courseId);
  } else {
    reviews = await CourseReviewService.getReviews();
  }

  CourseReviewService.formatCourseReviews(reviews, query);

  return res.status(200).json(ResultSuccess(reviews));
}

export default withApiHandler({ get });
