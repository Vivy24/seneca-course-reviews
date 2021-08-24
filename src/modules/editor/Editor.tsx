import React, { useMemo, useState } from 'react';
import { createEditor, CustomElement, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

function Editor() {
  const editor = useMemo(() => withReact(createEditor()), []);

  const initialValue: CustomElement[] = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ];
  const [value, setValue] = useState<Descendant[]>(initialValue);
  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <Editable />
    </Slate>
  );
}

export default Editor;
