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
    <section className="flex flex-col items-center gap-sm self-center">
      <Link href="/">
        <Image src={logo} alt="Lets Cozinha" height={60} quality={100} />
      </Link>
      <p className="w-[320px] text-center italic ">{descricao}</p>
    </section>
  );
};

const PageNavSection = () => {
  return (
    <section className="flex flex-col items-center lg:items-start">
      <h4>Navegue</h4>
      <PagesNav className="flex flex-col gap-xs items-center lg:items-start" />
    </section>
  );
};

const SocialNavSection = () => {
  return (
    <section className="flex flex-col items-center lg:items-start">
      <h4>Conecte-se</h4>
      <SocialNav
        className="flex flex-row gap-md text-2xl md:text-2xl"
        noLabel
      />
    </section>
  );
};

export async function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted">
      <div className="container py-lg md:py-xl gap-lg flex flex-col items-center lg:grid lg:grid-cols-3 lg:justify-items-center lg:items-start">
        <ImageSection />
        <PageNavSection />
        <SocialNavSection />
      </div>
      <div className="flex flex-col items-center py-sm gap-xs bg-primary">
        <div className="flex gap-sm md:gap-md">
          <Link
            className="hover:no-underline hover:text-text-dark"
            href="/politica-de-privacidade"
          >
            Política de Privacidade
          </Link>
          <Link
            className="hover:no-underline hover:text-text-dark"
            href="/termos-de-uso"
          >
            Termos de Uso
          </Link>
        </div>
        <span>© {currentYear} Lets Cozinha</span>
      </div>
    </footer>
  );
}
