import { HasMessage, TResult } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { AddCourseFormValues } from '@modules/course/components/AddCourseForm/add-course-form-schema';
import { CourseService } from '@modules/course/server-index';
import { ResultError, ResultOk } from '@utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

export type Course_Index_PostData = HasMessage;
export type Course_Index_PostBody = AddCourseFormValues;

async function post(
  req: NextApiRequest,
  res: NextApiResponse<TResult<Course_Index_PostData>>
) {
  const newCourse: Course_Index_PostBody = req.body;

  if (await CourseService.isCourseExist(newCourse.courseId))
    return res.status(422).json(ResultError('Course exist'));

  await CourseService.addCourse(newCourse);
  return res.status(201).json(ResultOk());
}

export default withApiHandler({ post });
