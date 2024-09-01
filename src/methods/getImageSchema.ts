import type { ImageObject } from 'schema-dts';
import type { ImageAttributes } from 'src/cms/types';

export const getImageSchema = (image: ImageAttributes): ImageObject => {
  return {
    '@type': 'ImageObject',
    url: image.url,
    width: {
      '@type': 'QuantitativeValue',
      value: image.width,
    },
    height: {
      '@type': 'QuantitativeValue',
      value: image.height,
    },
  };
};
