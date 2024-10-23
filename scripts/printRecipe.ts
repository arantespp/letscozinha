import './env';

import { findRecipe } from '../src/cms/recipes';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));

if (!args.id) {
  console.error('Please provide an id');
  process.exit(1);
}

(async () => {
  const recipe = await findRecipe({ id: args.id });
  console.log(recipe);
})();
