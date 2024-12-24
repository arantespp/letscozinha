export const generateNextImageSizesString = (
  sizes: Array<{
    maxWidth?: string;
    size: string;
  }>
) => {
  return sizes
    .map(({ maxWidth, size }) => {
      if (maxWidth) {
        return `(max-width: ${maxWidth}) ${size}`;
      }

      return size;
    })
    .join(', ');
};
