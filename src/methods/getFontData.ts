import { readFileSync } from 'fs';
import { join } from 'path';

export const getFontData = (): ArrayBuffer => {
  const buffer = readFileSync(
    join(process.cwd(), 'public/assets/PlayfairDisplay-Regular.ttf')
  );
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer;
};
