import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | ConcreteBag",
  description: "How ConcreteBag handles data, cookies, and third-party advertising.",
  alternates: { canonical: `${SITE_URL}/privacy/` },
};

const LAST_UPDATED = "July 31, 2026";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy Policy" }]} />
      <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Privacy Policy</h1>
      <p className="mt-1 text-xs text-black/50 dark:text-white/50">Last updated: {LAST_UPDATED}</p>

      <div className="mt-6 space-y-4 text-sm text-black/80 dark:text-white/80">
        <h2 className="text-lg font-semibold text-black dark:text-white">Overview</h2>
        <p>
          ConcreteBag (&quot;we,&quot; &quot;us&quot;) runs entirely in your browser. There is no
          user account system and no backend database — the calculators on this site read and
          process the numbers you enter locally on your device and do not transmit them to us.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">
          Information we collect
        </h2>
        <p>
          We do not require or collect personal information to use the calculators. If you email
          us, we&apos;ll have whatever information you choose to include in that message. We may
          use privacy-focused analytics to understand aggregate traffic (e.g. which pages are
          visited), which does not identify you individually.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">
          Cookies &amp; advertising
        </h2>
        <p>
          This site may show ads served by Google AdSense. Google and its partners may use
          cookies, including the DoubleClick DART cookie, to serve ads based on your visits to
          this and other sites. You can opt out of personalized advertising by visiting{" "}
          <a
            href="https://adssettings.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Google Ads Settings
          </a>{" "}
          or{" "}
          <a
            href="https://www.aboutads.info/choices"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            aboutads.info/choices
          </a>
          . Third-party vendors, including Google, may also use cookies to serve ads based on your
          prior visits to this site or others.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">
          Affiliate links
        </h2>
        <p>
          Material list links to Home Depot and Lowe&apos;s are, or may become, affiliate links.
          Retailers may set their own cookies once you click through to their site; we don&apos;t
          control those cookies and encourage you to review each retailer&apos;s privacy policy.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">
          Your rights (GDPR/CCPA)
        </h2>
        <p>
          Depending on where you live, you may have the right to access, correct, or delete
          personal data we hold about you, and to opt out of the sale or sharing of personal
          information. Since we don&apos;t collect personal data through the calculators
          themselves, there is generally nothing tied to you to access or delete beyond anything
          you&apos;ve emailed us directly.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">
          Children&apos;s privacy
        </h2>
        <p>
          This site is not directed at children under 13, and we do not knowingly collect
          information from children.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">
          Changes to this policy
        </h2>
        <p>
          We may update this policy from time to time. Changes take effect when posted on this
          page, with the &quot;Last updated&quot; date revised accordingly.
        </p>

        <h2 className="pt-2 text-lg font-semibold text-black dark:text-white">Contact</h2>
        <p>
          Questions about this policy?{" "}
          <a href="mailto:privacy@concretebag.com" className="underline underline-offset-4">
            privacy@concretebag.com
          </a>
        </p>
      </div>
    </div>
  );
}
