import 'slate';
import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

declare module 'slate' {
  type CustomElement = { type: 'paragraph'; children: CustomText[] };
  type CustomText = { text: string; bold?: true };

  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
