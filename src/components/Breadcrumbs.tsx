import * as React from 'react';
import { getBreadcrumbSchema } from 'src/methods/getBreadcrumbSchema';

type BreadcrumbItem = {
  name: string;
  url?: string;
  href?: string;
  current?: boolean;
};

export function Breadcrumbs({
  breadcrumbs,
  items,
}: {
  breadcrumbs?: BreadcrumbItem[];
  items?: BreadcrumbItem[];
}) {
  // Usar items se breadcrumbs não for fornecido
  const breadcrumbItems = breadcrumbs || items || [];

  // Normalizar os itens para garantir que todos tenham a propriedade 'url'
  const normalizedItems = breadcrumbItems.map((item) => ({
    name: item.name,
    url: item.url || item.href || '#',
  }));

  const breadcrumbSchema = getBreadcrumbSchema(normalizedItems);

  return (
    <nav aria-label="breadcrumb" className="py-2">
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <ol className="flex flex-wrap items-center text-sm text-text-light">
        {normalizedItems.map((breadcrumb, index) => (
          <li
            key={index}
            className={`flex items-center ${
              index < normalizedItems.length - 1
                ? 'after:content-["/"] after:mx-2 after:text-text-muted'
                : ''
            }`}
          >
            <a
              href={breadcrumb.url}
              className={`hover:text-text-strong ${
                index === normalizedItems.length - 1
                  ? 'text-text-strong font-medium'
                  : ''
              }`}
            >
              {breadcrumb.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
