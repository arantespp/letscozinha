'use client';

import { getOptimizedImageProps } from 'src/methods/generateNextImageSizesString';
import Image from 'next/image';
import { useState } from 'react';
import { ImageAttributes } from 'src/cms/types';
import { getImageSchema } from 'src/methods/getImageSchema';

type ImageProps = ImageAttributes;

// Configurações de tamanho específicas para imagens de receitas
const mainImageSizes = [
  { maxWidth: '640px', size: '95vw' }, // Mobile
  { maxWidth: '768px', size: '90vw' }, // Tablet pequeno
  { maxWidth: '1024px', size: '60vw' }, // Tablet grande
  { size: '672px' }, // Desktop (tamanho fixo)
];

export function RecipeImages({ images }: { images: ImageProps[] }) {
  const [activeImage, setActiveImage] = useState(0);

  if (images.length === 0) {
    return null;
  }

  // Utilizando a nova função para obter props otimizadas para a imagem principal
  const activeImageData = images[activeImage];
  const mainImageProps = getOptimizedImageProps(activeImageData, {
    defaultWidth: 672,
    defaultHeight: 504, // proporção 4:3
    priority: true,
    quality: 85,
    customSizes: mainImageSizes,
    useDefaultSizes: false,
  });

  // Gerando dados estruturados para SEO
  const imageSchema = getImageSchema(activeImageData);

  return (
    <div className="flex flex-col gap-sm">
      {/* Dados estruturados para SEO */}
      <script type="application/ld+json">{JSON.stringify(imageSchema)}</script>

      {/* Main image display */}
      <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-sm">
        <Image
          className="object-cover object-center transition-transform duration-500 hover:scale-105"
          src={activeImageData.url}
          alt={activeImageData.alt || 'Imagem da receita'}
          {...mainImageProps}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-xs overflow-x-auto pb-1 -mx-1 px-1">
          {images.map((image, index) => {
            // Configurações para thumbnails
            const thumbProps = getOptimizedImageProps(image, {
              defaultWidth: 64,
              defaultHeight: 64,
              quality: 70,
              customSizes: [{ size: '64px' }], // Tamanho fixo para thumbnails
              useDefaultSizes: false,
            });

            return (
              <button
                key={image.url}
                onClick={() => setActiveImage(index)}
                className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden transition-all 
                  ${activeImage === index ? 'ring-2 ring-primary scale-105' : 'opacity-70 hover:opacity-100'}`}
              >
                <Image
                  src={image.url}
                  alt={`Miniatura ${index + 1}`}
                  {...thumbProps}
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
