import { HasMessage, TResult } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { AddCourseReviewFormValues } from '@modules/course-review';
import { CourseReviewService } from '@modules/course-review/server-index';
import { ResultOk } from '@utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { Descendant } from 'slate';

export type CourseReviews_Index_PostData = HasMessage;
export type CourseReviews_Index_PostBody = AddCourseReviewFormValues & {
  body: Descendant[];
};

async function post(
  req: NextApiRequest,
  res: NextApiResponse<TResult<CourseReviews_Index_PostData>>
) {
  const newCourseReview = req.body as CourseReviews_Index_PostBody;
  await CourseReviewService.addReview({
    ...newCourseReview,
    _createdAt: new Date().toISOString(),
    _isApproved: false,
  });

  return res.status(201).json(ResultOk());
}

export default withApiHandler({ post });
