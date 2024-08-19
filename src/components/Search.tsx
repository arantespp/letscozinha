'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [term, setTerm] = React.useState(searchParams.get('search') || '');

  const [debouncedTerm] = useDebounce(term, 1000);

  const handleSearch = React.useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams, term]);

  React.useEffect(() => {
    handleSearch();
  }, [debouncedTerm, handleSearch]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="flex w-full gap-sm">
        <input
          id="search"
          className="flex-1 px-sm py-xs border border-primary rounded placeholder-text-light"
          placeholder="Procurar receita"
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
          className="flex items-center justify-center bg-primary text-white rounded w-[36px] aspect-square"
          onClick={() => {
            handleSearch();
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}
