import { TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { Course } from '@modules/course/model/Course';
import { PageService } from '@modules/page-data/service/page-service';
import { ResultSuccess } from '@utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

type Params = {
  id: string;
};

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */

type GetData = Course[];
export type PageData_Courses_GetData = TResultSuccess<GetData>;
export type PageData_Courses_GetQuery = {};

async function get(
  req: NextApiRequest,
  res: NextApiResponse<TResult<GetData>>
) {
  const courses = await PageService.getCoursesPage();

  return res.status(200).json(ResultSuccess(courses));
}

export default withApiHandler({ get });
