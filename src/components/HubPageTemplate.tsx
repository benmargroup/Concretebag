import Link from "next/link";
import { pages, type hubs } from "@data/pages";
import { esPages, type EsHub } from "@/lib/i18n/esPages";
import { es } from "@/lib/i18n/es";
import { bagsNeeded } from "@/lib/calc";
import { cuFtForPage } from "@/lib/geometry";
import { bagCost, formatCurrency } from "@/lib/pricing";
import { hubCanonicalUrl } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { breadcrumbListSchema, webApplicationSchema } from "@/lib/schema";
import JsonLd from "./JsonLd";
import Breadcrumbs from "./Breadcrumbs";

type EnHub = (typeof hubs)[number];

interface HubPageTemplateProps {
  hub: EnHub | EsHub;
  members: string[];
  locale?: "en" | "es";
}

const pagesBySlug = new Map(pages.map((p) => [p.slug, p]));
const esPagesByEnSlug = new Map(esPages.map((p) => [p.enSlug, p]));

export default function HubPageTemplate({ hub, members, locale = "en" }: HubPageTemplateProps) {
  const isEs = locale === "es";
  const enHubSlug = isEs ? (hub as EsHub).enSlug : (hub as EnHub).slug;
  const hubUrl = hubCanonicalUrl(enHubSlug, locale);
  const basePath = isEs ? "/es" : "";
  const memberPages = members
    .map((slug) => (isEs ? esPagesByEnSlug.get(slug) : pagesBySlug.get(slug)))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: hub.metaTitle,
          description: isEs
            ? `Explora cada página de ${hub.h1} — sacos y costo por tamaño.`
            : `Browse every ${hub.h1} page — bag counts and costs for each size.`,
          url: hubUrl,
        })}
      />
      <JsonLd
        data={breadcrumbListSchema([
          { name: isEs ? "Inicio" : "Home", url: isEs ? `${SITE_URL}/es/` : `${SITE_URL}/` },
          { name: hub.h1, url: hubUrl },
        ])}
      />

      <Breadcrumbs
        items={[{ name: isEs ? es.breadcrumbs.home : "Home", href: isEs ? "/es/" : "/" }, { name: hub.h1 }]}
      />

      <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{hub.h1}</h1>
      <p className="mt-3 max-w-2xl text-sm text-black/70 dark:text-white/70">
        {isEs
          ? es.hubPage.intro
          : `Every ${hub.h1.toLowerCase()} page in one place. Pick your size below for the exact bag count and cost.`}
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {memberPages.map((page) => {
          const isReference = page.pageType === "reference";
          const bags = isReference ? null : bagsNeeded(cuFtForPage(page), page.defaultBag);
          const cost = bags === null ? null : bagCost(bags, page.defaultBag);

          return (
            <li
              key={page.slug}
              className="rounded-lg border border-black/10 p-4 text-sm dark:border-white/10"
            >
              <Link
                href={`${basePath}/${page.slug}`}
                className="font-medium underline underline-offset-4 hover:no-underline"
              >
                {page.h1}
              </Link>
              {bags !== null && cost !== null && (
                <p className="mt-1 text-black/60 dark:text-white/60">
                  {isEs
                    ? `≈${bags} sacos de ${page.defaultBag} lb (~${formatCurrency(cost)})`
                    : `≈${bags} bags of ${page.defaultBag} lb (~${formatCurrency(cost)})`}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
