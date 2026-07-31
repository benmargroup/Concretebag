import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | ConcreteBag",
  description: "The terms that govern use of the ConcreteBag calculators.",
  alternates: { canonical: `${SITE_URL}/terms/` },
};

const LAST_UPDATED = "July 31, 2026";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms of Service" }]} />
      <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Terms of Service</h1>
      <p className="mt-1 text-xs text-black/50 dark:text-white/50">Last updated: {LAST_UPDATED}</p>

      <div className="mt-6 space-y-4 text-sm text-black/80 dark:text-white/80">
        <p>
          By using ConcreteBag (&quot;the site&quot;), you agree to these terms. If you don&apos;t
          agree, please don&apos;t use the site.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">
          Estimates only — no warranty
        </h2>
        <p>
          Bag counts, costs, and cubic-footage figures on this site are estimates for planning
          purposes only. They are based on published bag yields, a standard 10% waste allowance,
          and pricing that may not reflect current prices in your area. We make no warranty,
          express or implied, that any figure is accurate, complete, or suitable for your
          project. The site and its content are provided &quot;as is,&quot; without warranty of
          any kind.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">
          Not professional advice
        </h2>
        <p>
          Nothing on this site is engineering, structural, or professional construction advice.
          For footings, foundations, load-bearing posts, or any structural work, consult your
          local building code and a licensed contractor or engineer before you build or pour.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">
          Limitation of liability
        </h2>
        <p>
          To the fullest extent permitted by law, ConcreteBag and its operators are not liable
          for any direct, indirect, incidental, or consequential damages arising from your use of,
          or reliance on, this site or its calculators — including under-ordering, over-ordering,
          or project cost overruns.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">
          Third-party links
        </h2>
        <p>
          Links to Home Depot, Lowe&apos;s, or other retailers take you to third-party sites we
          don&apos;t control. We&apos;re not responsible for their content, pricing, availability,
          or policies. Some of these links may be affiliate links — see our{" "}
          <Link href="/about" className="underline underline-offset-4">
            About page
          </Link>{" "}
          for details.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">
          Changes to these terms
        </h2>
        <p>
          We may update these terms from time to time. Continued use of the site after a change
          means you accept the updated terms.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">Contact</h2>
        <p>
          Questions about these terms?{" "}
          <a href="mailto:hello@concretebag.com" className="underline underline-offset-4">
            hello@concretebag.com
          </a>
        </p>
      </div>
    </div>
  );
}
