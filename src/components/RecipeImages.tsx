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

  /**
   * sm	 640px
   * md	 768px
   * lg	 1024px
   * xl	 1280px
   * 2xl 1536px
   */
  const sizes = (() => {
    if (images.length === 1) {
      return '(max-width: 768px) 100vw, 42rem';
    }

    if (images.length === 2) {
      return '(max-width: 640px) 100vw, (max-width: 768px) 350px, 500px';
    }

    return '(max-width: 640px) 100vw, (max-width: 768px) 350px, 300px';
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
