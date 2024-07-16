'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

type Props = {
  pagination: {
    pageCount: number;
  };
};

export function Pagination({ pagination }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const setPage = (page: number) => {
    if (page < 1) {
      return;
    }

    if (page > pagination.pageCount) {
      return;
    }

    router.replace(createPageURL(page), { scroll: false });
  };

  if (pagination.pageCount <= 1) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => {
          setPage(currentPage - 1);
        }}
        className="disabled:opacity-50"
      >
        Anterior
      </button>
      <button
        disabled={currentPage === pagination.pageCount}
        onClick={() => {
          setPage(currentPage + 1);
        }}
        className="disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  );
}
