Why this exists

Core Web Vitals are not a one-time fix — they drift.

A new hero image. A marketing tag. A third-party script. A framework bump. Any one deploy can quietly push LCP, INP, or CLS back into the red. By the time that regression shows up in Search Console's 28-day field data, the damage is done: you've already lost ranking positions, conversions, and — increasingly — the performance and trust signals that decide whether AI assistants surface your page at all.

CWV Drift Monitor watches for that drift in real time, so you catch it at the source instead of weeks later in a report.

If you care about ranking and being cited in AI search, stable Core Web Vitals aren't optional. This tool keeps them honest.

What it does

Open the extension on any page and instantly see:

Mobile + Desktop performance scores (0–100) — animated score rings pulled directly from Google's PageSpeed Insights infrastructure. No API key required from you.
Live Core Web Vitals — LCP, INP, and CLS tracked passively using the native PerformanceObserver API as you browse, updating in real time.
Top fixes ranked by impact — the highest-priority opportunities from the PageSpeed audit, sorted by estimated time saving, in plain language. No digging through Lighthouse reports.
Toolbar badge — the extension icon updates green/orange/red as you browse, so you always know the status at a glance without opening the popup.
The metrics it tracks
Metric	What it measures	Good threshold
LCP — Largest Contentful Paint	When the main content becomes visible	≤ 2.5s
INP — Interaction to Next Paint	How fast the page reacts to input (replaced FID in 2024)	≤ 200ms
CLS — Cumulative Layout Shift	How much the layout shifts unexpectedly	≤ 0.1
Install

From the Chrome Web Store (recommended — free)

Open the CWV Drift Monitor listing
Click Add to Chrome
Pin the extension and open it on any page

From source (for development)

bash
git clone https://github.com/Bristotle/manuel-technologies.git
cd manuel-technologies

Then in Chrome: chrome://extensions → toggle Developer mode → Load unpacked → select the cwv-monitor/ folder.

Quick start
Navigate to any page you want to audit
Click the CWV icon in your toolbar
Mobile and desktop scores load automatically (takes 8–15 seconds — two full Lighthouse audits run in parallel)
Live CWV metrics (LCP, INP, CLS) update as you scroll and interact
Review the Top Fixes section — each fix shows estimated time savings
How it works
src/content/observer.js — injected into every page, uses PerformanceObserver to watch layout-shift, event, and largest-contentful-paint entries in real time
src/background/service_worker.js — MV3 service worker that receives CWV updates, fires PageSpeed Insights API calls in parallel (mobile + desktop), stores results in chrome.storage.local, and updates the badge
src/popup/ — renders score rings, metric cards with fill bars, and the fixes list; polls storage so it never depends on a long-lived message channel

No data leaves your browser except the page URL sent to the PageSpeed Insights API.

Project structure
cwv-monitor/
├── manifest.json
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── src/
    ├── background/
    │   └── service_worker.js
    ├── content/
    │   └── observer.js
    └── popup/
        ├── popup.html
        ├── popup.css
        └── popup.js
Roadmap
 LCP element highlighting — click to jump to the element causing slow LCP
 Historical drift chart — see how scores change across visits
 Export session data as JSON for client reports
 Per-domain score history across sessions
 Slack / email alert when a score drops below threshold after a deploy

(Have a request? Open an issue.)

Built by

Emmanuel Akyeam — Technical SEO & GEO Specialist, Web Developer, and AI Automation Engineer. I build fast, AI-search-ready websites and help teams keep them that way.

CWV Drift Monitor is one of the tools I built because I live in this problem daily — auditing client sites and needing real-time performance data without spinning up a full Lighthouse profile every time.

🌐 Portfolio: manueltechnologies.com
💼 LinkedIn: Emmanuel Akyeam
📧 Get in touch: emmanuelakyeam@gmail.com
📅 Book a call: calendly.com/emmanuelakyeam/30min

If unstable Core Web Vitals are quietly costing you traffic, that's exactly the kind of thing I fix.

License

Released under the MIT License. © 2026 Emmanuel Akyeam / Manuel Technologies.
