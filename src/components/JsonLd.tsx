import { jsonLdString } from "@/lib/jsonld";

type JsonLdProps = {
  /** Any of the documents built in `lib/jsonld`. */
  document: unknown;
};

/**
 * One structured-data document, in the one place that knows how to write it.
 *
 * The serialising lives in `lib/jsonld` so a page never hand-rolls the JSON,
 * and the id makes the script easy to find when checking a page in a
 * validator.
 */
export default function JsonLd({ document }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdString(document) }}
    />
  );
}
