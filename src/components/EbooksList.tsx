import Image from 'next/image';
import Link from 'next/link';
import type { Ebook } from 'src/cms/ebooks';

type EbooksListProps = {
  ebooks: Ebook[];
};

export function EbooksList({ ebooks }: EbooksListProps) {
  if (ebooks.length === 0) {
    return (
      <div className="text-center py-xl">
        <h2 className="text-2xl font-heading mb-md">
          Nenhum e-book encontrado
        </h2>
        <p className="text-text-light">
          Não há e-books disponíveis no momento. Volte em breve para conferir
          nossos novos lançamentos!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
      {ebooks.map((ebook) => (
        <Link
          key={ebook.documentId}
          href={`/ebooks/${ebook.slug}`}
          className="group block bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
        >
          {ebook.imagem && (
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={ebook.imagem.url}
                alt={ebook.titulo}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          <div className="p-md">
            <h3 className="text-xl font-heading mb-sm line-clamp-2 group-hover:text-primary transition-colors">
              {ebook.titulo}
            </h3>

            {ebook.subtitulo && (
              <p className="text-text-light text-sm mb-sm line-clamp-1">
                {ebook.subtitulo}
              </p>
            )}

            <p className="text-text-light text-sm mb-md line-clamp-3 leading-relaxed">
              {ebook.meta_descricao}
            </p>

            <div className="flex items-center justify-between">
              {ebook.preco && (
                <span className="text-lg font-bold text-primary">
                  R$ {ebook.preco.toFixed(2).replace('.', ',')}
                </span>
              )}

              <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                Ver mais →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
