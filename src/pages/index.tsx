import { Box, Button, Heading } from '@chakra-ui/react';
import { Editor } from '@modules/editor';
import { useEditor } from '@modules/editor/useEditor';
import axios from 'axios';
import type { NextPage } from 'next';
import { Slate } from 'slate-react';

const Home: NextPage = () => {
  const slateProps = useEditor();

  const handleSaveButtonClick = () => {
    axios.post('/api/course', slateProps.value).catch(console.error);
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
