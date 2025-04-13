'use client';

import * as React from 'react';
import { HeaderMenu } from './HeaderMenu';
import { HeaderNav } from './HeaderNav';
import { HeaderSearch } from './HeaderSearch';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo-texto.png';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary/5 via-neutral/95 to-primary/5 backdrop-blur-sm border-b border-primary/10 shadow-sm">
      <div className="container py-sm md:py-sm flex items-center justify-between">
        <Link
          href="/"
          className="transition-opacity hover:opacity-90 flex-shrink-0"
        >
          <Image
            src={logo}
            alt="Lets Cozinha"
            height={60}
            quality={100}
            priority
            className="relative -left-2"
          />
        </Link>

        <div className="max-md:hidden flex items-center space-x-4">
          <HeaderNav />
          <HeaderSearch />
        </div>

        <div className="md:hidden">
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
}
