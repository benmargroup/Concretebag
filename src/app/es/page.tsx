import type { Metadata } from "next";
import Link from "next/link";
import { hubMembers } from "@data/linkmap";
import { esHubs, esPages } from "@/lib/i18n/esPages";
import { es } from "@/lib/i18n/es";
import JsonLd from "@/components/JsonLd";
import { webApplicationSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { homeLanguageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${es.homePage.title} | ConcreteBag`,
  description: es.homePage.intro,
  alternates: { canonical: `${SITE_URL}/es/`, languages: homeLanguageAlternates },
};

const esPagesByEnSlug = new Map(esPages.map((p) => [p.enSlug, p]));

export default function HomeEs() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <JsonLd
        data={webApplicationSchema({
          name: `ConcreteBag — ${es.homePage.title}`,
          description: es.homePage.intro,
          url: `${SITE_URL}/es/`,
        })}
      />

      <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">{es.homePage.title}</h1>
      <p className="mt-3 max-w-2xl text-sm text-black/70 sm:text-base dark:text-white/70">
        {es.homePage.intro}
      </p>

      <div className="mt-10 space-y-10">
        {esHubs.map((hub) => {
          const members = (hubMembers[hub.enSlug] ?? [])
            .map((slug) => esPagesByEnSlug.get(slug))
            .filter((p): p is NonNullable<typeof p> => Boolean(p));

          return (
            <section key={hub.slug}>
              <h2 className="text-lg font-semibold">
                <Link
                  href={`/es/${hub.slug}`}
                  className="underline underline-offset-4 hover:no-underline"
                >
                  {hub.h1}
                </Link>
              </h2>
              <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
                {members.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/es/${page.slug}`}
                      className="text-black/70 underline underline-offset-4 hover:text-black hover:no-underline dark:text-white/70 dark:hover:text-white"
                    >
                      {page.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
