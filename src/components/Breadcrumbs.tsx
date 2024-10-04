import * as React from 'react';
import { JsonLd } from './JsonLd';
import { getUrl } from '../methods/getUrl';
import Link from 'next/link';
import type { BreadcrumbList, ListItem } from 'schema-dts';

export async function Breadcrumbs(props: {
  items: {
    name: string;
    href: string;
    current?: boolean;
  }[];
}) {
  /**
   * https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
   */
  const itemListElement = props.items.reduce<ListItem[]>((acc, item) => {
    if (item.href === '/') {
      return acc;
    }

    const listItem: ListItem = {
      '@type': 'ListItem',
      position: acc.length + 1,
      name: item.name,
      item: getUrl(item.href),
    };

    return [...acc, listItem];
  }, []);

  const breadcrumbList: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  return (
    <nav className="flex gap-xs mb-sm md:mb-lg leading-none">
      <JsonLd schema={breadcrumbList} />
      {props.items.map((item, index) => (
        <React.Fragment key={item.href}>
          {item.current ? (
            <span className="text-text-light">{item.name}</span>
          ) : (
            <Link href={item.href}>{item.name}</Link>
          )}
          {index < props.items.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
