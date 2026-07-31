import { PRICE, PRICING_LABEL, bagCost, formatCurrency } from "@/lib/pricing";
import { es } from "@/lib/i18n/es";

interface MaterialListProps {
  bagCount: number;
  bagLb: 40 | 60 | 80;
  locale?: "en" | "es";
}

const ACCESSORIES = [
  "Wheelbarrow or mixing tub",
  "Mixing hoe or drill paddle",
  "Margin trowel or float",
];

// Retailers only support searching by product (bag weight), not by quantity —
// so the search term matches the exact bag weight and the surrounding label
// conveys how many of that bag you need. The query itself stays in English
// since homedepot.com/lowes.com product listings are English-language.
function retailerSearchUrls(bagLb: 40 | 60 | 80) {
  const query = `${bagLb} lb concrete mix`;
  return {
    homeDepot: `https://www.homedepot.com/s/${encodeURIComponent(query)}`,
    lowes: `https://www.lowes.com/search?searchTerm=${encodeURIComponent(query)}`,
  };
}

export default function MaterialList({ bagCount, bagLb, locale = "en" }: MaterialListProps) {
  const isEs = locale === "es";
  const total = bagCost(bagCount, bagLb);
  const links = retailerSearchUrls(bagLb);
  const shopLabel = isEs
    ? es.materialList.shopTitle(bagLb, bagCount)
    : `Search results for ${bagLb} lb concrete mix — you need ${bagCount} bag${bagCount === 1 ? "" : "s"}`;

  return (
    <div className="mt-6 rounded-lg border border-black/10 p-4 dark:border-white/10">
      <h2 className="text-base font-semibold">
        {isEs ? es.materialList.title : "Material list"}
      </h2>
      <ul className="mt-3 space-y-3 text-sm">
        <li className="flex flex-wrap items-center justify-between gap-2 border-b border-black/5 pb-3 dark:border-white/5">
          <span>
            {isEs ? es.materialList.bagsLine(bagCount, bagLb) : `${bagCount} × ${bagLb} lb concrete mix bags`}
            <span className="text-black/50 dark:text-white/50">
              {" "}
              — {formatCurrency(total)} @ {formatCurrency(PRICE[bagLb])}/
              {isEs ? "saco" : "bag"} ({isEs ? es.pricingLabel : PRICING_LABEL})
            </span>
          </span>
          <span className="flex gap-2">
            <a
              href={links.homeDepot}
              target="_blank"
              rel="noopener noreferrer"
              title={shopLabel}
              className="rounded-full border border-black/15 px-3 py-1 text-xs font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              {isEs ? es.materialList.shopHomeDepot : "Home Depot ↗"}
            </a>
            <a
              href={links.lowes}
              target="_blank"
              rel="noopener noreferrer"
              title={shopLabel}
              className="rounded-full border border-black/15 px-3 py-1 text-xs font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              {isEs ? es.materialList.shopLowes : "Lowe's ↗"}
            </a>
          </span>
        </li>
        {(isEs ? es.materialList.accessories : ACCESSORIES).map((item) => (
          <li key={item} className="text-black/70 dark:text-white/70">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
