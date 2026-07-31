import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hubMembers } from "@data/linkmap";
import { esPages, esHubs } from "@/lib/i18n/esPages";
import PageTemplate from "@/components/PageTemplate";
import HubPageTemplate from "@/components/HubPageTemplate";
import { SITE_URL } from "@/lib/site";
import { hubLanguageAlternates, pageCanonicalUrl, pageLanguageAlternates } from "@/lib/seo";

export const dynamicParams = false;

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...esPages.map((page) => ({ slug: page.slug })),
    ...esHubs.map((hub) => ({ slug: hub.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const page = esPages.find((p) => p.slug === slug);
  if (page) {
    return {
      title: page.metaTitle,
      description: page.metaDescription,
      alternates: {
        canonical: pageCanonicalUrl(page.enSlug, "es"),
        languages: pageLanguageAlternates(page.enSlug),
      },
    };
  }

  const hub = esHubs.find((h) => h.slug === slug);
  if (hub) {
    return {
      title: hub.metaTitle,
      description: `Explora cada página de ${hub.h1} — sacos y costo por tamaño.`,
      alternates: {
        canonical: `${SITE_URL}/es/${hub.slug}/`,
        languages: hubLanguageAlternates(hub.enSlug),
      },
    };
  }

  return {};
}

export default async function SlugPageEs({ params }: Props) {
  const { slug } = await params;

  const page = esPages.find((p) => p.slug === slug);
  if (page) return <PageTemplate page={page} locale="es" />;

  const hub = esHubs.find((h) => h.slug === slug);
  if (hub) {
    return <HubPageTemplate hub={hub} members={hubMembers[hub.enSlug] ?? []} locale="es" />;
  }

  notFound();
}
