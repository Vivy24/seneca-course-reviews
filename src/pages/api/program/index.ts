import { HasMessage, TResult } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { AddProgramFormValues } from '@modules/program';
import { ProgramService } from '@modules/program/server-index';
import { ResultError, ResultOk } from '@utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

type PostData = HasMessage;
export type Program_Index_PostData = HasMessage;
export type Program_Index_PostBody = AddProgramFormValues;

async function post(
  req: NextApiRequest,
  res: NextApiResponse<TResult<PostData>>
) {
  const newProgram: Program_Index_PostBody = req.body;

  if (await ProgramService.isProgramExist(newProgram.id))
    return res.status(422).json(ResultError('Program exists'));

  await ProgramService.addProgram(newProgram);
  return res.status(201).json(ResultOk());
}

export default withApiHandler({ post });
