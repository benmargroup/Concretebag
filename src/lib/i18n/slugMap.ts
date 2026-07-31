import { pages, hubs } from "@data/pages";

// Categories whose Spanish slug is derived purely from geometry — no
// per-page hand-mapping needed since the English slugs follow the same
// deterministic pattern (verified against data/pages.ts).
function slabSlugEs(lengthFt: number, widthFt: number): string {
  return `losa-de-concreto-${lengthFt}x${widthFt}`;
}
function drivewaySlugEs(lengthFt: number, widthFt: number): string {
  return `losa-de-concreto-${lengthFt}x${widthFt}-6-pulgadas`;
}
function shedSlugEs(lengthFt: number, widthFt: number): string {
  return `base-de-cobertizo-${lengthFt}x${widthFt}`;
}
function sonotubeSlugEs(diameterIn: number): string {
  return `sonotubo-de-${diameterIn}-pulgadas`;
}

// Post-hole and reference pages don't follow a clean geometry pattern in
// English (mixed naming: fence post / deck post / mailbox / pergola), so
// they're mapped explicitly.
const POST_SLUGS_ES: Record<string, string> = {
  "4x4-fence-post-8-inch-hole": "poste-de-cerca-4x4-hoyo-8-pulgadas",
  "4x4-fence-post-9-inch-hole": "poste-de-cerca-4x4-hoyo-9-pulgadas",
  "4x4-fence-post-36-inch-deep": "poste-de-cerca-4x4-36-pulgadas-de-profundidad",
  "6x6-post-10-inch-hole": "poste-6x6-hoyo-10-pulgadas",
  "6x6-post-12-inch-hole": "poste-de-terraza-6x6-hoyo-12-pulgadas",
  "mailbox-post-concrete": "poste-de-buzon-concreto",
  "pergola-post-concrete": "poste-de-pergola-concreto",
};

const REFERENCE_SLUGS_ES: Record<string, string> = {
  "bags-of-concrete-per-yard": "sacos-de-concreto-por-yarda",
  "80lb-bags-per-yard": "sacos-de-80-lb-por-yarda",
  "60lb-bags-per-yard": "sacos-de-60-lb-por-yarda",
  "cubic-feet-per-bag": "pies-cubicos-por-saco",
  "80lb-vs-60lb-concrete": "sacos-de-80-lb-vs-60-lb",
  "bags-on-a-pallet": "sacos-por-tarima",
  "concrete-bag-prices": "precios-de-sacos-de-concreto",
};

export const HUB_SLUGS_ES: Record<string, string> = {
  "slab-calculator": "calculadora-de-losas",
  "driveway-calculator": "calculadora-de-entradas",
  "post-hole-calculator": "calculadora-de-postes",
  "sonotube-calculator": "calculadora-de-sonotubos",
  "shed-base-calculator": "calculadora-de-base-de-cobertizo",
  "concrete-reference": "referencia-de-concreto",
};

function pageSlugEs(page: (typeof pages)[number]): string {
  if (page.pageType === "posthole") return POST_SLUGS_ES[page.slug];
  if (page.pageType === "reference") return REFERENCE_SLUGS_ES[page.slug];
  if (page.category === "driveway") {
    return drivewaySlugEs(page.geometry.lengthFt!, page.geometry.widthFt!);
  }
  if (page.category === "shed") {
    return shedSlugEs(page.geometry.lengthFt!, page.geometry.widthFt!);
  }
  if (page.pageType === "cylinder") {
    return sonotubeSlugEs(page.geometry.diameterIn!);
  }
  // remaining: pageType 'slab', category 'slab'
  return slabSlugEs(page.geometry.lengthFt!, page.geometry.widthFt!);
}

export const PAGE_SLUG_TO_ES: Record<string, string> = Object.fromEntries(
  pages.map((page) => [page.slug, pageSlugEs(page)])
);

export const PAGE_SLUG_FROM_ES: Record<string, string> = Object.fromEntries(
  Object.entries(PAGE_SLUG_TO_ES).map(([en, es]) => [es, en])
);

export const HUB_SLUG_FROM_ES: Record<string, string> = Object.fromEntries(
  Object.entries(HUB_SLUGS_ES).map(([en, es]) => [es, en])
);

// English slug -> Spanish slug for every routable page, hub, and the
// homepage (keyed by "" ). Used by the language switcher in Header.tsx.
export const ROUTE_SLUG_TO_ES: Record<string, string> = {
  "": "",
  ...PAGE_SLUG_TO_ES,
  ...HUB_SLUGS_ES,
};

export const ROUTE_SLUG_FROM_ES: Record<string, string> = Object.fromEntries(
  Object.entries(ROUTE_SLUG_TO_ES).map(([en, es]) => [es, en])
);

export const esHubSlugs = hubs.map((hub) => HUB_SLUGS_ES[hub.slug]);
