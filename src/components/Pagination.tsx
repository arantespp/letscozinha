'use client';

import * as React from 'react';
import { useRouter } from 'next/router';

type Props = {
  pagination: {
    pageCount: number;
  };
};

export function Pagination({ pagination }: Props) {
  const router = useRouter();

  const currentPage = Number(router.query.page) || 1;

  const setPage = (page: number) => {
    if (page < 1 || page > pagination.pageCount) return;

    const query = { ...router.query, page: page.toString() };
    router.replace({ pathname: router.pathname, query }, undefined, {
      scroll: false,
    });
  };

  if (pagination.pageCount <= 1) {
    return null;
  }

  return (
    <div className="flex gap-sm">
      <button
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
        className="disabled:opacity-50"
      >
        Anterior
      </button>
      <button
        disabled={currentPage === pagination.pageCount}
        onClick={() => setPage(currentPage + 1)}
        className="disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  );
}
