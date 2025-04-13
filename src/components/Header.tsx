import * as React from 'react';
import { HeaderMenu } from './HeaderMenu';
import { HeaderNav } from './HeaderNav';
import { HeaderSearch } from './HeaderSearch';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo-texto.png';

export async function Header() {
  return (
    <header className="sticky top-0 z-50 bg-neutral/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container py-sm md:py-md flex gap-lg items-center justify-between">
        <Link href="/" className="transition-opacity hover:opacity-90 flex-shrink-0">
          <Image
            src={logo}
            alt="Lets Cozinha"
            height={60}
            quality={100}
            priority
            className="relative -left-2"
          />
        </Link>
        
        <div className="max-md:hidden flex-1 max-w-xs mx-auto">
          <HeaderSearch />
        </div>
        
        <div className="max-md:hidden">
          <HeaderNav />
        </div>
        
        <div className="md:hidden">
          <HeaderMenu />
        </div>
      </div>
    </header>
  );
}
