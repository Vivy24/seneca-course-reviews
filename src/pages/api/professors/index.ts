// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Order, TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { Professor } from '@modules/professor/model/Professor';
import { ProfessorSerivce } from '@modules/professor/service/professor-service';
import { ResultSuccess } from '@utils/api-utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type GetData = Professor[];
export type Professors_Index_GetData = TResultSuccess<GetData>;
export type Professors_Index_GetQuery = Partial<{
  sort: 'name' | 'createdDate';
  order: Order;
}>;
async function get(
  req: NextApiRequest,
  res: NextApiResponse<TResult<GetData>>
) {
  const query = req.query as Professors_Index_GetQuery;
  const professors = await ProfessorSerivce.getAllProfessors();

  switch (query.sort) {
    case 'name':
      professors.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'createdDate':
      professors.sort(
        (a, b) =>
          new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()
      );
      break;

    default:
      break;
  }

  switch (query.order) {
    case 'desc':
      professors.reverse();
      break;

    case 'asc':
    default:
      break;
  }

  return res.status(200).json(ResultSuccess(professors));
}

export default withApiHandler({ get });
