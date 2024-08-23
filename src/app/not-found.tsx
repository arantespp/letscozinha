import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col gap-sm">
      <h2>Ops, página não encontrada</h2>
      <p>Desculpe, mas a página que você está procurando não foi encontrada.</p>
      <Link href="/">Ir para a página inicial</Link>
    </div>
  );
}
