'use client';

import { generateNextImageSizesString } from 'src/methods/generateNextImageSizesString';
import Image from 'next/image';
import { useState } from 'react';

type ImageProps = {
  url: string;
  alt: string;
};

export function RecipeImages({ images }: { images: ImageProps[] }) {
  const [activeImage, setActiveImage] = useState(0);

  if (images.length === 0) {
    return null;
  }

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
  })();

  return (
    <div className="flex flex-col gap-sm">
      {/* Main image display */}
      <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-sm">
        <Image
          className="object-cover object-center transition-transform duration-500 hover:scale-105"
          src={images[activeImage].url}
          alt={images[activeImage].alt}
          fill
          sizes={sizes}
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-xs overflow-x-auto pb-1 -mx-1 px-1">
          {images.map((image, index) => (
            <button
              key={image.url}
              onClick={() => setActiveImage(index)}
              className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden transition-all 
                ${activeImage === index ? 'ring-2 ring-primary scale-105' : 'opacity-70 hover:opacity-100'}`}
            >
              <Image
                src={image.url}
                alt={`Miniatura ${index + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
