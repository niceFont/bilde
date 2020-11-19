/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Textarea, TextareaProps } from '@chakra-ui/react';

const AutoTextArea: React.FunctionComponent<TextareaProps> = ({
  children,
  value,
  onChange,
  ...props
}) => {
  const getRows = (text : string) : number => text.split('\n').length;
  const areaRef = React.useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = React.useState<number>(getRows(value as string));

  const handleChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    setRows(getRows(e.target.value));
    onChange?.call(null, e);
  };
  return (
    <Textarea
      onChange={handleChange}
      rows={rows}
      ref={areaRef}
      value={value}
      {...props}
      resize="none"
    >
      {children}
    </Textarea>
  );
};
export default AutoTextArea;
