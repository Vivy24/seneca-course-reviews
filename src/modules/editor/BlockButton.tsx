import { IconButton } from '@chakra-ui/react';
import {
  FaDiceFive,
  FaDiceFour,
  FaDiceOne,
  FaDiceSix,
  FaDiceThree,
  FaDiceTwo,
  FaListOl,
  FaListUl,
  FaQuoteRight,
} from 'react-icons/fa';
import { BlockFormat } from 'slate';
import { useSlate } from 'slate-react';
import { isBlockActive, toggleBlock } from './editor-utils';
type Props = {
  format: BlockFormat;
};
const BlockButton = ({ format }: Props) => {
  const editor = useSlate();

  return (
    <IconButton
      aria-label={format}
      title={format}
      icon={<Icon name={format} />}
      isActive={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    />
  );
};

type IconProps = { name: BlockFormat };
const Icon = ({ name }: IconProps) => {
  switch (name) {
    case 'h1':
      return <FaDiceOne />;

    case 'h2':
      return <FaDiceTwo />;

    case 'h3':
      return <FaDiceThree />;

    case 'h4':
      return <FaDiceFour />;

    case 'h5':
      return <FaDiceFive />;

    case 'h6':
      return <FaDiceSix />;

    case 'block-quote':
      return <FaQuoteRight />;

    case 'list-ol':
      return <FaListOl />;

    case 'list-ul':
      return <FaListUl />;

    default:
      throw new Error('Unsupported icon format');
  }
};

export default BlockButton;
