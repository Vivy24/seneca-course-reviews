import {
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { VFC } from 'react';
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
    <Heading as="h1" size="4xl" {...props.attributes}>
      {props.children}
    </Heading>
  );
};

const HeadingTwoElement = (props: RenderElementProps) => {
  return (
    <Heading as="h2" size="3xl" {...props.attributes}>
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

export const renderElement = (props: RenderElementProps) => {
  let Element: VFC<RenderElementProps>;

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

  return <Element {...props} />;
};
