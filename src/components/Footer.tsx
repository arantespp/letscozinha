import logo from 'public/logo-texto.png';
import Image from 'next/image';
import Link from 'next/link';
import { getLetsCozinha } from 'src/cms/singleTypes';
import { PagesNav } from './PagesNav';
import { SocialNav } from './SocialNav';

const ImageSection = async () => {
  const { letsCozinha } = await getLetsCozinha();

  const descricao = letsCozinha.descricao;

  return (
    <section className="flex flex-col items-center gap-sm">
      <Link href="/">
        <Image src={logo} alt="Lets Cozinha" height={60} quality={100} />
      </Link>
      <p className="w-[300px] text-center italic ">{descricao}</p>
    </section>
  );
};

const PageNavSection = () => {
  return (
    <section className="flex flex-col items-center md:items-start">
      <h4>Navegue</h4>
      <PagesNav className="flex flex-col gap-xs items-center md:items-start" />
    </section>
  );
};

const SocialNavSection = () => {
  return (
    <section className="flex flex-col items-center md:items-start">
      <h4>Siga-nos</h4>
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
      <div className="container flex flex-col md:flex-row items-center md:items-start justify-evenly gap-lg py-lg md:py-xl">
        <ImageSection />
        <PageNavSection />
        <SocialNavSection />
      </div>
      <div className="flex justify-center py-sm bg-primary">
        <span>© {currentYear} Lets Cozinha</span>
      </div>
    </footer>
  );
}
