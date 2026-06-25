import * as React from 'react';
import { CategoriesList } from './CategoriesList';
import { EbookCard } from './EbookCard';
import { Card } from './Card';
import { EmailSubscription } from './EmailSubscription';
import type { AsideData } from 'src/methods/getAsideData';
import Image from 'next/image';
import Link from 'next/link';

interface LayoutAsideProps {
  data: AsideData;
  sections?: {
    featuredEbook?: boolean;
    whoIsLets?: boolean;
    categories?: boolean;
    newsletter?: {
      title: string;
      description: string;
      formLayout?: 'row' | 'column';
      textAlignment?: 'left' | 'center';
    };
  };
}

export function LayoutAside({ data, sections = {} }: LayoutAsideProps) {
  const config = {
    featuredEbook: true,
    whoIsLets: true,
    categories: true,
    newsletter: null,
    ...sections,
  };

  const { featuredEbook, letsProfile, categoriesWithCounts } = data;

  return (
    <aside className="w-full md:w-72 flex flex-col gap-md mt-xl md:mt-md">
      {config.newsletter && (
        <EmailSubscription
          title={config.newsletter.title}
          description={config.newsletter.description}
          formLayout={config.newsletter.formLayout}
          textAlignment={config.newsletter.textAlignment}
        />
      )}

      {config.featuredEbook && featuredEbook && (
        <EbookCard ebook={featuredEbook} variant="minimal" priority />
      )}

      {config.whoIsLets && letsProfile && (
        <Card className="h-full">
          <div className="flex flex-col gap-sm items-center text-center">
            <Link
              href="/conheca-a-lets"
              className="hover:opacity-80 transition-opacity"
            >
              <div className="size-image-sm relative">
                <Image
                  className="rounded-full object-cover"
                  src={
                    letsProfile.imagem.formats?.small?.url ||
                    letsProfile.imagem.url
                  }
                  alt="Foto da Lets"
                  fill
                  sizes="128px"
                />
              </div>
            </Link>
            <Link
              href="/conheca-a-lets"
              className="no-underline hover:text-primary transition-colors min-h-[44px] flex items-center justify-center"
            >
              <span className="font-heading text-xl">Conheça a Lets</span>
            </Link>
            <span className="italic text-center whitespace-pre-line leading-normal text-text-light">
              "{letsProfile.resumo}"
            </span>
          </div>
        </Card>
      )}

      {config.categories && categoriesWithCounts.length > 0 && (
        <Card className="h-full">
          <div className="flex flex-col gap-sm">
            <h3 className="font-heading text-lg text-center">Categorias</h3>
            <CategoriesList categories={categoriesWithCounts} />
          </div>
        </Card>
      )}
    </aside>
  );
}
