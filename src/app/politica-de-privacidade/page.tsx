import { Markdown } from 'src/components/Markdown';
import { getLetsCozinhaPoliticas } from 'src/cms/singleTypes';
import { getPageTitle } from 'src/methods/getPageTitle';
import { getUrl } from 'src/methods/getUrl';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: getPageTitle('Política de Privacidade'),
  description:
    'Política de privacidade do Lets Cozinha: como coletamos, usamos e protegemos seus dados.',
  alternates: {
    canonical: getUrl('/politica-de-privacidade'),
  },
};

export default async function PoliticaDePrivacidadePage() {
  const { letsCozinhaPoliticas } = await getLetsCozinhaPoliticas();
  return <Markdown source={letsCozinhaPoliticas.politica_de_privacidade} />;
}
