'use client';

import { Loading } from 'src/components/Loading';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

export function SearchLoading() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);

    const hasAlreadySearched = params.get('isSearching');

    if (!hasAlreadySearched) {
      params.append('isSearching', 'true');
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return () => {
      params.delete('isSearching');
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };
  }, [pathname, router, searchParams]);

  return <Loading />;
}
