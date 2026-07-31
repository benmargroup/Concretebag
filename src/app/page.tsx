import type { Metadata } from "next";
import Link from "next/link";
import { pages, hubs } from "@data/pages";
import { hubMembers } from "@data/linkmap";
import JsonLd from "@/components/JsonLd";
import { webApplicationSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { homeLanguageAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/`, languages: homeLanguageAlternates },
};

const pagesBySlug = new Map(pages.map((p) => [p.slug, p]));

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <JsonLd
        data={webApplicationSchema({
          name: "ConcreteBag — Concrete Bag Calculators",
          description:
            "Exact bag counts and costs for concrete slabs, footings, sonotubes, and more.",
          url: `${SITE_URL}/`,
        })}
      />

      <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
        Concrete Bag Calculators
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-black/70 sm:text-base dark:text-white/70">
        Exact bag counts and costs for slabs, footings, sonotubes, and more. Pick a category or
        jump straight to your size below.
      </p>

      <div className="mt-10 space-y-10">
        {hubs.map((hub) => {
          const members = (hubMembers[hub.slug] ?? [])
            .map((slug) => pagesBySlug.get(slug))
            .filter((p): p is NonNullable<typeof p> => Boolean(p));

          return (
            <section key={hub.slug}>
              <h2 className="text-lg font-semibold">
                <Link href={`/${hub.slug}`} className="underline underline-offset-4 hover:no-underline">
                  {hub.h1}
                </Link>
              </h2>
              <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
                {members.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/${page.slug}`}
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
