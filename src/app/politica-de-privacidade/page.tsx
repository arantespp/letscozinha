import { Markdown } from 'src/components/Markdown';
import { getLetsCozinhaPoliticas } from 'src/cms/singleTypes';

export default async function PoliticaDePrivacidadePage() {
  const { letsCozinhaPoliticas } = await getLetsCozinhaPoliticas();
  return <Markdown source={letsCozinhaPoliticas.politica_de_privacidade} />;
}
