import React, { KeyboardEventHandler, useMemo, useState } from 'react';
import { createEditor, CustomElement, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { toggleFormattedBlock } from './editor-utils';
import { renderElement } from './EditorElement';

function Editor() {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState<Descendant[]>(initialValue);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === '`' && event.ctrlKey) {
      event.preventDefault();

      toggleFormattedBlock(editor, 'code');
    }
  };

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <Editable onKeyDown={handleKeyDown} renderElement={renderElement} />
    </Slate>
  );
}

const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

export default Editor;
