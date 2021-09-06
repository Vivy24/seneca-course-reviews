import { HasMessage, TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { ProfessorReview } from '@modules/professor-review';
import { ProfessorReviewService } from '@modules/professor-review/server-index';
import { ResultOk } from '@utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

type PostData = HasMessage;
export type ProfessorReview_Index_PostData = TResultSuccess<PostData>;
export type ProfessorReview_Index_PostBody = Omit<
  ProfessorReview,
  '_isApproved'
>;

async function post(
  req: NextApiRequest,
  res: NextApiResponse<TResult<PostData>>
) {
  const body = req.body as ProfessorReview_Index_PostBody;
  await ProfessorReviewService.addReview({ ...body, _isApproved: false });

  return res.status(201).json(ResultOk());
}

export default withApiHandler({ post });
