"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ROUTE_SLUG_FROM_ES, ROUTE_SLUG_TO_ES } from "@/lib/i18n/slugMap";

function currentSlug(pathname: string, isEs: boolean): string {
  const stripped = isEs ? pathname.replace(/^\/es/, "") : pathname;
  return stripped.replace(/^\/|\/$/g, "");
}

export default function Header() {
  const pathname = usePathname();
  const isEs = pathname.startsWith("/es");
  const slug = currentSlug(pathname, isEs);

  const enHref = isEs ? `/${ROUTE_SLUG_FROM_ES[slug] ?? ""}` : pathname;
  const esHref = isEs ? pathname : `/es/${ROUTE_SLUG_TO_ES[slug] ?? ""}`;

  // Static export can't vary the root <html lang> per route server-side, so
  // sync it client-side. The server-rendered value stays "en" for pre-hydration.
  useEffect(() => {
    document.documentElement.lang = isEs ? "es" : "en";
  }, [isEs]);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link
          href={isEs ? "/es" : "/"}
          className="text-base font-semibold tracking-tight sm:text-lg"
        >
          ConcreteBag
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-4 text-sm sm:gap-6">
              <li>
                <Link href={isEs ? "/es" : "/"} className="hover:underline underline-offset-4">
                  {isEs ? "Inicio" : "Home"}
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Language" className="flex items-center gap-1 text-sm font-medium">
            <Link
              href={enHref}
              aria-current={!isEs ? "true" : undefined}
              className={!isEs ? "underline underline-offset-4" : "text-black/50 hover:underline underline-offset-4 dark:text-white/50"}
            >
              EN
            </Link>
            <span aria-hidden="true" className="text-black/30 dark:text-white/30">
              |
            </span>
            <Link
              href={esHref}
              aria-current={isEs ? "true" : undefined}
              className={isEs ? "underline underline-offset-4" : "text-black/50 hover:underline underline-offset-4 dark:text-white/50"}
            >
              ES
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
