import * as React from 'react';
import { Content } from 'src/components/Content';
import { EbookCard } from 'src/components/EbookCard';
import { EmailSubscription } from 'src/components/EmailSubscription';
import { getAllEbooks } from 'src/cms/ebooks';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import type { Metadata } from 'next';

const title = getPageTitle('E-books');
const description =
  'Transforme sua cozinha com nossos e-books exclusivos. Receitas especiais, técnicas profissionais e dicas culinárias para elevar suas habilidades na cozinha.';

export const metadata: Metadata = {
  title,
  description,
  keywords:
    'ebooks, livros de receitas, culinária digital, receitas especiais, técnicas culinárias, livros digitais',
  openGraph: {
    title,
    description,
    url: getUrl('/ebooks'),
    type: 'website',
    siteName: getWebsiteName(),
    images: ['https://www.letscozinha.com.br/opengraph-image.jpg'],
  },
};

export default async function EbooksPage() {
  const { allEbooks } = await getAllEbooks();

  return (
    <Content
      title="E-books Lets Cozinha"
      description="Transforme sua cozinha com nossos e-books exclusivos. Receitas especiais, técnicas profissionais e dicas culinárias para elevar suas habilidades na cozinha."
      breadcrumb={[
        { name: 'Home', href: '/' },
        { name: 'E-books', href: '/ebooks', current: true },
      ]}
    >
      <Content.Section variant="list">
        {allEbooks.length === 0 ? (
          <div className="text-center py-xl">
            <h2 className="text-2xl font-heading mb-md">
              Nenhum e-book encontrado
            </h2>
            <p className="text-text-light">
              Não há e-books disponíveis no momento. Volte em breve para
              conferir nossos novos lançamentos!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {allEbooks.map((ebook, index) => (
              <EbookCard
                key={ebook.documentId}
                ebook={ebook}
                priority={index < 3} // Priorize primeiros 3 e-books
                variant={index === 0 ? 'featured' : 'default'} // Primeiro e-book em destaque
                showPrice
              />
            ))}
          </div>
        )}
      </Content.Section>
    </Content>
  );
}
