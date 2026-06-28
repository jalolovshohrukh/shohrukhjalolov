/**
 * Injects schema.org JSON-LD. Server component. The `<` escape prevents any
 * possibility of breaking out of the script tag.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
