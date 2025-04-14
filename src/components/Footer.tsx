import { PagesNav } from './PagesNav';
import { SocialNav } from './SocialNav';
import { getLetsCozinha } from 'src/cms/singleTypes';
import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo-texto.png';

const ImageSection = async () => {
  const { letsCozinha } = await getLetsCozinha();
  const descricao = letsCozinha.descricao;

  return (
    <section className="flex flex-col items-center lg:items-start gap-sm">
      <Link href="/" className="transition-opacity hover:opacity-90">
        <Image src={logo} alt="Lets Cozinha" height={60} quality={100} />
      </Link>
      <p className="text-text-dark/80 max-w-[320px] text-center lg:text-left text-sm leading-relaxed">
        {descricao}
      </p>

      <div className="mt-sm">
        <SocialNav className="flex flex-row gap-sm text-xl" noLabel />
      </div>
    </section>
  );
};

const PageNavSection = () => {
  return (
    <section className="flex flex-col items-center lg:items-start">
      <h4 className="text-lg font-bold mb-md">Links Rápidos</h4>
      <PagesNav className="flex flex-col gap-xs items-center lg:items-start [&>a]:text-text-dark/80 [&>a]:no-underline [&>a:hover]:text-primary" />
    </section>
  );
};

const NewsletterSection = () => {
  return (
    <section className="flex flex-col items-center lg:items-start w-full">
      <h4 className="text-lg font-bold mb-md">Receba Nossas Novidades</h4>
      <p className="text-text-dark/80 text-sm mb-sm text-center lg:text-left">
        Cadastre seu email para receber nossas receitas e dicas culinárias.
      </p>
      <form className="flex flex-col sm:flex-row gap-xs w-full">
        <input
          type="email"
          placeholder="Seu email"
          className="px-md py-sm border border-gray-200 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
          required
        />
        <button
          type="submit"
          className="bg-primary hover:bg-primary/80 text-text-dark px-md py-sm rounded-md font-medium transition-colors whitespace-nowrap"
        >
          Inscrever
        </button>
      </form>
    </section>
  );
};

export async function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-gray-100">
      <div className="container py-xl gap-lg grid grid-cols-1 md:grid-cols-12 items-start px-sm md:px-0">
        <div className="md:col-span-6 lg:col-span-5 xl:col-span-4">
          <ImageSection />
        </div>
        <div className="md:col-span-6 lg:col-span-3 xl:col-span-3">
          <PageNavSection />
        </div>
        <div className="md:col-span-12 lg:col-span-4 xl:col-span-5">
          <NewsletterSection />
        </div>
      </div>
      <div className="bg-primary/10 border-t border-primary/20">
        <div className="container py-md flex flex-col md:flex-row justify-between items-center gap-md px-sm md:px-0">
          <span className="text-text-dark/80 text-sm">
            © {currentYear} Lets Cozinha - Todos os direitos reservados
          </span>
          <div className="flex gap-md text-sm">
            <Link
              className="text-text-dark/80 hover:text-primary hover:no-underline transition-colors"
              href="/politica-de-privacidade"
            >
              Política de Privacidade
            </Link>
            <Link
              className="text-text-dark/80 hover:text-primary hover:no-underline transition-colors"
              href="/termos-de-uso"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
