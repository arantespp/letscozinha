import { getUrl } from './getUrl';

export const getFontData = async (): Promise<Buffer | ArrayBuffer> => {
  const fontUrl = getUrl('/assets/PlayfairDisplay-Regular.ttf');
  const response = await fetch(fontUrl);
  const fontDataBuffer = await response.arrayBuffer();
  return fontDataBuffer;
};
