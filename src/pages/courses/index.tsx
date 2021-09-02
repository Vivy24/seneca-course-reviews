import { Courses_Index_GetData } from '@api/courses';
import { Box, Heading } from '@chakra-ui/react';
import { Course, CoursePreviewCard } from '@modules/course';
import { PreviewGridList } from '@ui/PreviewGridList';
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const CoursesIndexPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useQuery({
    queryFn: () => axios.get<Courses_Index_GetData>('/api/courses'),
    onSuccess: (response) => setCourses(response.data.data),
  });

  return (
    <Box>
      <Heading textAlign="center" size="4xl">
        Courses
      </Heading>

      <PreviewGridList>
        {courses.map((course) => (
          <CoursePreviewCard key={course.courseId} course={course} />
        ))}
      </PreviewGridList>
    </Box>
  );
};

export default CoursesIndexPage;
