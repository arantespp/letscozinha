'use client';

import * as React from 'react';
import { Loading } from 'src/components/Loading';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
      if (hasAlreadySearched) {
        params.delete('isSearching');
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    };
  }, [pathname, router, searchParams]);

  return <Loading />;
}
