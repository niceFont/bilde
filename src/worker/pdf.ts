import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export default async (writeStream: WritableStream, text : string) => {
  const doc = await PDFDocument.create();

  const font = await doc.embedFont(StandardFonts.TimesRoman);
  const page = doc.addPage();

  page.drawText(text, {
    x: 0,
    y: 0,
    size: 16,
    font,
    color: rgb(0, 0, 0),
  });

  const bytes = await doc.save();

  // @ts-ignore
  writeStream.write(bytes);
};
