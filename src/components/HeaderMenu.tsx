'use client';

import * as React from 'react';
import { BarsIcon } from 'src/icons/icons';
import { HeaderNav } from './HeaderNav';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo-texto.png';

export function HeaderMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  // Handle body scroll lock when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close menu when escape key is pressed
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu toggle button */}
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center text-text-dark"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <BarsIcon className="text-2xl" />
      </button>

      {/* Mobile menu with very high z-index */}
      {isOpen && (
        <div
          className="fixed inset-0 flex z-[9999]"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: '100%',
            width: '100%',
          }}
          onClick={() => setIsOpen(false)}
        >
          {/* Dark overlay */}
          <div
            className="fixed inset-0 bg-black/70"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              height: '100%',
            }}
          />

          {/* Menu content */}
          <div
            className="relative ml-auto w-[280px] h-full bg-white shadow-lg flex flex-col"
            style={{
              backgroundColor: '#ffffff',
              height: '100vh',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Menu header */}
            <div className="p-4 border-b flex items-center justify-between bg-white">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Image
                  src={logo}
                  alt="Lets Cozinha"
                  height={40}
                  quality={100}
                  priority
                />
              </Link>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-text-dark rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4 bg-white">
              <HeaderNav isColumn={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
