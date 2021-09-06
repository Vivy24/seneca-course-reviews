import { PartiallyPartial } from '@utilities';
import { VFC } from 'react';
import 'slate';
import { BaseEditor, Element, Text } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor, RenderElementProps } from 'slate-react';

type FormatableText = {
  text: string;
  bold?: true;
  italic?: true;
  code?: true;
  underline?: true;
};

type Paragraph = { type: 'paragraph'; children: FormatableText[] };
type HeadingOne = { type: 'h1'; children: FormatableText[] };
type HeadingTwo = { type: 'h2'; children: FormatableText[] };
type HeadingThree = { type: 'h3'; children: FormatableText[] };
type HeadingFour = { type: 'h4'; children: FormatableText[] };
type HeadingFive = { type: 'h5'; children: FormatableText[] };
type HeadingSix = { type: 'h6'; children: FormatableText[] };
type Code = { type: 'code'; children: Text[] };
type OrderedList = { type: 'list-ol'; children: Text[] };
type ListItem = { type: 'list-item'; children: Text[] };
type UnorderedList = { type: 'list-ul'; children: Text[] };
type BlockQuote = { type: 'block-quote'; children: Text[] };

type CustomText = FormatableText;

type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  type CustomElement =
    | Paragraph
    | HeadingOne
    | HeadingTwo
    | HeadingThree
    | HeadingFour
    | HeadingFive
    | HeadingSix
    | Code
    | OrderedList
    | UnorderedList
    | ListItem
    | BlockQuote;

  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }

  type MarkFormat = keyof Omit<Text, 'text'>;
  type BlockFormat = Element['type'];

  export type RenderedElements = PartiallyPartial<
    Record<Element['type'], VFC<RenderElementProps>>,
    'paragraph'
  >;
}
