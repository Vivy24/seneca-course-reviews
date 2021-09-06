import { TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { Course } from '@modules/course';
import { PopulatedCourseReview } from '@modules/course-review/service';
import { PageService } from '@modules/page-data/service';
import { ResultNotFound, ResultSuccess } from '@utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

type Params = {
  id: string;
};

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */

type GetData = {
  course: Course;
  reviews: PopulatedCourseReview[];
};
export type PageData_PageData_Course_Id_GetData = TResultSuccess<GetData>;
export type PageData_Course_Id_GetQuery = {};

async function get(
  req: NextApiRequest,
  res: NextApiResponse<TResult<GetData>>
) {
  const query = req.query as PageData_Course_Id_GetQuery & Params;

  const { course, reviews } = await PageService.getCourseIdPage(query.id);

  if (course === null) {
    return res.status(404).json(ResultNotFound());
  }

  return res.status(200).json(ResultSuccess({ course, reviews }));
}

export default withApiHandler({ get });
