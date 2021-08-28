import { HasMessage, TResult } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { ProfessorReview } from '@modules/professor-review';
import { ProfessorReviewService } from '@modules/professor-review/server-index';
import { ResultOk } from '@utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

export type ProfessorReview_Index_PostData = HasMessage;
export type ProfessorReview_Index_PostBody = ProfessorReview;

async function post(
  req: NextApiRequest,
  res: NextApiResponse<TResult<ProfessorReview_Index_PostData>>
) {
  const body = req.body as ProfessorReview_Index_PostBody;
  await ProfessorReviewService.addReview(body);

  return res.status(201).json(ResultOk());
}

export default withApiHandler({ post });
