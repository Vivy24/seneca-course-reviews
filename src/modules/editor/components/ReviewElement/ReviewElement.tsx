import {
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { RenderedElements } from 'slate';
import { RenderElementProps } from 'slate-react';

const ParagraphElement = (props: RenderElementProps) => {
  return (
    <Text mb="4" {...props.attributes}>
      {props.children}
    </Text>
  );
};

const HeadingTwoElement = (props: RenderElementProps) => {
  return (
    <Heading as="h2" size="md" mt="3" mb="1" {...props.attributes}>
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
  return (
    <UnorderedList ml="8" mt="-4" mb="4" {...props.attributes}>
      {props.children}
    </UnorderedList>
  );
};

const OrderedListElement = (props: RenderElementProps) => {
  return (
    <OrderedList ml="8" mt="-4" mb="4" {...props.attributes}>
      {props.children}
    </OrderedList>
  );
};

const elements: RenderedElements = {
  paragraph: ParagraphElement,
  h2: HeadingTwoElement,
  'block-quote': BlockQuoteElement,
  'list-item': ListItemElement,
  'list-ol': OrderedListElement,
  'list-ul': UnorderedListElement,
};

export function renderReviewRichText(props: RenderElementProps) {
  const Element = elements[props.element.type] ?? elements.paragraph;

  if (!Element) throw new Error("Unsupported element's type");

  return <Element {...props} />;
}
