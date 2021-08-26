import { CourseReviews_Index_PostBody } from '@api/course-review';
import { CourseReviews_Index_GetData } from '@api/course-reviews';
import { Box, Button, Heading } from '@chakra-ui/react';
import { Editor } from '@modules/editor';
import { useEditor } from '@modules/editor/useEditor';
import axios from 'axios';
import type { NextPage } from 'next';
import { Slate } from 'slate-react';

const Home: NextPage = () => {
  const slateProps = useEditor();

  const handleSaveButtonClick = async () => {
    const data: CourseReviews_Index_PostBody = {
      _submittedAt: new Date().toISOString(),
      _type: 'course',
      courseId: 'uli101',
      body: slateProps.value,
      isRecommended: true,
      rating: 5,
      professorIdList: [],
    };

    await axios.post('/api/course-review', data);

    await axios.get<CourseReviews_Index_GetData>('/api/course-reviews');
  };

  return (
    <Box mx="auto" w="max-content">
      <Heading size="4xl">Slate editor</Heading>

      <Box w="60ch" shadow="lg" rounded="base" mt={5} h="md" overflowY="auto">
        <Slate {...slateProps}>
          <Editor />
        </Slate>
      </Box>

      <Button mt={5} onClick={handleSaveButtonClick}>
        Save
      </Button>
    </Box>
  );
};

export default Home;
