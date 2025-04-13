import { SocialNav } from 'src/components/SocialNav';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import { getLetsCozinhaLets } from 'src/cms/singleTypes';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

const title = getPageTitle('Contato');
const url = getUrl(`/contato`);
const description =
  'Entre em contato conosco para dúvidas, sugestões e mais. Conecte-se com a Lets Cozinha nas redes sociais ou envie uma mensagem direta.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    type: 'website',
    siteName: getWebsiteName(),
    images: ['https://www.letscozinha.com.br/opengraph-image.jpg'],
  },
};

export default async function Contact() {
  const { letsCozinhaLets } = await getLetsCozinhaLets();

  return (
    <div className="container py-lg px-sm md:px-0">
      <header className="mb-xl text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading mb-sm">
          Entre em Contato
        </h1>
        <p className="text-text-light text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
          Tem alguma dúvida, sugestão ou apenas quer dizer olá? Ficarei feliz em
          ouvir de você! Você pode me encontrar nas redes sociais ou enviar uma
          mensagem direta.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-xl">
        {/* Left column - About Lets */}
        <div className="bg-muted rounded-xl p-md md:p-lg shadow-sm">
          <div className="flex flex-col items-center text-center mb-lg">
            <div className="w-28 h-28 md:w-32 md:h-32 relative mb-md">
              <Image
                className="rounded-full object-cover border-2 border-primary/20"
                src={letsCozinhaLets.imagem.url}
                alt="Foto da Lets"
                fill
                sizes="(max-width: 768px) 112px, 128px"
              />
            </div>
            <h2 className="text-xl md:text-2xl font-heading mb-sm">
              Conheça a Lets
            </h2>
            <p className="italic text-text-light leading-relaxed">
              "{letsCozinhaLets.resumo}"
            </p>
            <Link
              href="/conheca-a-lets"
              className="mt-md text-primary hover:underline font-medium"
            >
              Saiba mais sobre mim
            </Link>
          </div>

          <div className="mb-md">
            <h3 className="text-lg font-heading mb-sm">
              Encontre-me nas redes sociais
            </h3>
            <SocialNav
              className="flex flex-wrap gap-sm"
              linkClassName="flex items-center justify-center w-10 h-10 rounded-full hover:bg-primary hover:text-white transition-colors p-sm bg-white/80 shadow-sm"
              iconClassName="text-xl"
              noLabel
            />
          </div>
        </div>

        {/* Right column - Contact Form and Information */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-md md:p-lg shadow-sm">
          <div className="mb-lg">
            <h2 className="text-xl md:text-2xl font-heading mb-md">
              Informações de Contato
            </h2>
            <ul className="flex flex-col gap-md">
              <li className="flex items-center gap-sm">
                <span className="text-lg">✉️</span>
                <a
                  href="mailto:contato@letscozinha.com.br"
                  className="hover:text-primary transition-colors"
                >
                  contato@letscozinha.com.br
                </a>
              </li>
              <li className="flex items-center gap-sm">
                <span className="text-lg">📍</span>
                <span>Brasil</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-heading mb-md">
              FAQ - Perguntas Frequentes
            </h2>
            <div className="space-y-md">
              <div>
                <h3 className="font-medium mb-xs">
                  Como posso sugerir uma receita?
                </h3>
                <p className="text-text-light">
                  Você pode me enviar sugestões de receitas através das minhas
                  redes sociais ou por email.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-xs">
                  Posso compartilhar suas receitas no meu blog ou site?
                </h3>
                <p className="text-text-light">
                  Sim! Fique à vontade para compartilhar, apenas peço que
                  mencione o Lets Cozinha como fonte.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-xs">
                  Como posso ser notificado sobre novas receitas?
                </h3>
                <p className="text-text-light">
                  Siga-me nas redes sociais para receber notificações sobre
                  novos conteúdos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
