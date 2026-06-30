type MarkdownProps = {
  html: string;
};

export function Markdown({ html }: MarkdownProps) {
  return (
    <section
      className="max-w-article break-words [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
