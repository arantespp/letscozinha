'use client';

import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share';
import { Card } from './Card';
import { CopyIcon } from 'src/icons/icons';
import { getRecipeUrl } from 'src/methods/getRecipeUrl';
import type { Recipe } from '../cms/recipes';

const size = 42;
const windowHeight = 800;
const windowWidth = 800;

/**
 * RecipeShare Component
 *
 * Componente para compartilhamento social de receitas com Card integrado.
 * Inclui botões para Facebook, WhatsApp, Twitter, Pinterest e cópia de link.
 *
 * Melhorias implementadas:
 * - Acessibilidade: ARIA labels específicos, focus states, role attributes
 * - Performance: useCallback para evitar re-renders desnecessários
 * - UX: Estados visuais claros, feedback de sucesso, keyboard navigation
 * - Design System: Cores consistentes, spacing padronizado
 *
 * @param recipe - Objeto da receita a ser compartilhada
 */
export const RecipeShare = ({ recipe }: { recipe: Recipe }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const shareUrl = getRecipeUrl(recipe);
  const title = recipe.nome || 'Receita';
  const image = recipe.imagens?.[0]?.url;
  const description = recipe.descricao;

  const commonProps = {
    url: shareUrl,
    windowHeight,
    windowWidth,
  };

  const iconProps = React.useMemo(
    () => ({
      round: true,
      size,
      bgStyle: { fill: 'var(--color-text-dark)' },
      iconFillColor: 'white',
    }),
    []
  );

  const handleCopySuccess = React.useCallback(() => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  }, []);

  return (
    <Card variant="subtle">
      <div className="flex flex-col gap-sm">
        {/* Header */}
        <div className="flex items-center gap-sm">
          <div
            className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl"
            aria-hidden="true"
          >
            📤
          </div>
          <h2 className="text-xl text-text-dark mb-0">Compartilhar Receita</h2>
        </div>

        {/* Description */}
        <p className="text-text-light text-sm leading-relaxed">
          Gostou da receita
          {recipe.nome && (
            <>
              {' '}
              de <strong className="text-text-dark">{recipe.nome}</strong>
            </>
          )}
          ? Compartilhe com amigos e familiares para que eles possam
          experimentar também!
        </p>

        {/* Social Share Buttons */}
        <div
          className="flex flex-wrap gap-xs sm:gap-md items-center justify-around sm:justify-start"
          role="group"
          aria-label="Opções de compartilhamento"
        >
          <FacebookShareButton
            {...commonProps}
            hashtag="#letscozinha"
            aria-label={`Compartilhar ${title} no Facebook`}
            className="transition-transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
          >
            <FacebookIcon {...iconProps} />
          </FacebookShareButton>

          <WhatsappShareButton
            {...commonProps}
            title={title}
            aria-label={`Compartilhar ${title} no WhatsApp`}
            className="transition-transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
          >
            <WhatsappIcon {...iconProps} />
          </WhatsappShareButton>

          <TwitterShareButton
            {...commonProps}
            title={title}
            aria-label={`Compartilhar ${title} no Twitter`}
            className="transition-transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
          >
            <XIcon {...iconProps} />
          </TwitterShareButton>

          {image && (
            <PinterestShareButton
              {...commonProps}
              media={image}
              description={description}
              aria-label={`Compartilhar ${title} no Pinterest`}
              className="transition-transform hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
            >
              <PinterestIcon {...iconProps} />
            </PinterestShareButton>
          )}

          <CopyToClipboard text={shareUrl} onCopy={handleCopySuccess}>
            <button
              type="button"
              style={{
                width: size,
                height: size,
              }}
              className={`flex justify-center items-center rounded-full cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isCopied
                  ? 'bg-accent text-white scale-110 focus:ring-accent'
                  : 'bg-primary text-white hover:scale-110 focus:ring-primary'
              }`}
              aria-label={`Copiar link da receita ${title}`}
              aria-pressed={isCopied}
            >
              <CopyIcon />
            </button>
          </CopyToClipboard>
        </div>

        {/* Success Message */}
        {isCopied && (
          <div
            className="bg-accent/10 text-accent p-xs rounded text-center text-sm mt-sm"
            role="status"
            aria-live="polite"
          >
            Link copiado para a área de transferência!
          </div>
        )}
      </div>
    </Card>
  );
};
