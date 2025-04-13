'use client';

import * as React from 'react';
import { SearchIcon, SpinnerIcon, XMarkIcon } from 'src/icons/icons';
import { useDebounce } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [term, setTerm] = React.useState(searchParams.get('search') || '');
  const [isFocused, setIsFocused] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  const [debouncedTerm] = useDebounce(term, 800);
  const [debouncedIsSearching] = useDebounce(isSearching, 500);

  const params = React.useMemo(() => {
    return new URLSearchParams(searchParams);
  }, [searchParams]);

  const handleSearch = React.useCallback(() => {
    setIsSearching(true);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setTimeout(() => setIsSearching(false), 600);
  }, [params, pathname, router, term]);

  const clearSearch = React.useCallback(() => {
    setTerm('');
    params.delete('search');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [params, pathname, router]);

  React.useEffect(() => {
    if (debouncedTerm !== searchParams.get('search')) {
      handleSearch();
    }
  }, [debouncedTerm, handleSearch, searchParams]);

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
          className="flex-1 py-md px-xs text-base md:text-lg placeholder-text-light/70 outline-none bg-transparent"
          placeholder="Digite um ingrediente, nome de receita ou técnica..."
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
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

      {term && (
        <div className="text-xs text-text-light mt-xs ml-sm">
          <span className="opacity-75">Pressione Enter para buscar</span>
        </div>
      )}
    </div>
  );
}
