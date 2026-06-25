import * as React from 'react';
import { useRouter } from 'next/router';

const isRecipePage = (pathname: string) => {
  return (
    pathname.startsWith('/receitas/') &&
    !pathname.includes('/todas-as-receitas')
  );
};

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const showSidebar = !isRecipePage(router.pathname || '');

  return (
    <div
      className={`my-lg md:my-xl ${!showSidebar ? 'max-w-5xl mx-auto' : ''}`}
    >
      <div
        className={`flex flex-col ${showSidebar ? 'md:flex-row gap-xl' : ''}`}
      >
        <div
          className={`flex-1 ${showSidebar ? 'max-w-full md:max-w-[68%]' : ''}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
