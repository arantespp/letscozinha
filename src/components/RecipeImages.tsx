'use client';

import { getOptimizedImageProps } from 'src/methods/generateNextImageSizesString';
import Image from 'next/image';
import { useState, useCallback, useEffect, useRef } from 'react';
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
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Função para fazer scroll até a thumbnail ativa
  const scrollToActiveThumbnail = useCallback(() => {
    if (
      !thumbnailsContainerRef.current ||
      !thumbnailRefs.current[activeImage]
    ) {
      return;
    }

    const container = thumbnailsContainerRef.current;
    const activeThumbnail = thumbnailRefs.current[activeImage];

    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeImage]);

  // Executa o scroll sempre que a imagem ativa mudar
  useEffect(() => {
    scrollToActiveThumbnail();
  }, [scrollToActiveThumbnail]);

  // Handlers para touch/swipe na imagem principal
  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
      if (images.length <= 1) return;

      const touch = event.touches[0];
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
    },
    [images.length]
  );

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (images.length <= 1) return;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - touchStartX.current;
      const deltaY = touch.clientY - touchStartY.current;

      // Verifica se o movimento é mais horizontal que vertical (swipe horizontal)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          // Swipe para a direita - imagem anterior
          setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        } else {
          // Swipe para a esquerda - próxima imagem
          setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }
      }
    },
    [images.length]
  );

  // Navegação por clique na imagem principal (UX Law: Mobile-first design)
  const handleImageClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (images.length <= 1) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const imageWidth = rect.width;

      // Zona esquerda (40%) = imagem anterior, zona direita (40%) = próxima imagem
      // Zona central (20%) = sem ação (evita cliques acidentais)
      if (clickX < imageWidth * 0.4) {
        setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (clickX > imageWidth * 0.6) {
        setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    },
    [images.length]
  );

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

      {/* Indicador de posição (Hick's Law - clareza de contexto) */}
      {images.length > 1 && (
        <div className="flex justify-between items-center mb-xs">
          <span className="text-sm text-gray-500" aria-live="polite">
            {activeImage + 1} de {images.length}
          </span>
          <div className="text-xs text-gray-400">
            Deslize ou toque nas laterais para navegar
          </div>
        </div>
      )}

      {/* Main image display */}
      <div
        className={`aspect-[4/3] relative rounded-lg overflow-hidden shadow-sm group ${
          images.length > 1 ? 'cursor-pointer' : ''
        }`}
        role="img"
        aria-label={`Imagem ${activeImage + 1} de ${images.length}: ${activeImageData.alt || 'Imagem da receita'}`}
        onClick={handleImageClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          className="object-cover object-center transition-all duration-300 group-hover:scale-[1.02]"
          src={activeImageData.url}
          alt={activeImageData.alt || `Imagem ${activeImage + 1} da receita`}
          {...mainImageProps}
        />

        {/* Zonas de navegação invisíveis para múltiplas imagens */}
        {images.length > 1 && (
          <>
            {/* Zona esquerda - imagem anterior */}
            <div
              className="absolute left-0 top-0 w-2/5 h-full z-10"
              aria-label="Imagem anterior"
            />

            {/* Zona direita - próxima imagem */}
            <div
              className="absolute right-0 top-0 w-2/5 h-full z-10"
              aria-label="Próxima imagem"
            />

            {/* Indicadores visuais sutis nas zonas (apenas em hover no desktop) */}
            <div className="absolute left-0 top-0 w-2/5 h-full bg-gradient-to-r from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block pointer-events-none" />
            <div className="absolute right-0 top-0 w-2/5 h-full bg-gradient-to-l from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block pointer-events-none" />
          </>
        )}
      </div>

      {/* Thumbnails - Implementação Limpa e Simples */}
      {images.length > 1 && (
        <div
          ref={thumbnailsContainerRef}
          className="flex gap-4 overflow-x-auto py-3 px-2"
        >
          {images.map((image, index) => {
            const thumbProps = getOptimizedImageProps(image, {
              defaultWidth: 80,
              defaultHeight: 80,
              quality: 70,
              customSizes: [{ size: '80px' }],
              useDefaultSizes: false,
            });

            const isActive = activeImage === index;

            return (
              <div
                key={image.url}
                ref={(el) => {
                  thumbnailRefs.current[index] = el;
                }}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 mb-xs ${
                  isActive
                    ? 'ring-4 ring-primary ring-offset-2 transform scale-105'
                    : 'opacity-60 hover:opacity-100 hover:transform hover:scale-105'
                }`}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={image.url}
                  alt={`Imagem ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
