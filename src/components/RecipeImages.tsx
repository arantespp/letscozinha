import { generateNextImageSizesString } from 'src/methods/generateNextImageSizesString';
import Image from 'next/image';

type ImageProps = {
  url: string;
  alt: string;
};

export function RecipeImages({ images }: { images: ImageProps[] }) {
  if (images.length === 0) {
    return null;
  }

  const containerClassName = (() => {
    if (images.length === 1) {
      return '';
    }

    if (images.length === 2) {
      return 'flex flex-col md:grid grid-cols-2 gap-sm';
    }

    return 'flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-sm';
  })();

  const sizes = (() => {
    const commonFirstSizes = [
      {
        maxWidth: '400px',
        size: '350px',
      },
      {
        maxWidth: '480px',
        size: '430px',
      },
      {
        maxWidth: '640px',
        size: '590px',
      },
      {
        maxWidth: '768px',
        size: '670px',
      },
    ];

    if (images.length === 1) {
      return generateNextImageSizesString([
        ...commonFirstSizes,
        {
          maxWidth: '1024px',
          size: '623px',
        },
        {
          size: '672px',
        },
      ]);
    }

    if (images.length === 2) {
      return generateNextImageSizesString([
        ...commonFirstSizes,
        {
          maxWidth: '1024px',
          size: '300px',
        },
        {
          size: '430px',
        },
      ]);
    }

    return generateNextImageSizesString([
      ...commonFirstSizes,
      {
        maxWidth: '1024px',
        size: '300px',
      },
      {
        size: '280px',
      },
    ]);
  })();

  return (
    <div className={containerClassName}>
      {images.map((image) => (
        <div className="aspect-square relative max-w-image-lg" key={image.url}>
          <Image
            className="rounded object-cover object-center"
            src={image.url}
            alt={image.alt}
            fill
            sizes={sizes}
            priority
          />
        </div>
      ))}
    </div>
  );
}
