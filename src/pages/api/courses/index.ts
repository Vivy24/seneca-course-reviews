// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TResult } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { Course, CoursesFormatOptions } from '@modules/course';
import { CourseService } from '@modules/course/server-index';
import { ResultSuccess } from '@utils/api-utils';
import type { NextApiRequest, NextApiResponse } from 'next';

export type Courses_Index_GetData = Course[];
export type Courses_Index_GetQuery = Pick<
  CoursesFormatOptions,
  'order' | 'sortBy'
>;
async function get(
  req: NextApiRequest,
  res: NextApiResponse<TResult<Courses_Index_GetData>>
) {
  const query = req.query as Courses_Index_GetQuery;
  const courses = await CourseService.getAllCourses();
  CourseService.formatCourses(courses, query);

  return res.status(200).json(ResultSuccess(courses));
}

export default withApiHandler({ get });
