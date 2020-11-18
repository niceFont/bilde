import {
  Box, Button, Select, Flex,
} from '@chakra-ui/react';
import * as React from 'react';

export interface TextExporterProps {
  text: string
}

const extensions = ['pdf', 'csv', 'txt'];

const TextExporter : React.FunctionComponent<TextExporterProps> = ({ text }) => {
  const [fileType, setFileType] = React.useState<string>('txt');

  const writeFile = async (handler : unknown) => {
    // @ts-ignore
    const writable = await handler.createWritable();
    await writable.write(text);
    await writable.close();
  };
  const openFileSaver = async () => {
    const options = {
      types: [
        {
          description: 'Files',
          accept: {
            'text/plain': [`.${fileType}`],
          },
        },
      ],
    };
    let fileHandler;
    if (window.showSaveFilePicker) {
      fileHandler = await window.showSaveFilePicker(options);
    } else {
      fileHandler = await window.chooseFileSystemEntries(options);
    }

    writeFile(fileHandler);
  };

  const handleFileTypeChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setFileType(e.target.value);
  };
  return (
    <Box>
      <Flex>
        <Select w="100px" value={fileType} onChange={handleFileTypeChange}>
          {extensions.map((ext) => (
            <option key={ext} value={ext}>{ext}</option>
          ))}
        </Select>
        <Button onClick={openFileSaver}>Save</Button>
      </Flex>
    </Box>
  );
};
export default TextExporter;
