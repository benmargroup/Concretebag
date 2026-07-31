import { SITE_URL } from "./site";
import { PAGE_SLUG_TO_ES, HUB_SLUGS_ES } from "./i18n/slugMap";

// Near-twin pages that would otherwise compete with a stronger sibling page
// for the same search intent. Canonical points the weaker twin at the primary.
export const CANONICAL_OVERRIDES: Record<string, string> = {
  "4x4-fence-post-8-inch-hole": "4x4-fence-post-9-inch-hole",
};

export function canonicalSlugFor(slug: string): string {
  return CANONICAL_OVERRIDES[slug] ?? slug;
}

export function pageCanonicalUrl(enSlug: string, locale: "en" | "es"): string {
  const canonicalEnSlug = canonicalSlugFor(enSlug);
  return locale === "es"
    ? `${SITE_URL}/es/${PAGE_SLUG_TO_ES[canonicalEnSlug]}/`
    : `${SITE_URL}/${canonicalEnSlug}/`;
}

export function hubCanonicalUrl(enHubSlug: string, locale: "en" | "es"): string {
  return locale === "es"
    ? `${SITE_URL}/es/${HUB_SLUGS_ES[enHubSlug]}/`
    : `${SITE_URL}/${enHubSlug}/`;
}

// hreflang alternates pair a specific page with its specific translation —
// independent of canonical-override handling above, which only concerns
// near-twin duplicates within a single locale.
export function pageLanguageAlternates(enSlug: string) {
  return {
    en: `${SITE_URL}/${enSlug}/`,
    es: `${SITE_URL}/es/${PAGE_SLUG_TO_ES[enSlug]}/`,
    "x-default": `${SITE_URL}/${enSlug}/`,
  };
}

export function hubLanguageAlternates(enHubSlug: string) {
  return {
    en: `${SITE_URL}/${enHubSlug}/`,
    es: `${SITE_URL}/es/${HUB_SLUGS_ES[enHubSlug]}/`,
    "x-default": `${SITE_URL}/${enHubSlug}/`,
  };
}

export const homeLanguageAlternates = {
  en: `${SITE_URL}/`,
  es: `${SITE_URL}/es/`,
  "x-default": `${SITE_URL}/`,
};
