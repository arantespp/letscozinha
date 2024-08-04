'use client';

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import type { Recipe } from '../cms/recipes';
import { BASE_URL } from '../constants';

const size = 42;

const windowHeight = 800;
const windowWidth = 800;

export const RecipeShare = ({ recipe }: { recipe: Recipe }) => {
  const shareUrl = `${BASE_URL}/receitas/${recipe.slug}`;
  const title = recipe.nome;
  const commonProps = {
    url: shareUrl,
    windowHeight,
    windowWidth,
  };
  return (
    <div>
      <h2>Compartilhe esta receita</h2>
      <div className="flex gap-sm">
        <FacebookShareButton {...commonProps} hashtag="#letscozinha">
          <FacebookIcon round size={size} />
        </FacebookShareButton>
        <WhatsappShareButton {...commonProps} title={title}>
          <WhatsappIcon round size={size} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};
