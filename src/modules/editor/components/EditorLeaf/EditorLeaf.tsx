import { Text } from '@chakra-ui/react';
import { Text as SlateText } from 'slate';
import { RenderLeafProps } from 'slate-react';

type Props = RenderLeafProps;
const Leaf = ({ attributes, children, leaf }: Props) => {
  if (leaf.bold) {
    children = (
      <Text as="span" fontWeight="bold">
        {children}
      </Text>
    );
  }

  if (leaf.code) {
    children = <Text as="code">{children}</Text>;
  }

  if (leaf.italic) {
    children = (
      <Text as="span" fontStyle="italic">
        {children}
      </Text>
    );
  }

  if (leaf.underline) {
    children = (
      <Text as="span" textDecor="underline">
        {children}
      </Text>
    );
  }

  return (
    <Text as="span" {...attributes}>
      {children}
    </Text>
  );
};

export const renderLeafNode = (node: SlateText) => {
  let children = <span>{node.text}</span>;

  if (node.bold) {
    children = (
      <Text as="span" fontWeight="bold">
        {children}
      </Text>
    );
  }

  if (node.code) {
    children = <Text as="code">{children}</Text>;
  }

  if (node.italic) {
    children = (
      <Text as="span" fontStyle="italic">
        {children}
      </Text>
    );
  }

  if (node.underline) {
    children = (
      <Text as="span" textDecor="underline">
        {children}
      </Text>
    );
  }

  return children;
};

export const renderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;
