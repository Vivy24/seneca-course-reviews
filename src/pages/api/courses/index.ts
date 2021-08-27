// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { Course, CourseService } from '@modules/course';
import { ResultSuccess } from '@utils/api-utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type GetData = Course[];
export type Courses_Index_GetData = TResultSuccess<GetData>;
async function get(
  req: NextApiRequest,
  res: NextApiResponse<TResult<GetData>>
) {
  const courses = await CourseService.getAllCourses();

  return res.status(200).json(ResultSuccess(courses));
}

export default withApiHandler({ get });
