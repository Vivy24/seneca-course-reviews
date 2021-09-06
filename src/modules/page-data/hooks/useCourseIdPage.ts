import { PageData_PageData_Course_Id_GetData } from '@api/page-data/course/[id]';
import { AwaitTResult, Nullable } from '@utilities';
import axios from 'axios';
import { QueryFunctionContext, useQuery } from 'react-query';

type QueryKey = [key: string, key: string, courseId: Nullable<string>];
async function fetcher(ctx: QueryFunctionContext<QueryKey>) {
  const res = await axios.get<PageData_PageData_Course_Id_GetData>(
    `/api/page-data/course/${ctx.queryKey[2]}`
  );

  return res.data.data;
}

export function useCourseIdPage(placeholderData: AwaitTResult<typeof fetcher>) {
  return useQuery(
    ['course', 'course-reviews', placeholderData?.course.id],
    fetcher,
    {
      placeholderData,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60,
    }
  );
}
