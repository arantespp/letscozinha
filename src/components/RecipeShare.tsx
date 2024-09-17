'use client';

import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  XIcon,
} from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import type { Recipe } from '../cms/recipes';
import { getRecipeUrl } from 'src/methods/getRecipeUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';

const size = 42;

const windowHeight = 800;
const windowWidth = 800;

export const RecipeShare = ({ recipe }: { recipe: Recipe }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const shareUrl = getRecipeUrl(recipe);
  const title = recipe.nome;
  const image = recipe.imagens?.[0]?.url;
  const description = recipe.descricao;
  const commonProps = {
    url: shareUrl,
    windowHeight,
    windowWidth,
  };
  const iconProps = { round: true, size };

  return (
    <div>
      <h2>Compartilhe esta receita</h2>
      <p className="text-text-light">
        Compartilhe esta receita de <strong>{recipe.nome}</strong> com seus
        amigos e familiares para que eles possam experimentar também!
      </p>
      <div className="flex flex-wrap gap-sm mt-md items-center">
        <FacebookShareButton
          {...commonProps}
          hashtag="#letscozinha"
          aria-label="Compartilhar no Facebook"
        >
          <FacebookIcon {...iconProps} />
        </FacebookShareButton>
        <WhatsappShareButton
          {...commonProps}
          title={title}
          aria-label="Compartilhar no Whatsapp"
        >
          <WhatsappIcon {...iconProps} />
        </WhatsappShareButton>
        <TwitterShareButton
          {...commonProps}
          title={title}
          aria-label="Compartilhar no Twitter"
        >
          <XIcon {...iconProps} />
        </TwitterShareButton>
        {image && (
          <PinterestShareButton
            {...commonProps}
            media={image}
            description={description}
            aria-label="Compartilhar no Pinterest"
          >
            <PinterestIcon {...iconProps} />
          </PinterestShareButton>
        )}
        <CopyToClipboard
          text={shareUrl}
          onCopy={() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 5000);
          }}
        >
          <button
            style={{
              width: size,
              height: size,
            }}
            className="flex justify-center items-center bg-primary text-white rounded-full"
            aria-label="Copiar link"
          >
            <FontAwesomeIcon icon={faLink} />
          </button>
        </CopyToClipboard>
        {isCopied && <span className="text-text-light">Link copiado!</span>}
      </div>
    </div>
  );
};
