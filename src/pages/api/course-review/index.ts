import { HasMessage, TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { AddCourseReviewFormValues } from '@modules/course-review/components/AddCourseReviewForm/add-course-review-schema';
import { CourseReviewService } from '@modules/course-review/service/course-reviews-service';
import { ResultOk } from '@utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { Descendant } from 'slate';

type PostData = HasMessage;
export type CourseReviews_Index_PostData = TResultSuccess<PostData>;
export type CourseReviews_Index_PostBody = AddCourseReviewFormValues & {
  body: Descendant[];
};

async function post(
  req: NextApiRequest,
  res: NextApiResponse<TResult<PostData>>
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
