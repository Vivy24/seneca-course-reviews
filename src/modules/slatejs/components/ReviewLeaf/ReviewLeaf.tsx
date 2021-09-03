import { Text } from '@chakra-ui/react';
import escapeHTML from 'escape-html';
import React from 'react';
import { Text as SlateText } from 'slate';

type Props = {
  leaf: SlateText;
};
export const ReviewLeaf = (props: Props) => {
  let children = <span>{escapeHTML(props.leaf.text)}</span>;

  if (props.leaf.bold) {
    children = (
      <Text as="span" fontWeight="bold">
        {children}
      </Text>
    );
  }

  if (props.leaf.code) {
    children = <Text as="code">{children}</Text>;
  }

  if (props.leaf.italic) {
    children = (
      <Text as="span" fontStyle="italic">
        {children}
      </Text>
    );
  }

  if (props.leaf.underline) {
    children = (
      <Text as="span" textDecor="underline">
        {children}
      </Text>
    );
  }

  return children;
};
