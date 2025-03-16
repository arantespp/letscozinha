import './env';

import { getRecipe } from '../src/cms/recipes';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

if (!args.documentId) {
  console.error('Please provide an document id');
  process.exit(1);
}

(async () => {
  const recipe = await getRecipe({ documentId: args.documentId });
  console.log(recipe);
})();
