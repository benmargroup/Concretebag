"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { hubs } from "@data/pages";
import { footerHubs } from "@data/linkmap";
import { esHubs } from "@/lib/i18n/esPages";
import { es } from "@/lib/i18n/es";

const hubsBySlug = new Map(hubs.map((h) => [h.slug, h]));
const esHubsByEnSlug = new Map(esHubs.map((h) => [h.enSlug, h]));

export default function Footer() {
  const pathname = usePathname();
  const isEs = pathname.startsWith("/es");

  const enLinks = footerHubs
    .map((slug) => hubsBySlug.get(slug))
    .filter((h): h is NonNullable<typeof h> => Boolean(h));
  const esLinks = footerHubs
    .map((slug) => esHubsByEnSlug.get(slug))
    .filter((h): h is NonNullable<typeof h> => Boolean(h));

  return (
    <footer className="border-t border-black/10">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <nav aria-label="Calculator categories">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {isEs
              ? esLinks.map((hub) => (
                  <li key={hub.slug}>
                    <Link href={`/es/${hub.slug}`} className="hover:underline underline-offset-4">
                      {hub.h1}
                    </Link>
                  </li>
                ))
              : enLinks.map((hub) => (
                  <li key={hub.slug}>
                    <Link href={`/${hub.slug}`} className="hover:underline underline-offset-4">
                      {hub.h1}
                    </Link>
                  </li>
                ))}
          </ul>
        </nav>
        <nav aria-label="Legal" className="mt-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-black/60 dark:text-white/60">
            <li>
              <Link href="/about" className="hover:underline underline-offset-4">
                {isEs ? es.footer.about : "About"}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline underline-offset-4">
                {isEs ? es.footer.privacy : "Privacy Policy"}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline underline-offset-4">
                {isEs ? es.footer.terms : "Terms of Service"}
              </Link>
            </li>
          </ul>
        </nav>
        <p className="mt-6 text-sm text-black/60 dark:text-white/60">
          &copy; {new Date().getFullYear()} ConcreteBag. {isEs ? es.footer.rights : "All rights reserved."}
        </p>
      </div>
    </footer>
  );
}
