import { HasMessage, TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { AddProfessorFormValues } from '@modules/professor/components/AddProfessorForm/add-professor-schema';
import { ProfessorSerivce } from '@modules/professor/service/professor-service';
import { ResultError, ResultOk } from '@utils/api-utils';
import snakeCase from 'lodash/snakeCase';
import { NextApiRequest, NextApiResponse } from 'next';

type PostData = HasMessage;
export type Professor_Index_PostData = TResultSuccess<PostData>;
export type Professor_Index_PostBody = AddProfessorFormValues;

async function post(
  req: NextApiRequest,
  res: NextApiResponse<TResult<PostData>>
) {
  const newProfessor: Professor_Index_PostBody = req.body;
  const professorId = snakeCase(newProfessor.name);

  if (await ProfessorSerivce.isProfessorExist(professorId)) {
    return res.status(422).json(ResultError('Professor exists!'));
  }

  await ProfessorSerivce.addProfessor({
    ...newProfessor,
    id: professorId,
  });

  return res.status(201).json(ResultOk());
}

export default withApiHandler({ post });
