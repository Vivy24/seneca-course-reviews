import { Text } from '@chakra-ui/react';
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

export const renderElement = (props: RenderElementProps) => {
  let Element: VFC<RenderElementProps>;

  switch (props.element.type) {
    case 'code':
      Element = CodeElement;
      break;

    case 'paragraph':
      Element = ParagraphElement;
      break;

    default:
      throw new Error("Invalid element's type");
  }

  return <Element {...props} />;
};
