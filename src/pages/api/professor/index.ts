import { HasMessage, TResult } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { AddProfessorFormValues } from '@modules/professor';
import { ProfessorSerivce } from '@modules/professor/server-index';
import { ResultError, ResultOk } from '@utils/api-utils';
import snakeCase from 'lodash/snakeCase';
import { NextApiRequest, NextApiResponse } from 'next';

export type Professor_Index_PostData = HasMessage;
export type Professor_Index_PostBody = AddProfessorFormValues;

async function post(
  req: NextApiRequest,
  res: NextApiResponse<TResult<Professor_Index_PostData>>
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
