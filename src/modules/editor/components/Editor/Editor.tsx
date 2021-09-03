import { Box, ButtonGroup, Flex, IconButton } from '@chakra-ui/react';
import isHotkey from 'is-hotkey';
import React, { KeyboardEventHandler, useCallback } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Editable, useSlate } from 'slate-react';
import { BlockButton, MarkButton, renderElement, renderLeaf } from '..';
import {
  BLOCK_HOTKEYS,
  MARK_HOTKEYS,
  removeAllMarks,
  toggleBlock,
  toggleMark,
} from '../..';

function Editor() {
  const memoRenderElement = useCallback(renderElement, []);
  const memoRenderLeaf = useCallback(renderLeaf, []);
  const editor = useSlate();

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter') {
      removeAllMarks(editor);
    }

    for (const hotkey in MARK_HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();

        const mark = MARK_HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }

    for (const hotkey in BLOCK_HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();

        const block = BLOCK_HOTKEYS[hotkey];
        toggleBlock(editor, block);
      }
    }
  };

  return (
    <Box position="relative">
      <Flex
        position="sticky"
        top="0"
        gridGap={1}
        p={5}
        shadow="sm"
        bg="white"
        zIndex="sticky"
      >
        <ButtonGroup colorScheme="gray" isAttached>
          <MarkButton format="bold" />
          <MarkButton format="italic" />
          <MarkButton format="underline" />

          <BlockButton format="h1" />
          <BlockButton format="h2" />
          <BlockButton format="list-ol" />
          <BlockButton format="list-ul" />

          <IconButton
            colorScheme="red"
            aria-label="Clear format"
            title="Clear format"
            icon={<FaTrash />}
            onClick={() => removeAllMarks(editor)}
          />
        </ButtonGroup>
      </Flex>

      <Box p={5}>
        <Editable
          renderElement={memoRenderElement}
          renderLeaf={memoRenderLeaf}
          placeholder="Enter some rich text…"
          spellCheck
          onKeyDown={handleKeyDown}
        />
      </Box>
    </Box>
  );
}

export default Editor;
