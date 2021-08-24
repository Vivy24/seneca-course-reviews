import { ButtonGroup, Flex } from '@chakra-ui/react';
import isHotkey from 'is-hotkey';
import React, { KeyboardEventHandler, useCallback, useState } from 'react';
import { createEditor, Descendant, Element } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import BlockButton from './BlockButton';
import {
  BLOCK_HOTKEYS,
  MARK_HOTKEYS,
  toggleBlock,
  toggleMark,
} from './editor-utils';
import { renderElement } from './EditorElement';
import { renderLeaf } from './EditorLeaf';
import MarkButton from './MarkButton';

function Editor() {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const memoRenderElement = useCallback(renderElement, []);
  const memoRenderLeaf = useCallback(renderLeaf, []);
  const [editor] = useState(() => withHistory(withReact(createEditor())));

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
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
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      {/* <Toolbar> */}
      <Flex gridGap={1} py={5} px={3} borderBottom={'1px'}>
        <ButtonGroup colorScheme="gray" isAttached>
          <MarkButton format="bold" />
          <MarkButton format="italic" />
          <MarkButton format="underline" />
          <MarkButton format="code" />
        </ButtonGroup>

        <ButtonGroup isAttached colorScheme="gray">
          <BlockButton format="h1" />
          <BlockButton format="h2" />
          <BlockButton format="block-quote" />
          <BlockButton format="list-ol" />
          <BlockButton format="list-ul" />
        </ButtonGroup>
      </Flex>
      {/* </Toolbar> */}
      <Editable
        renderElement={memoRenderElement}
        renderLeaf={memoRenderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={handleKeyDown}
      />
    </Slate>
  );
}

const initialValue: Element[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Edit ' }],
  },
];

export default Editor;
