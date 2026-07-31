import type { CalcPage } from "@data/pages";
import type { EsPage } from "@/lib/i18n/esPages";
import { es } from "@/lib/i18n/es";

interface HowItWorksFaqProps {
  page: CalcPage | EsPage;
  locale?: "en" | "es";
}

export default function HowItWorksFaq({ page, locale = "en" }: HowItWorksFaqProps) {
  const isReference = page.pageType === "reference";
  const isEs = locale === "es";

  const title = isEs ? es.howItWorks.title : "How this is calculated";
  const body = isEs
    ? isReference
      ? es.howItWorks.referenceBody
      : es.howItWorks.body
    : isReference
      ? "These figures come straight from each bag's cubic-foot yield — no project waste buffer applied, since they're fixed reference conversions."
      : "We convert your dimensions to cubic feet, add a 10% waste buffer for spillage and an uneven subgrade, then divide by the bag's yield and round up to the next full bag.";
  const faqTitle = isEs ? es.howItWorks.faqTitle : "FAQ";

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-black/70 dark:text-white/70">{body}</p>

      <h2 className="mt-8 text-lg font-semibold">{faqTitle}</h2>
      <div className="mt-2 divide-y divide-black/10 dark:divide-white/10">
        {page.faq.map((item) => (
          <details key={item.q} className="group py-3">
            <summary className="cursor-pointer list-none text-sm font-medium marker:content-none">
              {item.q}
            </summary>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
