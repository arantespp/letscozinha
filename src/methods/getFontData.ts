export const getFontData = async (): Promise<ArrayBuffer> => {
  const response = await fetch(
    new URL('../assets/PlayfairDisplay-Regular.ttf', import.meta.url)
  );
  return response.arrayBuffer();
};
