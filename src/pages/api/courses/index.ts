// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Order, TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { Course } from '@modules/course';
import { CourseService } from '@modules/course/server-index';
import { ResultSuccess } from '@utils/api-utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type GetData = Course[];
export type Courses_Index_GetData = TResultSuccess<GetData>;
export type Courses_Index_GetQuery = Partial<{
  sort: 'id' | 'name' | 'createdDate';
  order: Order;
}>;
async function get(
  req: NextApiRequest,
  res: NextApiResponse<TResult<GetData>>
) {
  const query = req.query as Courses_Index_GetQuery;
  const courses = await CourseService.getAllCourses();

  switch (query.sort) {
    case 'id':
      courses.sort((a, b) => a.courseId.localeCompare(b.courseId));
      break;

    case 'name':
      courses.sort((a, b) => a.courseName.localeCompare(b.courseName));
      break;

    case 'createdDate':
      courses.sort(
        (a, b) =>
          new Date(a._createdAt).getTime() - new Date(b._createdAt).getTime()
      );
      break;

    default:
      break;
  }

  switch (query.order) {
    case 'desc':
      courses.reverse();
      break;

    case 'asc':
    default:
      break;
  }

  return res.status(200).json(ResultSuccess(courses));
}

export default withApiHandler({ get });
