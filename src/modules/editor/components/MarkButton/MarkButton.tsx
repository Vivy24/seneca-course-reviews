import { IconButton } from '@chakra-ui/react';
import { FaBold, FaCode, FaItalic, FaUnderline } from 'react-icons/fa';
import { MarkFormat } from 'slate';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark } from '../..';

type Props = {
  format: MarkFormat;
};
const MarkButton = ({ format }: Props) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  return (
    <IconButton
      aria-label={format}
      title={format}
      icon={<Icon name={format} />}
      isActive={isActive}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    />
  );
};

type IconProps = {
  name: MarkFormat;
};
const Icon = ({ name }: IconProps) => {
  switch (name) {
    case 'bold':
      return <FaBold />;

    case 'italic':
      return <FaItalic />;

    case 'underline':
      return <FaUnderline />;

    case 'code':
      return <FaCode />;

    default:
      throw new Error("Invalid icon's name");
  }
};

export default MarkButton;
