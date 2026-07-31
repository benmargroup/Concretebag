import { hubs, type CalcPage } from "@data/pages";
import { pageLinks } from "@data/linkmap";
import { esHubs, type EsPage } from "@/lib/i18n/esPages";
import { es } from "@/lib/i18n/es";
import { PRICE, PRICING_LABEL, formatCurrency } from "@/lib/pricing";
import { SITE_URL } from "@/lib/site";
import { pageCanonicalUrl } from "@/lib/seo";
import { breadcrumbListSchema, faqPageSchema, webApplicationSchema } from "@/lib/schema";
import JsonLd from "./JsonLd";
import Breadcrumbs from "./Breadcrumbs";
import AdSlot from "./AdSlot";
import CalculatorBlock from "./CalculatorBlock";
import ReferenceTable from "./ReferenceTable";
import HowItWorksFaq from "./HowItWorksFaq";
import RelatedPages from "./RelatedPages";

interface PageTemplateProps {
  page: CalcPage | EsPage;
  locale?: "en" | "es";
}

const hubsBySlug = new Map(hubs.map((h) => [h.slug, h]));
const esHubsByEnSlug = new Map(esHubs.map((h) => [h.enSlug, h]));

export default function PageTemplate({ page, locale = "en" }: PageTemplateProps) {
  const isEs = locale === "es";
  const isReference = page.pageType === "reference";
  const enSlug = isEs ? (page as EsPage).enSlug : (page as CalcPage).slug;
  const hubEnSlug = pageLinks[enSlug]?.hub;
  const hub = hubEnSlug ? (isEs ? esHubsByEnSlug.get(hubEnSlug) : hubsBySlug.get(hubEnSlug)) : undefined;
  const basePath = isEs ? "/es" : "";

  // Structured data should describe the canonical resource, not a near-twin duplicate.
  const canonicalUrl = pageCanonicalUrl(enSlug, locale);
  const homeUrl = isEs ? "/es/" : "/";

  const breadcrumbSchemaItems = [
    { name: isEs ? es.breadcrumbs.home : "Home", url: isEs ? `${SITE_URL}/es/` : `${SITE_URL}/` },
    ...(hub ? [{ name: hub.h1, url: `${SITE_URL}${basePath}/${hub.slug}/` }] : []),
    { name: page.h1, url: canonicalUrl },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={webApplicationSchema({
          name: page.metaTitle,
          description: page.metaDescription,
          url: canonicalUrl,
        })}
      />
      <JsonLd data={faqPageSchema(page.faq)} />
      <JsonLd data={breadcrumbListSchema(breadcrumbSchemaItems)} />

      <Breadcrumbs
        items={[
          { name: isEs ? es.breadcrumbs.home : "Home", href: homeUrl },
          ...(hub ? [{ name: hub.h1, href: `${basePath}/${hub.slug}` }] : []),
          { name: page.h1 },
        ]}
      />

      <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{page.h1}</h1>

      {isReference ? (
        <>
          <p className="mt-4 text-lg font-bold sm:text-xl">{page.faq[0]?.a}</p>
          <AdSlot id="ad-slot-1" label={isEs ? es.adPlaceholder : "Advertisement"} />
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">
            {isEs ? (
              <>
                {es.referenceTable.pricesAsOf} {es.pricingLabel}: 80 lb {formatCurrency(PRICE[80])} · 60 lb{" "}
                {formatCurrency(PRICE[60])} · 40 lb {formatCurrency(PRICE[40])}
              </>
            ) : (
              <>
                Bag prices as of {PRICING_LABEL}: 80 lb {formatCurrency(PRICE[80])} · 60 lb{" "}
                {formatCurrency(PRICE[60])} · 40 lb {formatCurrency(PRICE[40])}
              </>
            )}
          </p>
          <ReferenceTable locale={locale} />
          <AdSlot id="ad-slot-2" label={isEs ? es.adPlaceholder : "Advertisement"} />
        </>
      ) : (
        <CalculatorBlock
          page={page}
          locale={locale}
          afterAnswer={<AdSlot id="ad-slot-1" label={isEs ? es.adPlaceholder : "Advertisement"} />}
          afterCalculator={<AdSlot id="ad-slot-2" label={isEs ? es.adPlaceholder : "Advertisement"} />}
        />
      )}

      <HowItWorksFaq page={page} locale={locale} />
      <RelatedPages page={page} locale={locale} />
    </div>
  );
}
