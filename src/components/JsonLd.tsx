import type { WithContext, Thing } from 'schema-dts';

export function JsonLd<Schema extends Thing>({
  schema,
}: {
  schema?: Schema | null;
}) {
  const jsonLd: WithContext<Schema> | undefined = (() => {
    if (!schema) {
      return;
    }

    if (typeof schema === 'object') {
      return {
        '@context': 'https://schema.org',
        ...schema,
      };
    }
  })();

  if (!jsonLd) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
