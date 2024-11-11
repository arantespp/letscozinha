import { join } from 'node:path';
import { readFile, readdir } from 'node:fs/promises';

export const getFontData = async (): Promise<Buffer | ArrayBuffer> => {
  for (const file of await readdir(join(process.cwd(), 'assets'))) {
    console.log('file', file);
  }

  const fontDataBuffer = await readFile(
    join(process.cwd(), 'assets', 'PlayfairDisplay-Regular.ttf')
  );
  return fontDataBuffer;
};
