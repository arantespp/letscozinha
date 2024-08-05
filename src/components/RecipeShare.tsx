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
import type { Recipe } from '../cms/recipes';
import { BASE_URL } from '../constants';

const size = 42;

const windowHeight = 800;
const windowWidth = 800;

export const RecipeShare = ({ recipe }: { recipe: Recipe }) => {
  const shareUrl = `${BASE_URL}/receitas/${recipe.slug}`;
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
        Compartilhe esta receita de {recipe.nome} com seus amigos e familiares
        para que eles possam experimentar também!
      </p>
      <div className="flex gap-sm mt-md">
        <FacebookShareButton {...commonProps} hashtag="#letscozinha">
          <FacebookIcon {...iconProps} />
        </FacebookShareButton>
        <WhatsappShareButton {...commonProps} title={title}>
          <WhatsappIcon {...iconProps} />
        </WhatsappShareButton>
        <TwitterShareButton {...commonProps} title={title}>
          <XIcon {...iconProps} />
        </TwitterShareButton>
        {image && (
          <PinterestShareButton
            {...commonProps}
            media={image}
            description={description}
          >
            <PinterestIcon {...iconProps} />
          </PinterestShareButton>
        )}
      </div>
    </div>
  );
};
