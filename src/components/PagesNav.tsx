'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { INSTAGRAM_USERNAME } from 'src/constants';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { sendGAEvent } from '@next/third-parties/google';
import Link from 'next/link';

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
    label: <FontAwesomeIcon className="text-[1.5em]" icon={faInstagram} />,
    'aria-label': 'Instagram',
    onClick: () => {
      sendGAEvent('event', 'instagram_click');
    },
  },
];

export const PagesNav = ({
  linkClassName,
  className,
}: {
  className?: string;
  linkClassName?: string;
}) => {
  return (
    <nav className={className}>
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
