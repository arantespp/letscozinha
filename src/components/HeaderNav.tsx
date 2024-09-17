'use client';

import Link from 'next/link';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { sendGAEvent } from '@next/third-parties/google';
import { INSTAGRAM_USERNAME } from 'src/constants';

const navs = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/receitas',
    label: 'Receitas',
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
    href: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
    label: <FontAwesomeIcon className="text-[1.25em]" icon={faInstagram} />,
    'aria-label': 'Instagram',
    onClick: () => {
      sendGAEvent('event', 'instagram_click', { value: '@lets_cozinha' });
    },
  },
];

export function HeaderNav({ isColumn }: { isColumn?: boolean }) {
  return (
    <nav
      className={`flex gap-sm md:gap-lg text-xl [&>a]:no-underline ${
        isColumn ? 'flex-col' : ''
      }`}
    >
      {navs.map((nav) => {
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
            >
              {nav.label}
            </a>
          );
        }

        return (
          <Link key={nav.href} href={nav.href}>
            {nav.label}
          </Link>
        );
      })}
    </nav>
  );
}
