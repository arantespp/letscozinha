import type { ImageAttributes } from 'src/cms/types';

/**
 * Configuração para definir tamanhos responsivos de imagens
 */
type SizeConfig = {
  /** Breakpoint máximo para esta configuração, ex: '768px' */
  maxWidth?: string;
  /** Tamanho da imagem neste breakpoint, ex: '100vw' ou '400px' */
  size: string;
  /** Altura opcional para cálculos de proporção */
  height?: number;
  /** Largura opcional para cálculos de proporção */
  width?: number;
};

/**
 * Configurações comuns para dispositivos modernos (2025)
 */
export const COMMON_RESPONSIVE_SIZES: SizeConfig[] = [
  { maxWidth: '640px', size: '100vw' }, // Mobile
  { maxWidth: '768px', size: '50vw' }, // Tablet
  { maxWidth: '1024px', size: '33vw' }, // Small Desktop
  { maxWidth: '1280px', size: '25vw' }, // Desktop
  { size: '20vw' }, // Large Desktop
];

/**
 * Gera uma string para o atributo `sizes` do componente Image do Next.js
 * Ajuda o navegador a escolher a imagem mais adequada para o viewport atual
 *
 * @param sizes Array de configurações de tamanho
 * @param defaultSizes Se true, usa as configurações comuns modernas como base
 * @returns String formatada para o atributo sizes
 */
export const generateNextImageSizesString = (
  sizes: Array<SizeConfig>,
  defaultSizes: boolean = false
): string => {
  const sizesToUse = defaultSizes
    ? [...COMMON_RESPONSIVE_SIZES, ...sizes]
    : sizes;

  return sizesToUse
    .map(({ maxWidth, size }) => {
      if (maxWidth) {
        return `(max-width: ${maxWidth}) ${size}`;
      }
      return size;
    })
    .join(', ');
};

/**
 * Gera um tamanho de imagem otimizado baseado nas dimensões reais da imagem
 * Isso ajuda o Next.js a otimizar melhor o carregamento de imagens
 *
 * @param image Atributos da imagem com informações de dimensão
 * @param defaultWidth Largura padrão se as dimensões não estiverem disponíveis
 * @param defaultHeight Altura padrão se as dimensões não estiverem disponíveis
 * @returns Objeto com largura e altura otimizadas
 */
export const generateOptimizedImageSizes = (
  image: ImageAttributes | undefined,
  defaultWidth = 400,
  defaultHeight = 400
): { width: number; height: number } => {
  if (!image || !image.width || !image.height) {
    return { width: defaultWidth, height: defaultHeight };
  }

  // Mantém a proporção original da imagem
  const aspectRatio = image.width / image.height;

  // Se a imagem for maior que o tamanho padrão, usamos o tamanho padrão
  // mantendo a proporção original
  if (image.width > defaultWidth) {
    return {
      width: defaultWidth,
      height: Math.round(defaultWidth / aspectRatio),
    };
  }

  // Caso contrário, usamos o tamanho original
  return {
    width: image.width,
    height: image.height,
  };
};

/**
 * Helper para gerar configurações de imagem responsiva completas para o Next.js Image
 *
 * @param image Atributos da imagem
 * @param options Opções de configuração
 * @returns Objeto com todos os props necessários para otimizar a imagem
 */
export const getOptimizedImageProps = (
  image: ImageAttributes | undefined,
  options: {
    defaultWidth?: number;
    defaultHeight?: number;
    priority?: boolean;
    quality?: number;
    useDefaultSizes?: boolean;
    customSizes?: SizeConfig[];
  } = {}
) => {
  const {
    defaultWidth = 400,
    defaultHeight = 400,
    priority = false,
    quality = 75,
    useDefaultSizes = true,
    customSizes = [],
  } = options;

  const { width, height } = generateOptimizedImageSizes(
    image,
    defaultWidth,
    defaultHeight
  );

  return {
    width,
    height,
    quality,
    priority,
    sizes: generateNextImageSizesString(customSizes, useDefaultSizes),
    style: { objectFit: 'cover', width: '100%', height: '100%' } as const,
  };
};
