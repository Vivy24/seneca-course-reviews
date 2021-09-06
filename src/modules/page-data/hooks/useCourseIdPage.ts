import { PageData_PageData_Course_Id_GetData } from '@api/page-data/course/[id]';
import { TResult, TResultSuccess } from '@common';
import { Nullable } from '@utilities';
import axios from 'axios';
import { QueryFunctionContext, useQuery } from 'react-query';

type QueryKey = [key: string, key: string, courseId: Nullable<string>];
async function fetcher(ctx: QueryFunctionContext<QueryKey>) {
  const res = await axios.get<
    TResultSuccess<PageData_PageData_Course_Id_GetData>
  >(`/api/page-data/course/${ctx.queryKey[2]}`);

  return res.data.data;
}

export function useCourseIdPage(
  placeholderData: TResult<PageData_PageData_Course_Id_GetData>['data']
) {
  return useQuery(
    ['course', 'course-reviews', placeholderData?.course.courseId],
    fetcher,
    {
      placeholderData,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
    }
  );
}
