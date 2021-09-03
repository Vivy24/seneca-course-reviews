import { renderElement, renderLeaf, useEditor } from '@modules/editor';
import React, { useCallback } from 'react';
import { Descendant } from 'slate';
import { Editable, Slate } from 'slate-react';

type Props = {
  value: Descendant[];
};
export const ReviewSerializer = (props: Props) => {
  const memoRenderElement = useCallback(renderElement, []);
  const memoRenderLeaf = useCallback(renderLeaf, []);
  const slateProps = useEditor(props.value);

  return (
    <Slate {...slateProps}>
      <Editable
        readOnly
        renderElement={memoRenderElement}
        renderLeaf={memoRenderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
      />
    </Slate>
  );
};
