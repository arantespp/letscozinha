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
    <nav aria-label="breadcrumb">
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <ol className="breadcrumb">
        {normalizedItems.map((breadcrumb, index) => (
          <li key={index} className="breadcrumb-item">
            <a href={breadcrumb.url}>{breadcrumb.name}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
