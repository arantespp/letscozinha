import * as React from 'react';
import { usePathname } from 'next/navigation';
import { LayoutAside } from './LayoutAside';

// Check if the current path is a recipe detail page
const isRecipePage = (pathname: string) => {
  return (
    pathname.startsWith('/receitas/') &&
    !pathname.includes('/todas-as-receitas')
  );
};

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Determine if sidebar should be shown
  const showSidebar = !isRecipePage(pathname || '');

  return (
    <div
      className={`container my-lg md:my-xl ${!showSidebar ? 'max-w-5xl mx-auto' : ''}`}
    >
      <div
        className={`flex flex-col ${showSidebar ? 'md:flex-row gap-xl' : ''}`}
      >
        <div
          className={`flex-1 ${showSidebar ? 'max-w-full md:max-w-[68%]' : ''}`}
        >
          {children}
        </div>

        {showSidebar && (
          <aside className="md:w-[30%] md:min-w-[250px] md:sticky md:top-4 self-start">
            <LayoutAside />
          </aside>
        )}
      </div>
    </div>
  );
}
