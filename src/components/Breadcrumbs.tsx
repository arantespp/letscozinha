import Link from 'next/link';
import * as React from 'react';

export async function Breadcrumbs(props: {
  items: {
    name: string;
    href: string;
    current?: boolean;
  }[];
}) {
  return (
    <nav className="flex gap-1">
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
