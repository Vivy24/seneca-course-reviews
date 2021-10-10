import { HasMessage, TResult, TResultSuccess, ValidateQuery } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { signupFormSchema, SignupFormValues } from '@modules/auth';
import { AuthService } from '@modules/auth/server-index';
import {
  getErrorMessage,
  ResultError,
  ResultOk,
  ResultSuccess,
} from '@utils/api-utils';
import { errorsToString } from '@utils/parse-utils';
import { NextApiHandler } from 'next';

type PostData = HasMessage;
export type Auth_SignupByPassword_PostData = TResultSuccess<PostData>;
export type Auth_SignupByPassword_PostBody = SignupFormValues;

const post: NextApiHandler<TResult<PostData>> = async (req, res) => {
  const bodyResult = validateBody(req.body);

  if (bodyResult.type === 'error') return res.status(422).json(bodyResult);

  try {
    await AuthService.signUpByPassword(bodyResult.data);
  } catch (error) {
    return res
      .status(500)
      .json(ResultError(`Fail to sign up: ${getErrorMessage(error)}`));
  }

  return res.status(201).json(ResultOk());
};

const validateBody: ValidateQuery<Auth_SignupByPassword_PostBody> = (body) => {
  const result = signupFormSchema.safeParse(body);

  if (!result.success) {
    return ResultError(errorsToString(result.error.errors));
  }

  return ResultSuccess(body);
};

export default withApiHandler({ post });
