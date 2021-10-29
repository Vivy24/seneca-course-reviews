import { useEditor } from '@modules/editor/hooks/useEditor';
import React, { useCallback } from 'react';
import { Descendant } from 'slate';
import { Editable, Slate } from 'slate-react';
import { renderLeaf } from '../EditorLeaf/EditorLeaf';
import { renderReviewRichText } from '../ReviewElement/ReviewElement';

type Props = {
  value: Descendant[];
};
export const ReviewSerializer = (props: Props) => {
  const memoRenderElement = useCallback(renderReviewRichText, []);
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
