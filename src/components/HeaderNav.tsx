'use client';

import Link from 'next/link';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { sendGAEvent } from '@next/third-parties/google';

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
    href: 'https://www.instagram.com/lets_cozinha/',
    label: <FontAwesomeIcon className="text-[1.25em]" icon={faInstagram} />,
    onClick: () => {
      sendGAEvent('event', 'instagram_click', { value: '@lets_cozinha' });
    },
  },
];

export function HeaderNav({ isColumn }: { isColumn?: boolean }) {
  return (
    <nav
      className={`flex gap-sm md:gap-lg text-2xl [&>a]:no-underline ${
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
