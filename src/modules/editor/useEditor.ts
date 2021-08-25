import { useState } from 'react';
import { createEditor, Descendant, Element } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';

export const useEditor = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [editor] = useState(() => withHistory(withReact(createEditor())));

  const onChange = setValue;

  return { value, onChange, editor };
};

const initialValue: Element[] = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];
