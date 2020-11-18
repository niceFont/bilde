import * as React from 'react';
import './Index.css';
import {
  Container,
  Heading,
  Button,
  Text,
  Flex,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  Divider,
  Select,
  Progress,
} from '@chakra-ui/react';
import ocr from '../worker';
import LANGUAGE_MAP from '../worker/languages';
import TextExport from '../components/TextExport';
import Notifier, { Notification } from '../worker/notifier';

const Index = () => {
  const [file, setFile] = React.useState<File>();
  const [lang, setLang] = React.useState<string>('eng');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | undefined | null>();
  const [text, setText] = React.useState<string>('');
  const [workerState, setWorkerState] = React.useState<Notification>();

  const handleUpload = (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };
  const notifier = Notifier.getNotifier();
  notifier.subscribe('Index', (notification : Notification) => {
    console.log(notification);
    setWorkerState(notification);
  });

  const handleLangChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      if (file) {
        setLoading(true);
        const result = await ocr(file, lang);
        setText(result);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container marginTop="100px" maxWidth="1200px">
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error:</AlertTitle>
          There was a problem while processing your file, try again.
        </Alert>
      )}
      <Box display="flex" justifyContent="center">
        <Heading marginBottom="40px">ReactOCR - Image Recognition</Heading>
      </Box>
      <Flex justify="center" alignItems="center">
        <Box>
          <input className="custom-file-input" onChange={handleUpload} type="file" />
        </Box>
        <Box>
          <Select value={lang} onChange={handleLangChange}>
            {Object.entries(LANGUAGE_MAP).map(([name, ident]) => (
              <option key={ident} value={ident}>{name}</option>
            ))}
          </Select>
        </Box>
        <Box>
          <Button
            loadingText="Loading.."
            isLoading={loading}
            disabled={loading || !file}
            onClick={handleSubmit}
          >
            Parse
          </Button>
        </Box>
      </Flex>
      {loading && (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Progress
            width="100%"
            marginTop="20px"
            value={workerState?.progress ? workerState.progress * 100 : 0}
          />
          <Heading size="md">
            {workerState?.status}
          </Heading>
        </Box>
      )}
      {text && (
        <Box marginTop="100px">
          <Flex alignItems="center" justify="space-between">
            <Heading as="h6" size="lg">Output:</Heading>
            <TextExport text={text} />
          </Flex>
          <Divider />
          <Box padding="1rem">
            <Text>
              {text}
            </Text>
          </Box>
        </Box>
      )}
    </Container>
  );
};
export default Index;
