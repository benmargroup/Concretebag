import Link from "next/link";
import { pages, hubs, type CalcPage } from "@data/pages";
import { pageLinks } from "@data/linkmap";
import { esPages, esHubs, type EsPage } from "@/lib/i18n/esPages";
import { es } from "@/lib/i18n/es";

interface RelatedPagesProps {
  page: CalcPage | EsPage;
  locale?: "en" | "es";
}

interface LinkItem {
  slug: string;
  h1: string;
}

const pagesBySlug = new Map(pages.map((p) => [p.slug, p]));
const hubsBySlug = new Map(hubs.map((h) => [h.slug, h]));
const esPagesByEnSlug = new Map(esPages.map((p) => [p.enSlug, p]));
const esHubsByEnSlug = new Map(esHubs.map((h) => [h.enSlug, h]));

export default function RelatedPages({ page, locale = "en" }: RelatedPagesProps) {
  const isEs = locale === "es";
  const enSlug = isEs ? (page as EsPage).enSlug : (page as CalcPage).slug;
  const link = pageLinks[enSlug];
  if (!link) return null;

  const basePath = isEs ? "/es" : "";

  const hub: LinkItem | undefined = isEs ? esHubsByEnSlug.get(link.hub) : hubsBySlug.get(link.hub);

  function resolve(slugs: string[], byEnSlug: Map<string, LinkItem>): LinkItem[] {
    const items: LinkItem[] = [];
    for (const slug of slugs) {
      const item = byEnSlug.get(slug);
      if (item) items.push(item);
    }
    return items;
  }

  const siblings = resolve(link.siblings, isEs ? esPagesByEnSlug : pagesBySlug);
  const crossHubs = resolve(link.crossLinks, isEs ? esHubsByEnSlug : hubsBySlug);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold">
        {isEs ? es.relatedPages.title : "Related pages"}
      </h2>

      {hub && (
        <p className="mt-2 text-sm">
          <Link href={`${basePath}/${hub.slug}`} className="underline underline-offset-4 hover:no-underline">
            ← {isEs ? es.relatedPages.backTo : "Back to"} {hub.h1}
          </Link>
        </p>
      )}

      {siblings.length > 0 && (
        <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1 text-sm sm:grid-cols-2">
          {siblings.map((sibling) => (
            <li key={sibling.slug}>
              <Link
                href={`${basePath}/${sibling.slug}`}
                className="underline underline-offset-4 hover:no-underline"
              >
                {sibling.h1}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {crossHubs.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {crossHubs.map((crossHub) => (
            <Link
              key={crossHub.slug}
              href={`${basePath}/${crossHub.slug}`}
              className="rounded-full border border-black/15 px-3 py-1 text-xs font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              {crossHub.h1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
