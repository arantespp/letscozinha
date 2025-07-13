import { Card } from './Card';
import { LinkButton } from './LinkButton';
import { getOptimizedImageProps } from 'src/methods/generateNextImageSizesString';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.png';
import type { Ebook } from 'src/cms/ebooks';

// Configurações de tamanho específicas para cards de e-books
const ebookCardSizes = [
  { maxWidth: '640px', size: '90vw' }, // Mobile (mais amplo)
  { maxWidth: '768px', size: '45vw' }, // Tablet (2 colunas)
  { maxWidth: '1024px', size: '30vw' }, // Desktop pequeno (3 colunas)
  { size: '25vw' }, // Desktop grande
];

type EbookCardProps = {
  /** E-book data to display */
  ebook: Ebook;
  /** Whether to prioritize image loading (for above-the-fold content) */
  priority?: boolean;
  /** Variant for different contexts */
  variant?: 'default' | 'featured' | 'minimal';
  /** Show price information */
  showPrice?: boolean;
};

/**
 * E-book Card Component with encapsulated Card presentation.
 *
 * This component follows the project's encapsulation pattern where the Card
 * wrapper is handled internally for consistent presentation across the app.
 *
 * Features:
 * - Responsive image optimization with custom sizes
 * - Touch-friendly CTAs (44px+ following Fitts's Law)
 * - Price display with formatting
 * - Multiple variants for different contexts
 * - Hover animations for enhanced UX
 * - Single responsibility: e-book preview and conversion
 * - Von Restorff Effect: Featured variant for visual distinction
 * - Aesthetic-Usability: Clean design with proper spacing and typography
 *
 * Variants:
 * - default: Standard e-book card for listings
 * - featured: Highlighted e-book with enhanced styling
 * - minimal: Compact version for sidebars/recommendations
 *
 * @example
 * ```tsx
 * // Basic usage
 * <EbookCard ebook={ebook} />
 *
 * // Featured e-book (highlighted)
 * <EbookCard ebook={ebook} variant="featured" priority />
 *
 * // Minimal for sidebar
 * <EbookCard ebook={ebook} variant="minimal" />
 *
 * // With price display
 * <EbookCard ebook={ebook} showPrice />
 * ```
 */
export function EbookCard({
  ebook,
  priority = false,
  variant = 'default',
  showPrice = true,
}: EbookCardProps) {
  const href = `/ebooks/${ebook.slug}`;
  const image = ebook.imagem;

  // Formatação de preço brasileira
  const formatPrice = (price: number | null) => {
    if (!price) return 'Gratuito';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  // Usando a nova função helper que retorna todas as props otimizadas
  const imageProps = getOptimizedImageProps(image, {
    defaultWidth: variant === 'minimal' ? 200 : 400,
    defaultHeight: variant === 'minimal' ? 280 : 560, // Proporção de livro (1.4:1)
    priority,
    quality: 85, // Qualidade alta para e-books
    customSizes:
      variant === 'minimal'
        ? [{ maxWidth: '768px', size: '120px' }, { size: '200px' }]
        : ebookCardSizes,
    useDefaultSizes: false,
  });

  // Configurações por variant
  const variantConfig = {
    default: {
      cardClass: 'hover:shadow-lg transition-all duration-300 h-full',
      imageClass: 'aspect-[5/7] relative overflow-hidden', // Proporção de livro
      titleClass: 'text-lg font-heading',
      showDescription: true,
    },
    featured: {
      cardClass:
        'hover:shadow-xl transition-all duration-300 h-full border-2 border-primary/20',
      imageClass: 'aspect-[5/7] relative overflow-hidden',
      titleClass: 'text-xl font-heading font-bold',
      showDescription: true,
    },
    minimal: {
      cardClass: 'hover:shadow-md transition-all duration-300 h-full',
      imageClass: 'aspect-[5/7] relative overflow-hidden',
      titleClass: 'text-base font-heading',
      showDescription: false,
    },
  };

  const config = variantConfig[variant];

  return (
    <Card
      variant={variant === 'featured' ? 'newsletter' : 'default'}
      className={config.cardClass}
    >
      <div className="flex flex-col gap-sm">
        <Link href={href} className="overflow-hidden rounded-lg block">
          <div className={config.imageClass}>
            <Image
              className="rounded-lg object-cover object-center transform hover:scale-105 transition-transform duration-500"
              src={image?.url || logo}
              alt={`Capa do e-book: ${ebook.titulo}`}
              {...imageProps}
            />
            {variant === 'featured' && (
              <div className="absolute top-2 right-2">
                <span className="bg-secondary text-white text-xs font-bold py-1 px-2 rounded-full shadow-md">
                  DESTAQUE
                </span>
              </div>
            )}
          </div>
        </Link>

        <div className="flex flex-col gap-xs flex-1 pt-1">
          <h3 className={`my-none line-clamp-2 ${config.titleClass}`}>
            <Link
              href={href}
              className="no-underline hover:text-primary transition-colors"
            >
              {ebook.titulo}
            </Link>
          </h3>

          {ebook.subtitulo && variant !== 'minimal' && (
            <p className="text-text-light text-sm line-clamp-1 italic">
              {ebook.subtitulo}
            </p>
          )}

          {config.showDescription && (
            <p className="text-text-light text-sm line-clamp-3 leading-snug mb-auto">
              {ebook.meta_descricao || ebook.descricao}
            </p>
          )}

          {showPrice && ebook.preco && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-primary font-bold text-lg">
                {formatPrice(ebook.preco)}
              </span>
            </div>
          )}

          <LinkButton
            href={href}
            variant="primary"
            className="mt-2 text-center font-medium transition-colors min-h-[44px]"
            aria-label={`Ver detalhes do e-book: ${ebook.titulo}`}
          >
            {variant === 'minimal' ? 'Ver E-book' : 'Ver Detalhes'}
          </LinkButton>
        </div>
      </div>
    </Card>
  );
}
