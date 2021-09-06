import {
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { RenderedElements } from 'slate';
import { RenderElementProps } from 'slate-react';

const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const ParagraphElement = (props: RenderElementProps) => {
  return <Text {...props.attributes}>{props.children}</Text>;
};

const HeadingOneElement = (props: RenderElementProps) => {
  return (
    <Heading as="h1" size="2xl" mt="5" mb="2" {...props.attributes}>
      {props.children}
    </Heading>
  );
};

const HeadingTwoElement = (props: RenderElementProps) => {
  return (
    <Heading as="h2" size="lg" mt="3" mb="1" {...props.attributes}>
      {props.children}
    </Heading>
  );
};

const BlockQuoteElement = (props: RenderElementProps) => {
  return (
    <Text as="blockquote" {...props.attributes}>
      {props.children}
    </Text>
  );
};

const ListItemElement = (props: RenderElementProps) => {
  return <ListItem {...props.attributes}>{props.children}</ListItem>;
};

const UnorderedListElement = (props: RenderElementProps) => {
  return <UnorderedList {...props.attributes}>{props.children}</UnorderedList>;
};

const OrderedListElement = (props: RenderElementProps) => {
  return <OrderedList {...props.attributes}>{props.children}</OrderedList>;
};

const elements: RenderedElements = {
  code: CodeElement,
  paragraph: ParagraphElement,
  h1: HeadingOneElement,
  h2: HeadingTwoElement,
  'block-quote': BlockQuoteElement,
  'list-item': ListItemElement,
  'list-ol': OrderedListElement,
  'list-ul': UnorderedListElement,
};

export function renderEditorRichText(props: RenderElementProps) {
  const Element = elements[props.element.type] ?? elements.paragraph;

  if (!Element) throw new Error("Unsupported element's type");

  return <Element {...props} />;
}
