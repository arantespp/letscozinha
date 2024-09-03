import { unified } from 'unified';
import remarkParse from 'remark-parse';

export const getMarkdownAst = async (markdown: string): Promise<any> => {
  const processor = unified().use(remarkParse);
  return processor.parse(markdown);
};
