import { TResult } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { Course } from '@modules/course';
import { CourseReview } from '@modules/course-review';
import { PageService } from '@modules/page-data/service';
import { ResultNotFound, ResultSuccess } from '@utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

type Params = {
  id: string;
};

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */

export type PageData_PageData_Course_Id_GetData = {
  course: Course;
  reviews: CourseReview[];
};
export type PageData_Course_Id_GetQuery = {};

async function get(
  req: NextApiRequest,
  res: NextApiResponse<TResult<PageData_PageData_Course_Id_GetData>>
) {
  const query = req.query as PageData_Course_Id_GetQuery & Params;

  const { course, reviews } = await PageService.getCourseIdPage(query.id);

  if (course === null) {
    return res.status(404).json(ResultNotFound());
  }

  return res.status(200).json(ResultSuccess({ course, reviews }));
}

export default withApiHandler({ get });
