import { generateNextImageSizesString } from 'src/methods/generateNextImageSizesString';
import Image from 'next/image';

type ImageProps = {
  url: string;
  alt: string;
};

export function RecipeImages({ images: imagesa }: { images: ImageProps[] }) {
  const images = [imagesa[0]];

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
    if (images.length === 1) {
      return generateNextImageSizesString([
        ['400px', '350px'],
        ['480px', '430px'],
        ['640px', '590px'],
        ['768px', '670px'],
        ['1024px', '623px'],
        ['672px'],
      ]);
    }

    if (images.length === 2) {
      return generateNextImageSizesString([
        ['400px', '350px'],
        ['480px', '430px'],
        ['640px', '590px'],
        ['768px', '670px'],
        ['1024px', '300px'],
        ['430px'],
      ]);
    }

    return generateNextImageSizesString([
      ['400px', '350px'],
      ['480px', '430px'],
      ['640px', '590px'],
      ['768px', '670px'],
      ['1024px', '300px'],
      ['280px'],
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
