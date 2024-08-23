import Link from 'next/link';
import { HeaderNav } from 'src/components/HeaderNav';

export default function NotFound() {
  return (
    <div
      className="flex flex-col gap-sm mt-md items-center text-center
    "
    >
      <h2>Ops, página não encontrada</h2>
      <p className="max-w-[30rem]">
        Desculpe, mas a página que você está procurando não foi encontrada.
        Enquanto isso, você pode voltar para{' '}
      </p>
      <HeaderNav />
    </div>
  );
}
