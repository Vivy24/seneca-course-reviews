// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { CourseReview } from '@modules/course-review/model/CourseReview';
import { CourseReviewService } from '@modules/course-review/service/course-reviews-service';
import { CourseReviewsFormatOptions } from '@modules/course-review/utils/course-reviews-utils';
import { ResultSuccess } from '@utils/api-utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type GetData = CourseReview[];
export type CourseReviews_Index_GetData = TResultSuccess<GetData>;
export type CourseReviews_Index_GetQuery = CourseReviewsFormatOptions &
  Partial<{ courseId: string }>;

async function get(
  req: NextApiRequest,
  res: NextApiResponse<TResult<GetData>>
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
