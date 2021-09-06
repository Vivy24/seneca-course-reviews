import { HasMessage, TResult, TResultSuccess } from '@common';
import { withApiHandler } from '@lib/api/withApiHandler';
import { AddCourseFormValues } from '@modules/course';
import { CourseService } from '@modules/course/server-index';
import { ResultError, ResultOk } from '@utils/api-utils';
import difference from 'lodash/difference';
import snakeCase from 'lodash/snakeCase';
import { NextApiRequest, NextApiResponse } from 'next';

/* -------------------------------------------------------------------------- */
/*                                    POST                                    */
/* -------------------------------------------------------------------------- */
type PostData = HasMessage;
export type Course_Index_PostData = TResultSuccess<PostData>;
export type Course_Index_PostBody = AddCourseFormValues;

async function post(
  req: NextApiRequest,
  res: NextApiResponse<TResult<PostData>>
) {
  const newCourse: Course_Index_PostBody = req.body;
  const id = snakeCase(newCourse.code);

  const course = await CourseService.getCourse(id);
  if (course === null) {
    await CourseService.addCourse({ ...newCourse, id });
    return res.status(201).json(ResultOk());
  }

  const programIdDifferenceList = difference(
    newCourse.programIdList,
    course.programIdList
  );

  if (programIdDifferenceList.length > 0) {
    await CourseService.addProgramsToCourse(course.id, programIdDifferenceList);

    return res.status(200).json(ResultOk());
  }

  return res.status(422).json(ResultError('Course exist'));
}

export default withApiHandler({ post });
