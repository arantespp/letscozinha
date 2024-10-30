import { SocialNav } from 'src/components/SocialNav';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import { getWebsiteName } from 'src/methods/getWebsiteName';
import type { Metadata } from 'next';

const title = getPageTitle('Contato');

const url = getUrl(`/contato`);

const description = 'Entre em contato conosco para dúvidas, sugestões e mais.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    type: 'website',
    siteName: getWebsiteName(),
  },
};

export default async function Contact() {
  return (
    <div className="">
      <h1>Contato</h1>
      <p>
        Se você tiver alguma dúvida, sugestão ou quiser falar conosco, entre em
        contato pelos nossos canais de comunicação.
      </p>
      <SocialNav
        className="flex flex-col gap-md mt-lg"
        linkClassName="flex items-center gap-sm no-underline"
        iconClassName="text-2xl"
      />
    </div>
  );
}
