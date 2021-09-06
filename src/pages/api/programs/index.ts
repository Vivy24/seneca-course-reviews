// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Order, TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { Program } from '@modules/program';
import { ProgramService } from '@modules/program/server-index';
import { ResultSuccess } from '@utils/api-utils';
import { sortAlphabet, sortDate } from '@utils/sort-utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type GetData = Program[];
export type Programs_Index_GetData = TResultSuccess<GetData>;
export type Programs_Index_GetQuery = Partial<{
  sort: 'id' | 'name' | 'createdDate';
  order: Order;
}>;
async function get(
  req: NextApiRequest,
  res: NextApiResponse<TResult<GetData>>
) {
  const query = req.query as Programs_Index_GetQuery;
  const programs = await ProgramService.getAllPrograms();

  switch (query.sort) {
    case 'id':
      programs.sort((a, b) => sortAlphabet(a.id, b.id));
      break;

    case 'name':
      programs.sort((a, b) => sortAlphabet(a.name, b.name));
      break;

    case 'createdDate':
      programs.sort((a, b) => sortDate(a._createdAt, b._createdAt));
      break;

    default:
      break;
  }

  if (query.order === 'desc') programs.reverse();

  return res.status(200).json(ResultSuccess(programs));
}

export default withApiHandler({ get });
