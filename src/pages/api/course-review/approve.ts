import { TResult, TResultSuccess, ValidateQuery } from "@common";
import { ResultError, ResultSuccess } from "@utils/api-utils";
import { withApiHandler } from "@lib/api/withApiHandler";
import { NextApiHandler } from "next";
import { ApprovalService } from "@modules/approval-course-reviews/approval-service";
import type { NextApiRequest, NextApiResponse } from "next";
import { isEmptyString } from "@utils/validate-utils";

type PatchData = {
  reviewId: string;
};
export type reviewId_PatchData = TResultSuccess<PatchData>;

const patch: NextApiHandler<TResult<PatchData>> = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const body = validateBody(req.body);
  if (body.type === "error") return res.status(400).json(body);

  try {
    ApprovalService.approveReviewByID(body.data.reviewId);
  } catch (error) {
    return res.status(500).json(ResultError(`Fail to update review id`));
  }
  const approveSuccess = {
    ...body.data,
  };
  return res.status(200).json(ResultSuccess(approveSuccess));
};

const validateBody: ValidateQuery<PatchData> = (body) => {
  const castedBody = body as PatchData;

  if (
    typeof castedBody.reviewId !== "string" ||
    isEmptyString(castedBody.reviewId)
  ) {
    return ResultError("Missing review_id");
  }
  return ResultSuccess(castedBody);
};

export default withApiHandler({ patch });
