import { HasMessage, TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { AddProgramFormValues } from '@modules/program/components/AddProgramForm/add-program-schema';
import { ProgramService } from '@modules/program/service/ProgramService';
import { ResultError, ResultOk } from '@utils/api-utils';
import snakeCase from 'lodash/snakeCase';
import { NextApiRequest, NextApiResponse } from 'next';

type PostData = HasMessage;
export type Program_Index_PostData = TResultSuccess<PostData>;
export type Program_Index_PostBody = AddProgramFormValues;

async function post(
  req: NextApiRequest,
  res: NextApiResponse<TResult<PostData>>
) {
  const newProgram: Program_Index_PostBody = req.body;
  const id = snakeCase(newProgram.code);

  if (await ProgramService.isProgramExist(id))
    return res.status(422).json(ResultError('Program exists'));

  await ProgramService.addProgram({ ...newProgram, id });
  return res.status(201).json(ResultOk());
}

export default withApiHandler({ post });
