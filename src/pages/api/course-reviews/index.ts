// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TResult } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { CourseReview } from '@modules/course-review';
import { CourseReviewService } from '@modules/course-review/server-index';
import { ResultSuccess } from '@utils/api-utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export type CourseReviews_Index_GetData = CourseReview[];
async function get(
  req: NextApiRequest,
  res: NextApiResponse<TResult<CourseReviews_Index_GetData>>
) {
  const reviews = await CourseReviewService.getReviews();

  return res.status(200).json(ResultSuccess(reviews));
}

export default withApiHandler({ get });
