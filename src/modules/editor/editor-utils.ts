import { CustomElement, Editor, Transforms } from 'slate';

export const toggleFormattedBlock = (
  editor: Editor,
  type: CustomElement['type']
) => {
  const match = isFormattedBlock(editor, type);

  Transforms.setNodes(
    editor,
    { type: match ? 'paragraph' : type },
    { match: (node) => Editor.isBlock(editor, node) }
  );
};

export const isFormattedBlock = (
  editor: Editor,
  type: CustomElement['type']
) => {
  const [match] = Editor.nodes(editor, {
    match: (node) => node.type === type,
  });

  return match;
};
