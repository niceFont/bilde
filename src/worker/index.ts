import { createWorker } from 'tesseract.js';
import LANGUAGE_MAP from './languages';
import Notifier from './notifier';

function isValidLang(lang : string) : boolean {
  return !!Object.values(LANGUAGE_MAP).find((langIdent) => lang === langIdent);
}
const notifier = Notifier.getNotifier();
const worker = createWorker({
  logger: (message) => notifier.notify(message),
  errorHandler: (error) => console.error(error),
});

export default async (image : File, lang : string | undefined = 'eng') => {
  if (!isValidLang(lang)) throw new Error('Language provided is not valid');
  await worker.load();
  await worker.loadLanguage(lang);
  await worker.initialize(lang);

  const { data: { text } } = await worker.recognize(image);
  await worker.terminate();

  return text;
};
