import Image from 'next/image';
import logo from 'public/logo-texto.png';
import Link from 'next/link';
import * as React from 'react';
import { HeaderNav } from './HeaderNav';
import { HeaderMenu } from './HeaderMenu';

export async function Header() {
  return (
    <header className="container relative py-sm md:py-md flex gap-lg items-center justify-between">
      <Link href="/">
        <Image
          src={logo}
          alt="Lets Cozinha"
          height={60}
          quality={100}
          style={{
            position: 'relative',
            left: -10,
          }}
        />
      </Link>
      <div className="max-md:hidden">
        <HeaderNav />
      </div>
      <div className="md:hidden">
        <HeaderMenu />
      </div>
    </header>
  );
}
