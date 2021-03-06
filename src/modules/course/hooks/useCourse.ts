import { Course_Id_GetData } from '@api/course/[id]';
import { Nullable } from '@utilities';
import axios from 'axios';
import { QueryFunctionContext, useQuery } from 'react-query';
import { Course } from '../model/Course';

type QueryKey = [string, string];

const fetcher = async (ctx: QueryFunctionContext<QueryKey>) => {
  const res = await axios.get<Course_Id_GetData>(
    `/api/course/${ctx.queryKey[1]}`
  );

  return res.data.data;
};

export function useCourse(course: Nullable<Course>) {
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const result = useQuery(['course', course!.id], fetcher, {
    enabled: Boolean(course),
    placeholderData: course,
  });

  return result;
}
