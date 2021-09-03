import {
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React, { VFC } from 'react';
import { Element as SlateElement } from 'slate';

type Props = {
  element: SlateElement;
};
export const ReviewElement = (props: Props) => {
  let Element: VFC<SlateElement>;

  switch (props.element.type) {
    case 'code':
      Element = CodeElement;
      break;

    case 'paragraph':
      Element = ParagraphElement;
      break;

    case 'h1':
      Element = HeadingOneElement;
      break;

    case 'h2':
      Element = HeadingTwoElement;
      break;

    case 'block-quote':
      Element = BlockQuoteElement;
      break;

    case 'list-item':
      Element = ListItemElement;
      break;

    case 'list-ul':
      Element = UnorderedListElement;
      break;

    case 'list-ol':
      Element = OrderedListElement;
      break;

    case 'block-quote':
      Element = BlockQuoteElement;
      break;

    case 'block-quote':
      Element = BlockQuoteElement;
      break;

    default:
      throw new Error("Invalid element's type");
  }

  return <Element {...props.element} />;
};

const CodeElement = (props: SlateElement) => {
  return (
    <pre>
      <code>{JSON.stringify(props.children)}</code>
    </pre>
  );
};

const ParagraphElement = (props: SlateElement) => {
  return <Text>{JSON.stringify(props.children)}</Text>;
};

const HeadingOneElement = (props: SlateElement) => {
  return (
    <Heading as="h1" size="2xl" mt="5" mb="2">
      {JSON.stringify(props.children)}
    </Heading>
  );
};

const HeadingTwoElement = (props: SlateElement) => {
  return (
    <Heading as="h2" size="lg" mt="3" mb="1">
      {JSON.stringify(props.children)}
    </Heading>
  );
};

const BlockQuoteElement = (props: SlateElement) => {
  return <Text as="blockquote">{JSON.stringify(props.children)}</Text>;
};

const ListItemElement = (props: SlateElement) => {
  return <ListItem>{JSON.stringify(props.children)}</ListItem>;
};

const UnorderedListElement = (props: SlateElement) => {
  return <UnorderedList>{JSON.stringify(props.children)}</UnorderedList>;
};

const OrderedListElement = (props: SlateElement) => {
  return <OrderedList>{JSON.stringify(props.children)}</OrderedList>;
};
