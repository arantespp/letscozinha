import { Markdown } from 'src/components/Markdown';
import { getLetsCozinhaPoliticas } from 'src/cms/singleTypes';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: getPageTitle('Termos de Uso'),
  description: 'Termos de uso do site Lets Cozinha.',
  alternates: {
    canonical: getUrl('/termos-de-uso'),
  },
};

export default async function TermosDeUsoPage() {
  const { letsCozinhaPoliticas } = await getLetsCozinhaPoliticas();
  return <Markdown source={letsCozinhaPoliticas.termos_de_uso} />;
}
