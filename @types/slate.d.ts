import 'slate';
import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

declare module 'slate' {
  type FormatableText = { text: string; bold?: true };
  type Text = { text: string };

  type Paragraph = { type: 'paragraph'; children: FormatableText[] };
  type Heading = { type: 'heading'; children: FormatableText[] };
  type Code = { type: 'code'; children: Text[] };

  type CustomElement = Paragraph | Heading | Code;

  type CustomText = FormatableText | Text;

  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }

  /**
   * @override constraint element's type
   */
  interface RenderElementProps {
    element: CustomElement;
  }

  interface Node {
    type: CustomElement['type'];
  }
}
