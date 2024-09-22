import { getLetsCozinhaPoliticas } from 'src/cms/singleTypes';
import { Markdown } from 'src/components/Markdown';

export default async function PoliticaDePrivacidadePage() {
  const { letsCozinhaPoliticas } = await getLetsCozinhaPoliticas();
  return <Markdown source={letsCozinhaPoliticas.politica_de_privacidade} />;
}
