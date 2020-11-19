import {
  Box, Button, Select, Flex,
} from '@chakra-ui/react';
import * as React from 'react';
import pdf from '../worker/pdf';

export interface TextExporterProps {
  text: string
}

const extensions = ['pdf', 'csv', 'txt'];

enum FileExtension {
  PDF = 'pdf',
  TXT = 'txt',
  CSV = 'csv'
}
const writeFile = async (type: FileExtension, handler : unknown, text : string) => {
  // @ts-ignore
  const writable = await handler.createWritable();
  switch (type) {
    case FileExtension.TXT:
      await writable.write(text);
      break;
    case FileExtension.PDF:
      await pdf(writable, text);
      break;
    default:
      break;
  }
  await writable.close();
};

const TextExporter : React.FunctionComponent<TextExporterProps> = ({ text }) => {
  const [fileType, setFileType] = React.useState<FileExtension>(FileExtension.TXT);

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

    writeFile(fileType, fileHandler, text);
  };

  const handleFileTypeChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setFileType(e.target.value as FileExtension);
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
