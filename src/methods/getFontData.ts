import { join } from 'node:path';
import { readFile } from 'node:fs/promises';

export const getFontData = async (): Promise<Buffer | ArrayBuffer> => {
  const fontDataBuffer = await readFile(
    join(process.cwd(), 'assets', 'PlayfairDisplay-Regular.ttf')
  );
  return fontDataBuffer;
};
