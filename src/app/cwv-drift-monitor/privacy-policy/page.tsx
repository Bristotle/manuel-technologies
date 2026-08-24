import type { Metadata } from "next";
import { Logo } from "@/components/Logo";

/* SHIP 1. The urgent one.
   The live Chrome Web Store listing points at this exact URL. Google requires
   it publicly accessible for as long as the extension is published. */

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "Privacy policy for the CWV Drift Monitor Chrome extension by Manuel Technologies. No personal data collected, no tracking, no accounts.",
  alternates: { canonical: "/cwv-drift-monitor/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-dvh bg-white text-mt-ink">
      <article className="mx-auto max-w-[680px] px-6 py-16 sm:py-20">
        <header className="mb-12 flex items-center gap-3">
          <Logo className="h-8 w-8 text-mt-purple" />
          <span className="text-sm text-mt-muted">Manuel Technologies</span>
        </header>

        <h1 className="!text-[1.75rem] !leading-tight sm:!text-[2rem]">
          Privacy policy
        </h1>
        <p className="mt-2 text-sm text-mt-muted">Last updated: July 2026</p>

        <div className="my-8 rounded-r-[10px] border-l-[3px] border-mt-purple bg-mt-surface px-5 py-4 text-[0.9375rem]">
          CWV Drift Monitor collects no personal data and stores nothing outside
          your own browser. It makes exactly one external request, to Google&rsquo;s
          PageSpeed service, and only when you open the popup.
        </div>

        <Section title="What we collect">
          <p>
            Nothing. CWV Drift Monitor does not collect, transmit, store, or
            share any personal information, browsing history, or user data of any
            kind. There is no account, no signup, and no analytics.
          </p>
        </Section>

        <Section title="How the extension works">
          <p>The extension operates within your browser using native browser APIs:</p>
          <ul>
            <li>
              The <strong>PerformanceObserver API</strong> measures layout shift
              (CLS), interaction latency (INP), and largest contentful paint (LCP)
              on pages you visit.
            </li>
            <li>
              Metric readings are stored temporarily in{" "}
              <strong>chrome.storage.local</strong>, a sandboxed local storage
              area accessible only to this extension, on your device.
            </li>
            <li>
              Stored metric data is cleared automatically when you close a tab or
              navigate away.
            </li>
          </ul>
        </Section>

        <Section title="The one external request">
          <p>
            When you open the extension popup, CWV Drift Monitor requests mobile
            and desktop performance scores from Google&rsquo;s PageSpeed service at{" "}
            <strong>pagespeed.web.dev</strong>. This is the only network request
            the extension makes, and it is triggered by you opening the popup,
            never in the background.
          </p>
          <p>
            That request contains the URL of the page you are currently viewing,
            because a performance score cannot be produced without it. It contains
            no identifier for you, your browser, or your device. Google&rsquo;s
            handling of that request is governed by{" "}
            <a
              href="https://policies.google.com/privacy"
              className="text-mt-purple hover:underline"
            >
              Google&rsquo;s privacy policy
            </a>
            .
          </p>
          <p>If you do not open the popup, no external request is made.</p>
        </Section>

        <Section title="Permissions used">
          <ul>
            <li>
              <strong>activeTab.</strong> Reads performance metrics from the page
              you are currently viewing, and retrieves its URL for the score
              request.
            </li>
            <li>
              <strong>scripting.</strong> Injects the PerformanceObserver content
              script into the active tab.
            </li>
            <li>
              <strong>storage.</strong> Temporarily caches metric readings and
              scores so the popup displays instantly on open. All data is local to
              your device.
            </li>
            <li>
              <strong>host_permissions for pagespeed.web.dev.</strong> Allows the
              score request described above. No other hosts are requested.
            </li>
          </ul>
          <p>
            These are the minimum permissions required for the extension to
            function.
          </p>
        </Section>

        <Section title="Third-party services">
          <p>
            Beyond the PageSpeed score request described above, CWV Drift Monitor
            makes no requests to any third-party service. There are no analytics
            platforms, no CDN dependencies, no remote code, no telemetry, and no
            advertising integrations.
          </p>
        </Section>

        <Section title="Data retention">
          <p>
            Metric data in chrome.storage.local is scoped to individual browser
            tabs and removed automatically when a tab is closed or navigated away
            from. No data persists between browser sessions.
          </p>
        </Section>

        <Section title="Children&rsquo;s privacy">
          <p>
            This extension is a developer tool and is not directed at children. It
            does not knowingly collect information from anyone under the age of 13.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If this policy changes, the updated version will be published at this
            URL with a revised date at the top.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about this policy can be directed to:
            <br />
            <a
              href="mailto:info@manueltechnologies.com"
              className="text-mt-purple hover:underline"
            >
              info@manueltechnologies.com
            </a>
            <br />
            Manuel Technologies
          </p>
        </Section>

        <footer className="mt-14 border-t border-mt-border pt-5 text-xs text-mt-muted">
          &copy; 2026 Manuel Technologies. CWV Drift Monitor is an independent
          tool and is not affiliated with Google.
        </footer>
      </article>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="[&_p]:mb-4 [&_p]:text-mt-slate [&_li]:mb-1.5 [&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:text-mt-slate">
      <h2 className="mb-2.5 mt-9 border-b border-mt-border pb-2 !text-[1.0625rem] font-bold !tracking-normal">
        {title}
      </h2>
      {children}
    </section>
  );
}
