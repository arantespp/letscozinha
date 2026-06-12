import fs from 'fs';
import path from 'path';

export const getFontData = async (): Promise<Buffer | ArrayBuffer> => {
  const fontPath = path.join(
    process.cwd(),
    'public/assets/PlayfairDisplay-Regular.ttf'
  );
  return fs.readFileSync(fontPath);
};
