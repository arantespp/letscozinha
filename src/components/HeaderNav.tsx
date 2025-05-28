import { PagesNav } from './PagesNav';

export function HeaderNav(props: { isColumn?: boolean; itemsStart?: boolean }) {
  return (
    <PagesNav
      isHeader
      className={`flex items-center gap-sm md:gap-md text-lg whitespace-nowrap font-medium [&>a]:no-underline ${
        props.isColumn ? 'flex-col' : ''
      } ${props.itemsStart ? 'items-start' : 'items-center'}`}
      linkClassName="relative px-1 py-2 flex items-center transition-colors hover:text-primary after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
    />
  );
}
