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
import { CopyIcon } from 'src/icons/icons';
import { getRecipeUrl } from 'src/methods/getRecipeUrl';
import type { Recipe } from '../cms/recipes';

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
  
  const iconProps = { 
    round: true, 
    size,
    bgStyle: { fill: 'var(--color-text-dark)' },
    iconFillColor: 'white'
  };

  return (
    <div className="flex flex-col gap-sm">
      <div className="flex items-center gap-sm">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
          📤
        </div>
        <h2 className="text-xl font-bold mb-0">Compartilhar Receita</h2>
      </div>
      
      <p className="text-text-light text-sm leading-relaxed">
        Gostou da receita de <strong>{recipe.nome}</strong>? Compartilhe com amigos e familiares para que eles possam experimentar também!
      </p>
      
      <div className="flex flex-wrap gap-md mt-md items-center justify-center sm:justify-start">
        <FacebookShareButton
          {...commonProps}
          hashtag="#letscozinha"
          aria-label="Compartilhar no Facebook"
          className="transition-transform hover:scale-110"
        >
          <FacebookIcon {...iconProps} />
        </FacebookShareButton>
        
        <WhatsappShareButton
          {...commonProps}
          title={title}
          aria-label="Compartilhar no Whatsapp"
          className="transition-transform hover:scale-110"
        >
          <WhatsappIcon {...iconProps} />
        </WhatsappShareButton>
        
        <TwitterShareButton
          {...commonProps}
          title={title}
          aria-label="Compartilhar no Twitter"
          className="transition-transform hover:scale-110"
        >
          <XIcon {...iconProps} />
        </TwitterShareButton>
        
        {image && (
          <PinterestShareButton
            {...commonProps}
            media={image}
            description={description}
            aria-label="Compartilhar no Pinterest"
            className="transition-transform hover:scale-110"
          >
            <PinterestIcon {...iconProps} />
          </PinterestShareButton>
        )}
        
        <CopyToClipboard
          text={shareUrl}
          onCopy={() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
          }}
        >
          <button
            style={{
              width: size,
              height: size,
            }}
            className={`flex justify-center items-center rounded-full cursor-pointer transition-all ${
              isCopied 
                ? 'bg-accent text-white scale-110' 
                : 'bg-primary text-white hover:scale-110'
            }`}
            aria-label="Copiar link"
          >
            <CopyIcon />
          </button>
        </CopyToClipboard>
      </div>
      
      {isCopied && (
        <div className="bg-accent/10 text-accent p-xs rounded text-center text-sm mt-sm">
          Link copiado para a área de transferência!
        </div>
      )}
    </div>
  );
};
