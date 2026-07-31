import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages, hubs } from "@data/pages";
import { hubMembers } from "@data/linkmap";
import PageTemplate from "@/components/PageTemplate";
import HubPageTemplate from "@/components/HubPageTemplate";
import { SITE_URL } from "@/lib/site";
import { canonicalSlugFor, hubLanguageAlternates, pageLanguageAlternates } from "@/lib/seo";

export const dynamicParams = false;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [...pages.map((page) => ({ slug: page.slug })), ...hubs.map((hub) => ({ slug: hub.slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const canonical = `${SITE_URL}/${canonicalSlugFor(slug)}/`;

  const page = pages.find((p) => p.slug === slug);
  if (page) {
    return {
      title: page.metaTitle,
      description: page.metaDescription,
      alternates: { canonical, languages: pageLanguageAlternates(slug) },
    };
  }

  const hub = hubs.find((h) => h.slug === slug);
  if (hub) {
    return {
      title: hub.metaTitle,
      description: `Browse every ${hub.h1} page — bag counts and costs for each size.`,
      alternates: { canonical, languages: hubLanguageAlternates(slug) },
    };
  }

  return {};
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;

  const page = pages.find((p) => p.slug === slug);
  if (page) return <PageTemplate page={page} />;

  const hub = hubs.find((h) => h.slug === slug);
  if (hub) return <HubPageTemplate hub={hub} members={hubMembers[hub.slug] ?? []} />;

  notFound();
}
