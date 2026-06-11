import {
  type Recipe,
  RECIPE_CARD_FIELDS,
  RECIPE_CARD_POPULATE,
} from './recipes';
import { CMS_URL, cmsFetch } from './config';
import qs from 'qs';
import type { CMSImage, CMSSingleDataResponse } from './types';
import { EBOOK_POPULATE, type Ebook, ebookQueryFilters } from './ebooks';

type LetsCozinhaCMSResponse = CMSSingleDataResponse<{
  titulo: string;
  descricao?: string;
  receitas_favoritas_titulo: string;
  receitas_favoritas: Recipe[];
  ebooks_favoritos_titulo: string;
  ebooks_favoritos: Ebook[];
}>;

export const getLetsCozinha = async () => {
  const query = qs.stringify({
    populate: {
      // Favoritas são renderizadas como cards na home: perfil "card" basta
      receitas_favoritas: {
        fields: RECIPE_CARD_FIELDS,
        populate: RECIPE_CARD_POPULATE,
      },
      ebooks_favoritos: {
        populate: EBOOK_POPULATE,
      },
    },
    filter: {
      ebooks_favoritos: {
        ...ebookQueryFilters,
      },
    },
  });

  const response = await cmsFetch<LetsCozinhaCMSResponse>(
    `${CMS_URL}/api/lets-cozinha?${query}`
  );

  return { letsCozinha: response.data };
};

type LetsCozinhaLetsCMSResponse = CMSSingleDataResponse<{
  nome: string;
  resumo: string;
  texto_completo: string;
  imagem: CMSImage;
}>;

export const getLetsCozinhaLets = async () => {
  const query = qs.stringify({
    populate: ['imagem'],
  });

  const response = await cmsFetch<LetsCozinhaLetsCMSResponse>(
    `${CMS_URL}/api/lets-cozinha-lets?${query}`
  );

  return { letsCozinhaLets: response.data };
};

type LetsCozinhaPoliticasCMSResponse = CMSSingleDataResponse<{
  politica_de_privacidade: string;
  termos_de_uso: string;
}>;

export const getLetsCozinhaPoliticas = async () => {
  const response = await cmsFetch<LetsCozinhaPoliticasCMSResponse>(
    `${CMS_URL}/api/lets-cozinha-politicas`
  );

  return { letsCozinhaPoliticas: response.data };
};
