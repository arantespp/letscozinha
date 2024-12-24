export const generateNextImageSizesString = (
  sizes: Array<[string, string?]>
) => {
  return sizes
    .map((s) => {
      if (s[1]) {
        return `(max-width: ${s[0]}) ${s[1]}`;
      }

      return s[0];
    })
    .join(', ');
};
