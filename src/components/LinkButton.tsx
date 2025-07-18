import Link from 'next/link';

export function LinkButton({
  href,
  children,
  className,
  variant = 'primary',
  target,
  rel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  target?: string;
  rel?: string;
}) {
  const variantClass = (() => {
    switch (variant) {
      case 'primary':
        return 'bg-primary hover:bg-secondary text-text-dark hover:text-neutral';
      case 'secondary':
        return 'bg-secondary hover:bg-primary text-text-dark hover:text-neutral';
    }
  })();

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`bg-primary text-text-dark hover:text-neutral rounded p-xs hover:bg-secondary text-center no-underline flex items-center justify-center ${variantClass} ${className}`}
    >
      {children}
    </Link>
  );
}
