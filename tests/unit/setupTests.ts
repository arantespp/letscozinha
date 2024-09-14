import { letsCozinhaLets } from './fixtures/letsCozinhaLets';

jest.mock('meilisearch');

jest.mock('../../src/cms/recipes.ts');

const mockLetsCozinhaLets = letsCozinhaLets;

jest.mock('../../src/cms/singleTypes.ts', () => {
  return {
    getLetsCozinhaLets: jest.fn().mockResolvedValue({
      letsCozinhaLets: mockLetsCozinhaLets,
    }),
  };
});
