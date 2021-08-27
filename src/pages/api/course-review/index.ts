import { HasMessage, TResult } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { CourseReview } from '@modules/course-review';
import { CourseReviewService } from '@modules/course-review/server-index';
import { ResultOk } from '@utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

export type CourseReviews_Index_PostData = HasMessage;
export type CourseReviews_Index_PostBody = CourseReview;

async function post(
  req: NextApiRequest,
  res: NextApiResponse<TResult<CourseReviews_Index_PostData>>
) {
  await CourseReviewService.addReview(req.body);

  return res.status(201).json(ResultOk());
}

export default withApiHandler({ post });
