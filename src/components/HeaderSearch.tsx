'use client';

import * as React from 'react';
import { SearchIcon } from 'src/icons/icons';
import { useRouter } from 'next/navigation';

export function HeaderSearch() {
  const router = useRouter();
  const [term, setTerm] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      router.push(`/receitas?search=${encodeURIComponent(term.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`relative flex items-center w-full transition-all ${isFocused ? 'scale-105' : ''}`}
    >
      <input
        type="text"
        placeholder="Buscar receitas..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full py-sm px-md pr-10 rounded-full border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all"
      />
      <button
        type="submit"
        className="absolute right-0 w-10 h-full flex items-center justify-center text-text-light hover:text-primary transition-colors"
        aria-label="Buscar"
      >
        <SearchIcon className="w-4 h-4" />
      </button>
    </form>
  );
}
