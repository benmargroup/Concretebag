import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About ConcreteBag",
  description:
    "ConcreteBag builds free, instant bag-count calculators for concrete slabs, footings, sonotubes, and fence posts.",
  alternates: { canonical: `${SITE_URL}/about/` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
      <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">About ConcreteBag</h1>

      <div className="mt-6 space-y-4 text-sm text-black/80 dark:text-white/80">
        <p>
          ConcreteBag is a free set of calculators for figuring out how many bags of concrete you
          need for a slab, footing, sonotube, or fence post — and roughly what it will cost. Enter
          your dimensions, and the bag count and price update instantly, right in your browser.
        </p>
        <p>
          Every calculator uses the same math: convert your dimensions to cubic feet, add a 10%
          buffer for waste and an uneven subgrade, then divide by the bag&apos;s published yield
          and round up to the next full bag. Reference pages (bags per yard, bags per pallet, and
          so on) use the same yields without the waste buffer, since those are fixed conversions
          rather than project estimates.
        </p>
        <p>
          Figures on this site are estimates for planning purposes only. Actual coverage varies by
          brand, mix, subgrade, and how carefully concrete is placed and finished. For structural
          work — footings, foundations, load-bearing posts — check your local building code and
          talk to a licensed contractor or engineer before you pour.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">
          Affiliate disclosure
        </h2>
        <p>
          Material list links point to Home Depot and Lowe&apos;s product search results.
          ConcreteBag may participate in affiliate programs with these and other retailers; if you
          click through and make a purchase, we may earn a commission at no extra cost to you.
          This doesn&apos;t affect the bag counts or math shown on the site.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">Contact</h2>
        <p>
          Questions or corrections?{" "}
          <a href="mailto:hello@concretebag.com" className="underline underline-offset-4">
            hello@concretebag.com
          </a>
        </p>
      </div>
    </div>
  );
}
