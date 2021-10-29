import { TResult, TResultSuccess, ValidateQuery } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { ApprovalService } from '@modules/approval-course-reviews/approval-service';
import { ResultError, ResultSuccess } from '@utils/api-utils';
import { isEmptyString } from '@utils/validate-utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextApiHandler } from 'next';

type PatchData = {
  reviewId: string;
};
export type reviewId_PatchData = TResultSuccess<PatchData>;

const patch: NextApiHandler<TResult<PatchData>> = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const body = validateBody(req.body);
  if (body.type === 'error') return res.status(400).json(body);

  try {
    ApprovalService.approveReviewByID(body.data.reviewId);
  } catch (error) {
    return res.status(500).json(ResultError(`Fail to update review id`));
  }

  return res.status(200).json(ResultSuccess(body.data));
};

const validateBody: ValidateQuery<PatchData> = (body) => {
  const castedBody = body as PatchData;

  if (
    typeof castedBody.reviewId !== 'string' ||
    isEmptyString(castedBody.reviewId)
  ) {
    return ResultError('Missing review_id');
  }
  return ResultSuccess(castedBody);
};

export default withApiHandler({ patch });
