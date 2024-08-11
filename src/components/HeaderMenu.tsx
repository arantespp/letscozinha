'use client';

import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { HeaderNav } from './HeaderNav';
import Image from 'next/image';
import logo from 'public/logo-texto.png';

function Drawer({ isOpen, close }: { isOpen: boolean; close: () => void }) {
  const className = [
    'fixed top-0 z-50 w-72 h-full bg-white shadow-md p-lg',
    'transition-all duration-300 ease-in-out',
    isOpen ? 'left-0' : '-left-full',
  ].join(' ');

  return (
    <div className={className} onClick={close}>
      <Image
        src={logo}
        alt="Lets Cozinha"
        height={60}
        quality={100}
        style={{
          position: 'relative',
          left: -10,
        }}
        className="mb-lg"
      />
      <HeaderNav isColumn={true} />
    </div>
  );
}

export function HeaderMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  function onMenuClick() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <FontAwesomeIcon
        onClick={onMenuClick}
        className="text-2xl cursor-pointer"
        icon={faBars}
      />
      <Drawer
        isOpen={isOpen}
        close={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
}
