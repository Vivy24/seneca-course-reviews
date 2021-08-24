import {
  BlockFormat,
  Editor,
  Element as SlateElement,
  MarkFormat,
  Transforms,
} from 'slate';

const LIST_TYPES: BlockFormat[] = ['list-ol', 'list-ul'];

export const MARK_HOTKEYS: Record<string, MarkFormat> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

export const BLOCK_HOTKEYS: Record<string, BlockFormat> = {
  'mod+1': 'h1',
  'mod+2': 'h2',
};

//#region Blocks
export const toggleBlock = (editor: Editor, format: BlockFormat) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (node) => {
      if (SlateElement.isElement(node)) {
        return LIST_TYPES.includes(node.type);
      }

      return false;
    },
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const isBlockActive = (editor: Editor, format: BlockFormat) => {
  const [match] = Editor.nodes(editor, {
    match: (node) => SlateElement.isElement(node) && node.type === format,
  });

  return Boolean(match);
};

//#endregion

//#region Marks

export const isMarkActive = (editor: Editor, format: MarkFormat) => {
  const marks = Editor.marks(editor);

  if (marks) {
    return marks[format] === true;
  }

  return false;
};

export const toggleMark = (editor: Editor, format: MarkFormat) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

//#endregion
