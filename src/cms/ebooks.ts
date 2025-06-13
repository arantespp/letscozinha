import { API_MAX_LIMIT, CMS_TOKEN, CMS_URL } from './config';

import { unstable_cache } from 'next/cache';
import qs from 'qs';
import type { CMSDataArrayResponse, CMSImage, CMSData } from './types';

export const EBOOK_POPULATE = ['imagem', 'pdf'];

export type EbookAttributes = {
  titulo: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  documentId: string;
  publishedAt: string;
  versao: number;
  subtitulo: string;
  mensagem_final: string;
  mensagem_final_despedida: string | null;
  descricao: string;
  meta_descricao: string;
  keywords: string;
  pagina_website: string;
  imagem: CMSImage;
  pdf: {
    url: string;
  };
  checkout_url: string | null;
  preco: number | null;
};

export type CMSEbooksResponse = CMSDataArrayResponse<EbookAttributes>;

export type Ebook = CMSData<EbookAttributes>;

export const ebookQueryFilters = {
  imagem: {
    $notNull: true,
  },
  pdf: {
    $notNull: true,
  },
  checkout_url: {
    $notNull: true,
  },
  pagina_website: {
    $notNull: true,
  },
  descricao: {
    $notNull: true,
  },
};

const getAllEbooksWithoutCache = async () => {
  let allEbooks: Ebook[] = [];
  let page = 1;
  let pageCount = 1;

  const fetchPage = async () => {
    const query = qs.stringify({
      pagination: {
        page,
        pageSize: API_MAX_LIMIT,
      },
      populate: EBOOK_POPULATE,
      filters: {
        ...ebookQueryFilters,
      },
    });

    const response = await fetch(
      `${CMS_URL}/api/lets-cozinha-ebooks?${query}`,
      {
        headers: {
          Authorization: `Bearer ${CMS_TOKEN}`,
        },
        cache: 'force-cache',
      }
    ).then(
      (res) => res.json() as Promise<CMSDataArrayResponse<EbookAttributes>>
    );

    return response;
  };

  do {
    const response = await fetchPage();
    allEbooks.push(...response.data);
    pageCount = response.meta?.pagination.pageCount || 1;
    page++;
  } while (page <= pageCount);

  return { allEbooks };
};

export const getAllEbooks = unstable_cache(
  getAllEbooksWithoutCache,
  ['getAllEbooks'],
  {
    revalidate: false,
  }
);

export const getEbook = async (args: { slug?: string }) => {
  const { allEbooks } = await getAllEbooks();

  const ebook = allEbooks.find((ebook) => ebook.slug === args.slug);

  return ebook || null;
};
