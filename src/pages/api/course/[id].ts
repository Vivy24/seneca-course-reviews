import { TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { Course } from '@modules/course/model/Course';
import { CourseService } from '@modules/course/service/course-service';
import { ResultNotFound, ResultSuccess } from '@utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

type Params = {
  id: string;
};

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */
type GetData = Course;
export type Course_Id_GetData = TResultSuccess<GetData>;
export type Course_Id_GetQuery = Params;

async function get(
  req: NextApiRequest,
  res: NextApiResponse<TResult<GetData>>
) {
  const query = req.query as Course_Id_GetQuery;

  const course = await CourseService.getCourse(query.id);

  if (course === null) {
    return res.status(404).json(ResultNotFound());
  }

  return res.status(200).json(ResultSuccess(course));
}

export default withApiHandler({ get });
