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

  return (
    <div className={containerClassName}>
      {images.map((image) => (
        <div className="aspect-square relative max-w-image-lg" key={image.url}>
          <Image
            className="rounded object-cover object-center"
            src={image.url}
            alt={image.alt}
            fill
          />
        </div>
      ))}
    </div>
  );
}
