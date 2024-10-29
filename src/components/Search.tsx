'use client';

import * as React from 'react';
import { SearchIcon, SpinnerIcon } from 'src/icons/icons';
import { useDebounce } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [term, setTerm] = React.useState(searchParams.get('search') || '');

  const [debouncedTerm] = useDebounce(term, 1000);

  const params = React.useMemo(() => {
    return new URLSearchParams(searchParams);
  }, [searchParams]);

  const isSearching = params.get('isSearching');

  const [debouncedIsSearching] = useDebounce(isSearching, 500);

  const handleSearch = React.useCallback(() => {
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [params, pathname, router, term]);

  React.useEffect(() => {
    handleSearch();
  }, [debouncedTerm, handleSearch]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Buscar receitas
      </label>
      <div className="flex w-full gap-sm">
        <input
          id="search"
          className="flex-1 px-sm py-sm border border-primary rounded placeholder-text-light"
          placeholder="Digite a receita..."
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
            }
          }}
        />
        <button
          className="flex items-center justify-center"
          onClick={() => {
            handleSearch();
          }}
        >
          {debouncedIsSearching ? <SpinnerIcon spin /> : <SearchIcon />}
        </button>
      </div>
    </div>
  );
}
