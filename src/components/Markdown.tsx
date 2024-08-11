import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';

const components: MDXRemoteProps['components'] = {
  wrapper: ({ children }) => (
    <section className="max-w-article">{children}</section>
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
