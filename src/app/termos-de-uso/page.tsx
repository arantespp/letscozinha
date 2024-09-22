import { getLetsCozinhaPoliticas } from 'src/cms/singleTypes';
import { Markdown } from 'src/components/Markdown';

export default async function TermosDeUsoPage() {
  const { letsCozinhaPoliticas } = await getLetsCozinhaPoliticas();
  return <Markdown source={letsCozinhaPoliticas.termos_de_uso} />;
}
