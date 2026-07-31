import type { MetadataRoute } from "next";
import { pages, hubs } from "@data/pages";
import { esPages, esHubs } from "@/lib/i18n/esPages";
import { SITE_URL } from "@/lib/site";
import { canonicalSlugFor } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  };

  const homeEs: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/es/`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
  };

  const hubEntries: MetadataRoute.Sitemap = hubs.map((hub) => ({
    url: `${SITE_URL}/${hub.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const hubEntriesEs: MetadataRoute.Sitemap = esHubs.map((hub) => ({
    url: `${SITE_URL}/es/${hub.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const legalEntries: MetadataRoute.Sitemap = ["about", "privacy", "terms"].map((slug) => ({
    url: `${SITE_URL}/${slug}/`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  // Pages whose canonical points at a sibling are duplicates — omit them so
  // the sitemap only lists canonical URLs, per Google's sitemap guidance.
  const pageEntries: MetadataRoute.Sitemap = pages
    .filter((page) => canonicalSlugFor(page.slug) === page.slug)
    .map((page) => ({
      url: `${SITE_URL}/${page.slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const pageEntriesEs: MetadataRoute.Sitemap = esPages
    .filter((page) => canonicalSlugFor(page.enSlug) === page.enSlug)
    .map((page) => ({
      url: `${SITE_URL}/es/${page.slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [
    home,
    homeEs,
    ...hubEntries,
    ...hubEntriesEs,
    ...legalEntries,
    ...pageEntries,
    ...pageEntriesEs,
  ];
}
