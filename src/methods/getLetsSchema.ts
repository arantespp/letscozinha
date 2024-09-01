import { getLetsCozinhaLets } from 'src/cms/singleTypes';
import { Person } from 'schema-dts';
import { getImageSchema } from './getImageSchema';

export async function getLetsSchema(): Promise<Person> {
  const { letsCozinhaLets } = await getLetsCozinhaLets();

  return {
    '@type': 'Person',
    name: letsCozinhaLets.nome,
    description: letsCozinhaLets.resumo,
    image: getImageSchema(letsCozinhaLets.imagem),
  };
}
