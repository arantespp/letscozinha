import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote-client/rsc';

const components: MDXRemoteProps['components'] = {
  // break-words evita overflow horizontal com palavras/URLs longas do CMS;
  // tabelas viram blocos roláveis em vez de alargar a página no mobile
  wrapper: ({ children }) => (
    <section className="max-w-article break-words [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto">
      {children}
    </section>
  ),
};

export function Markdown(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
