'use client';

import { INSTAGRAM_USERNAME } from 'src/constants';
import { InstagramIcon } from 'src/icons/lazyIcons';
import { sendGAEvent } from '@next/third-parties/google';
import Link from 'next/link';

const navs = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/receitas',
    label: 'Buscar Receitas',
  },
  {
    href: '/conheca-a-lets',
    label: 'Conheça a Lets',
  },
  {
    href: '/contato',
    label: 'Contato',
  },
  {
    href: '/feed.xml',
    label: 'Feed RSS',
    showInHeader: false,
  },
  {
    href: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
    label: <InstagramIcon className="text-[1.5em]" />,
    'aria-label': 'Instagram',
    onClick: () => {
      sendGAEvent('event', 'instagram_click');
    },
  },
];

export const PagesNav = ({
  linkClassName,
  className,
  isHeader,
}: {
  className?: string;
  linkClassName?: string;
  isHeader?: boolean;
}) => {
  return (
    <nav className={className}>
      {navs
        .filter((nav) => {
          if (isHeader) {
            return nav.showInHeader !== false;
          }

          return true;
        })
        .map((nav) => {
          const isExternal = nav.href.startsWith('http');

          if (isExternal) {
            return (
              <a
                key={nav.href}
                href={nav.href}
                aria-label={nav['aria-label']}
                target="_blank"
                rel="noopener noreferrer"
                onClick={nav.onClick}
                className={linkClassName}
              >
                {nav.label}
              </a>
            );
          }

          return (
            <Link key={nav.href} href={nav.href} className={linkClassName}>
              {nav.label}
            </Link>
          );
        })}
    </nav>
  );
};
