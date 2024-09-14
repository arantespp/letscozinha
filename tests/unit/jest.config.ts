import { jestUnitConfig } from '@ttoss/config';

/**
 * https://github.com/facebook/jest/issues/12984#issuecomment-1228392944
 */
const esmModules = [
  'bail',
  'character-entities',
  'decode-named-character-reference',
  'devlop',
  'is-plain-obj',
  'mdast-util-from-markdown',
  'mdast-util-to-string',
  'micromark',
  'remark-parse',
  'trough',
  'unified',
  'unist-util-stringify-position',
  'vfile',
];

const transformIgnorePatterns = [
  `node_modules/(?!(?:.pnpm/)?(${esmModules.join('|')}))`,
];

export default jestUnitConfig({
  moduleNameMapper: {
    // 🧑🏻‍🔧 FIX Problem here
    // 🧑🏻‍🔧 resolve react module with the next.js inset one.
    // react: 'next/dist/compiled/react/cjs/react.development.js',
  },
  setupFiles: ['./setupTests.ts'],
  transformIgnorePatterns,
});
