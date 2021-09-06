import { HasMessage, TResult } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { AddCourseFormValues } from '@modules/course';
import { CourseService } from '@modules/course/server-index';
import { ResultError, ResultOk } from '@utils/api-utils';
import difference from 'lodash/difference';
import { NextApiRequest, NextApiResponse } from 'next';

/* -------------------------------------------------------------------------- */
/*                                    POST                                    */
/* -------------------------------------------------------------------------- */

export type Course_Index_PostData = HasMessage;
export type Course_Index_PostBody = AddCourseFormValues;

async function post(
  req: NextApiRequest,
  res: NextApiResponse<TResult<Course_Index_PostData>>
) {
  const newCourse: Course_Index_PostBody = req.body;

  const course = await CourseService.getCourse(newCourse.courseId);
  if (course === null) {
    await CourseService.addCourse(newCourse);
    return res.status(201).json(ResultOk());
  }

  const programIdDifferenceList = difference(
    newCourse.programIdList,
    course.programIdList
  );

  if (programIdDifferenceList.length > 0) {
    await CourseService.addProgramsToCourse(
      course.courseId,
      programIdDifferenceList
    );

    return res.status(200).json(ResultOk());
  }

  return res.status(422).json(ResultError('Course exist'));
}

export default withApiHandler({ post });
