import * as React from 'react';
import { HeaderMenu } from './HeaderMenu';
import { HeaderNav } from './HeaderNav';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo-texto.png';

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
