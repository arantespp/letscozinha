'use client';

import * as React from 'react';
import { SearchIcon, SpinnerIcon, XMarkIcon } from 'src/icons/icons';
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/router';

export function Search() {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const initialSearch =
    typeof router.query.search === 'string' ? router.query.search : '';

  const [term, setTerm] = React.useState(initialSearch);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  const [debouncedTerm] = useDebounce(term, 800);
  const [debouncedIsSearching] = useDebounce(isSearching, 500);

  const handleSearch = React.useCallback(
    (value: string) => {
      setIsSearching(true);
      const query = { ...router.query };
      if (value) {
        query.search = value;
      } else {
        delete query.search;
      }
      delete query.page;
      router.replace({ pathname: router.pathname, query }, undefined, {
        scroll: false,
      });
      setTimeout(() => setIsSearching(false), 600);
    },
    [router]
  );

  const clearSearch = React.useCallback(() => {
    setTerm('');
    handleSearch('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [handleSearch]);

  const scrollToTop = React.useCallback(() => {
    window.scrollTo({ top: 140, behavior: 'smooth' });
  }, []);

  React.useEffect(() => {
    if (debouncedTerm !== (router.query.search || '')) {
      handleSearch(debouncedTerm);
    }
  }, [debouncedTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  const focusClasses = isFocused
    ? 'ring-2 ring-primary/30 border-primary'
    : 'border-gray-200 hover:border-primary/70';

  return (
    <div className="relative w-full">
      <label htmlFor="search" className="sr-only">
        Buscar receitas
      </label>
      <div
        className={`
        flex w-full items-center overflow-hidden
        bg-white rounded-full transition-all duration-300
        border ${focusClasses}
      `}
      >
        <div className="flex-shrink-0 pl-md pr-sm text-text-light">
          {debouncedIsSearching ? (
            <SpinnerIcon className="w-5 h-5 text-primary animate-spin" />
          ) : (
            <SearchIcon className="w-5 h-5" />
          )}
        </div>

        <input
          ref={inputRef}
          id="search"
          className="flex-1 py-sm px-xs text-base md:text-lg placeholder-text-light/70 outline-none bg-transparent"
          placeholder="Receitas, ingredientes..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            scrollToTop();
          }}
          onBlur={() => setIsFocused(false)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSearch(term);
            }
          }}
        />

        {term && (
          <button
            type="button"
            onClick={clearSearch}
            className="flex-shrink-0 p-sm rounded-full text-text-light hover:text-text-dark hover:bg-gray-100 transition-colors mx-xs"
            aria-label="Limpar busca"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
