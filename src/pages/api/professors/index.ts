// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { Professor } from '@modules/professor';
import { ProfessorSerivce } from '@modules/professor/server-index';
import { ResultSuccess } from '@utils/api-utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type GetData = Professor[];
export type Professors_Index_GetData = TResultSuccess<GetData>;
async function get(
  req: NextApiRequest,
  res: NextApiResponse<TResult<GetData>>
) {
  const professors = await ProfessorSerivce.getAllProfessors();

  return res.status(200).json(ResultSuccess(professors));
}

export default withApiHandler({ get });
