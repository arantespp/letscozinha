import { type Recipe, RECIPES_POPULATE } from './recipes';
import { CMS_TOKEN, CMS_URL } from './config';
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
      receitas_favoritas: {
        populate: RECIPES_POPULATE,
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

  const response: LetsCozinhaCMSResponse = await fetch(
    `${CMS_URL}/api/lets-cozinha?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
      cache: 'force-cache',
    }
  ).then((res) => res.json());

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

  const response: LetsCozinhaLetsCMSResponse = await fetch(
    `${CMS_URL}/api/lets-cozinha-lets?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
      cache: 'force-cache',
    }
  ).then((res) => res.json());

  return { letsCozinhaLets: response.data };
};

type LetsCozinhaPoliticasCMSResponse = CMSSingleDataResponse<{
  politica_de_privacidade: string;
  termos_de_uso: string;
}>;

export const getLetsCozinhaPoliticas = async () => {
  const response: LetsCozinhaPoliticasCMSResponse = await fetch(
    `${CMS_URL}/api/lets-cozinha-politicas`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
      cache: 'force-cache',
    }
  ).then((res) => res.json());

  return { letsCozinhaPoliticas: response.data };
};
