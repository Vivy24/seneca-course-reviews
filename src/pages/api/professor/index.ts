import { HasMessage, TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { AddProfessorFormValues } from '@modules/professor';
import { ProfessorSerivce } from '@modules/professor/server-index';
import { ResultOk } from '@utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

type PostData = HasMessage;
export type Professor_Index_PostData = TResultSuccess<PostData>;
export type Professor_Index_PostBody = AddProfessorFormValues;

async function post(
  req: NextApiRequest,
  res: NextApiResponse<TResult<PostData>>
) {
  const newProfessor: Professor_Index_PostBody = req.body;

  await ProfessorSerivce.addProfessor(newProfessor);
  return res.status(201).json(ResultOk());
}

export default withApiHandler({ post });
