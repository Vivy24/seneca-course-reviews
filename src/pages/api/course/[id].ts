import { TResult } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { Course } from '@modules/course';
import { CourseService } from '@modules/course/service';
import { ResultNotFound, ResultSuccess } from '@utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

type Params = {
  id: string;
};

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */

export type Course_Id_GetData = Course;
export type Course_Id_GetQuery = {};

async function get(
  req: NextApiRequest,
  res: NextApiResponse<TResult<Course_Id_GetData>>
) {
  const query = req.query as Course_Id_GetQuery & Params;

  const course = await CourseService.getCourse(query.id);

  if (course === null) {
    return res.status(404).json(ResultNotFound());
  }

  return res.status(200).json(ResultSuccess(course));
}

export default withApiHandler({ get });
