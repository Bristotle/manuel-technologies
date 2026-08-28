# Manuel Technologies

Agency site. Next.js 15 App Router, Tailwind v4, deployed on Vercel.

**Read this file before writing anything. Every rule here is a decision already made, not a preference.**

---

## 1. Writing rules, non negotiable

### No dashes. En or em.

`–` and `—` are banned from all output: copy, comments, commit messages, everything.

The ordinary hyphen `-` is allowed only inside compound words (`real-time`, `cross-platform`, `full-stack`). Never as punctuation between clauses.

**Replace with, in order of preference:** full stop, colon, comma, brackets. If none work, the sentence was doing too much. Rewrite it.

```bash
# Must return nothing before any commit
grep -rP '[\x{2013}\x{2014}]' src/
```

### British English

`optimise`, `prioritise`, `colour`, `analyse`, `programme`. Exceptions: proper nouns, technical terms of art (`PerformanceObserver`), and CSS (`color`).

### Banned words

"solutions", "cutting-edge", "revolutionary", "game-changing", "seamless", "leverage", "synergy", "digital transformation", "best-in-class".

"Solutions" especially. Say the actual thing.

### Voice

- Lead with the concrete thing, not the company
- Name the mechanism. "Tracked using the native PerformanceObserver API", not "advanced monitoring"
- Let constraints sell. "No API key. No setup."
- Numbers over adjectives
- Sentence case for headings and buttons. `Get a quote`, not `Get A Quote`
- No exclamation marks in body copy
- Serial comma on

---

## 2. Performance budget, enforced

This site sells technical SEO. Its own scores are the product demo.

| Target | Value |
|---|---|
| Lighthouse mobile | **100 / 100 / 100 / 100** |
| LCP | < 1.8s |
| CLS | **0**, not 0.1 |
| INP | < 100ms |
| First load JS, home | **< 100KB** |
| First load JS, any page | < 130KB |

Check `next build` output every time. A jump in first load JS is a bug, not a tradeoff.

### Server components by default

Every file in `src/app/` is a React Server Component. **Do not add `"use client"`** unless the component needs state, effects, or event handlers.

Push the boundary as deep as possible. If a section contains one interactive button, the button is the client component, not the section.

Client components allowed: mobile menu toggle, accordion, contact form. That is close to the full list.

### Motion, three tiers. Reach for tier 1 first.

**Tier 1, CSS scroll-driven animation. 0KB.** Already built in `globals.css`.
Use `mt-reveal`, `mt-reveal-group`, `mt-reveal-display`, `mt-scroll-progress`,
`mt-lift`, `mt-underline`. Runs on the compositor, no `"use client"`, no bundle
cost. This covers most cases.

**Tier 2, IntersectionObserver.** About 15 lines, roughly 1KB, one shared client
component. For counters, fire-once sequences, anything CSS cannot express.

**Tier 3, Framer Motion (`motion`). Last resort.** Roughly 34KB standard, or
15KB via `LazyMotion` with `domAnimation`. Your remaining budget after the
Next.js baseline is about 20KB, so this is expensive. Only for genuine
choreography: shared element transitions, drag, gesture, physics.

**Rules that apply to all three:**

- Animate `transform` and `opacity` only. Never width, height, top, left or
  margin. Those trigger layout and cost CLS
- **Never put an animation library in the shared layout.** Confine to one route
- Everything respects `prefers-reduced-motion`, already handled globally
- Re-run `next build` after adding motion. A jump in first load JS is a bug
- One `mt-reveal-display` per page maximum. If everything arrives dramatically,
  nothing does
- Marquees stay `@keyframes` translateX on a duplicated track
- Layer stacking stays `z-index` and negative margins

Full reasoning in `MOTION.md`.

### Images

```js
// next.config.js
images: { formats: ['image/avif', 'image/webp'] }
```

**Images are required, not tolerated.** An earlier reading of this file treated
the budget below as a reason to ship no images at all. That was wrong and it
cost the site its credibility. See section 4, "Show the work". The budget exists
to keep images cheap, not to keep them out.

A correctly configured `next/image` in AVIF, sized properly, with `priority` on
the LCP element, holds 100 on mobile. Vercel converts at the edge. There is no
conflict between the performance target and a visually rich page. Any claim that
there is means the images were built carelessly.

- **Never** a raw `<img>`. Always `next/image`
- **Always** explicit `width` and `height`. This is the main CLS cause
- `priority` on exactly one image per page, the LCP element
- Get `sizes` right, or you serve a 1920px image to a 360px phone
- Budgets: hero 100KB, in-content 40KB, page total 300KB
- Screenshots go in `/public/work/` as `.webp`, captured at 2x then downscaled
- Logos and icons are **inline SVG**, never image files
- Third party company logos are never reproduced without written permission.
  Client and integration names are set as type. See `ClientMarquee.tsx`

### Fonts

`next/font`, self hosted, `display: swap`. No Google Fonts network request.

---

## 3. Brand

```css
--mt-purple:       #6B2FD9;  /* primary */
--mt-purple-light: #8B52E8;  /* gradient partner, dark mode text */
--mt-ink:          #1A1033;  /* headings, body. deep violet, not black */
--mt-slate:        #3D3560;  /* secondary text */
--mt-muted:        #7B72A0;  /* labels, captions. 18px+ only */
--mt-border:       #E4DDF7;
--mt-surface:      #F5F2FC;
--mt-white:        #FFFFFF;
```

`#7B72A0` is 4.1:1 on white. Large text only, never below 18px.

**Do not add colours.** The green, orange and red from CWV Drift Monitor are Google Lighthouse's status palette and stay out of the agency identity. Product UI and charts only.

### Logo

MT monogram, inline SVG only:

```jsx
<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="6.5"
     strokeLinecap="round" strokeLinejoin="round">
  <path d="M8 14 H56"/><path d="M32 14 V52"/>
  <path d="M8 52 V24 L32 44"/><path d="M56 52 V24 L32 44"/>
</svg>
```

Never stretch, rotate, outline, shadow, or gradient the strokes.

### Tagline

`Build. Grow. Scale.` Full stops, never commas. Never reordered.

Set in mono, uppercase, 0.22em tracking.

### Typeface

**PENDING.** Placeholder is the system stack. When chosen, it goes in `src/app/layout.tsx` via `next/font` and nowhere else.

---

## 4. Design craft

Technical correctness is not design. A page can score 100 across and still look cheap. These rules are what separate the two.

### Show the work. Do not describe it.

**This is the first rule of the section, because breaking it is what made the
first build fail.** Two senior engineers reviewed the site and both said the
same thing: it looks raw and will not convert. They were right. Four screens
deep there was not one image, screenshot, diagram or product visual. A firm
selling sophisticated software cannot prove it with well set text.

A prospect cannot evaluate code. They evaluate what they can see. So:

**Every page must contain at least one piece of visual evidence.** Not
decoration, evidence. A screenshot of a thing that was built, a diagram of a
system that runs, or live interactive software on the page.

| Page type | Required visual evidence |
|---|---|
| Home | Product visual in the hero, real work screenshots in Selected work, one live tool |
| Pillar hub | A schematic of how that pillar's work is delivered |
| Service page | A screenshot or diagram of that exact service delivered for a real client |
| Work index | A screenshot per project. No text only cards |
| Case study | Before and after, the interface, the result |
| Free tools | The tool itself, above the fold, working |

**The strongest asset is the software that already exists.** The eight tax
calculators, the caregiver matching platform, the Chrome extension UI, the
1,000 product catalogue. All of it is real and none of it was shown. Show it.

**Live beats static.** A working tool on the page outperforms any screenshot,
because the prospect experiences the competence rather than reading a claim
about it. The three tools at `/free-tools` are the best proof on the site and
they belong on the homepage, running.

**"Whitespace is the budget" does not mean an empty page.** Generous space
around substance reads confident. Generous space around nothing reads unfinished.
If a viewport contains only text, it is not done.

### The visual language

Taken from REF-002, adapted to the locked palette. Five patterns, all pure CSS.
They are the frame around the evidence, never a substitute for it.

**Type as architecture.** Display type is structure, not decoration. Headlines run large, tight and deliberately clipped by their container. `overflow: hidden` on the section, let the type overflow on purpose. The homepage H1 is the tagline stacked on three lines, and that is the model.

**Layer stacking, depth without shadows.** Elements overlap using `z-index` and negative margins. An image or card breaks out of its section and sits in front of the type behind it. **No `box-shadow` anywhere.** Shadows are how amateur sites fake depth. Real depth comes from overlap and scale.

**Bracket syntax.** Small labels are wrapped: `( TECHNICAL SEO )`, `( BUILD )`, `+ ( MENU )`. Monospace, uppercase, 0.18em tracking, purple. This runs through nav, section labels, marquees and side rails. It is the single cheapest thing that makes the site look designed rather than assembled.

**Marquees.** Horizontal scrolling rails of bracket labels. `@keyframes` translateX on a duplicated track, translate exactly `-50%`. Motion without video, weight without images.

**Connector lines.** Thin 1px rules running off canvas into pill shaped labels. Reads as a technical schematic. Strong for service grids and process sections.

### Spacing, and this is where most sites fail

**8px base unit.** Every margin, padding and gap is a multiple of 8. No 13px, no 27px. If a value is not on the scale, it is wrong.

```
4  8  12  16  24  32  48  64  96  128  160
```

**Section rhythm.** Vertical space between major sections is `96px` mobile, `128px` desktop. Consistent, never eyeballed. Use `--spacing-section` and `--spacing-section-lg`.

**Whitespace is the budget.** When a section feels wrong, the answer is almost always more space, not more content. Cramped is the single most common tell of an amateur build.

### Typography

**Line length caps at 65 characters.** Wider than that and reading breaks down. Use `max-w-[65ch]` on body copy, never full container width.

**Three sizes per page, maximum.** Display, body, label. A page with six type sizes has no hierarchy.

**Tracking scales inversely with size.** Big type gets tight tracking, `-0.035em`. Small mono labels get wide tracking, `0.18em`. Body stays at 0. Already set in `globals.css`.

**Line height scales inversely too.** Display `0.92` to `1.02`. Body `1.7`. Never use one value everywhere.

### Layout

- Content container `max-w-5xl`, roughly 1024px. Prose containers `max-w-[680px]`
- **Break the container deliberately, not accidentally.** Marquees and display type run full bleed. Everything else stays in
- Asymmetry beats centring. A left aligned hero with generous right hand space reads more confident than a centred one
- Grids: 3 columns desktop, 1 mobile. Skip the 2 column tablet step unless it genuinely helps

### Colour discipline

**One accent, used sparingly.** Purple is for the mark, links, one word in a headline, and primary buttons. That is the list.

The moment purple appears in five places in one viewport it stops meaning anything. Restraint is what made the CWV extension look expensive, and it is why the palette is only three working colours plus tints.

Backgrounds: `--mt-surface` for the page, white for cards. That two tone relationship carries the whole site. **Do not introduce a third background.**

### Borders and radius

- Borders are `1px solid var(--color-mt-border)`. Never heavier
- Cards `--radius-card`, inputs and buttons `--radius-input`, pills `--radius-pill`
- **Never mix radii within one component.** A card with an 18px outer radius does not contain a 4px inner one

### Interactive states

Every interactive element needs all four, and missing states are the most common design bug:

1. Default
2. Hover, colour shift only, no movement, no scale
3. Focus visible, 2px purple outline at 3px offset. Already in `globals.css`. Never remove it
4. Active or pressed

Transitions are `150ms` on colour only. Never transition layout properties, they cost frames and CLS.

### Motion

Subtle, purposeful, cheap. Fade and small translate, 300ms, ease-out. Nothing bounces, nothing spins, nothing parallaxes.

Every animation wrapped in `@media (prefers-reduced-motion: reduce)`. Non negotiable, it is both an accessibility requirement and a Lighthouse item.

### Mobile

**Design at 360px first**, not 375. A large share of the addressable market is on mid range Android.

- Tap targets 44 x 44px minimum, 8px apart
- Body text never below 16px
- Display type via `clamp()` or it destroys small screens
- Test at 320px too. Zero horizontal scroll at any width
- Reduce section spacing on mobile, do not just scale it. 96px not 128px

### Accessibility, treated as design

- Text contrast 4.5:1 minimum. `--mt-muted` is 4.1:1, so **18px and above only**
- Never colour alone to convey meaning
- Real semantic elements. `<button>` for actions, `<a>` for navigation, never a clickable `<div>`
- Every image gets meaningful `alt`, or `alt=""` if decorative
- Heading levels never skip

### The test

Before shipping a section, ask:

1. **Is there visual evidence in this viewport, or only text.** If only text, it
   is not finished
2. Is every spacing value on the 8px scale
3. Is there exactly one accent colour use in this viewport
4. Is body copy under 65 characters per line
5. Does it survive 360px
6. Are all four interactive states present
7. Is there a `box-shadow` anywhere. If yes, remove it

Question 1 is first because it is the one that was failed repeatedly. A section
can pass all six of the others and still be worthless.

---

## 5. Structure

```
/                              Home
/build                         Pillar hub
  /build/website-development
  /build/web-design
  /build/custom-software
  /build/mobile-apps
  /build/systems-integrations
/grow                          Pillar hub
  /grow/technical-seo
  /grow/programmatic-seo
  /grow/on-page-seo
  /grow/link-building
  /grow/geo
  /grow/content-branding
  /grow/social-media
  /grow/paid-ads
/scale                         Pillar hub
  /scale/ai-automations
  /scale/ai-agents
  /scale/analytics
/work                          Case study index
/work/[slug]
/about
/contact
/cwv-drift-monitor/privacy-policy
```

The tagline is the navigation. Build, Grow, Scale are the three top level routes.

### Audience per page

Headline stays broad, depth goes technical. **These five are written for a technical buyer:**

`/build/systems-integrations`, `/build/custom-software`, `/grow/technical-seo`, `/grow/programmatic-seo`, `/scale/ai-agents`

They carry security posture, integration detail, architecture, and the production grade code claim.

Every other page is written for a business owner. Plain, concrete, no jargon.

---

## 6. SEO, non negotiable

- One `h1` per page
- `Organization` JSON-LD in root layout. **Not `AutomationCompany`, that is not a real schema.org type**
- `Service` schema on service pages, `BreadcrumbList` on nested pages
- Generated `sitemap.xml` and `robots.txt`
- Self referencing canonical on every page
- OG image per route via `next/og`
- Meta descriptions hand written, never templated

### The apex is canonical. This is load bearing.

`SITE.url` is `https://manueltechnologies.com`, no `www`. Canonical tags, sitemap
URLs, JSON-LD and OG URLs all use the apex. In Vercel, the apex is the Production
domain and `www` is a 308 redirect to it.

**This cost a week of indexing once. Do not reintroduce it.** The original setup
had it backwards: `www` served Production, the apex 308'd to `www`, and every
page still declared the apex as canonical. Google Search Console reported
`Page is not indexed: Page with redirect`, with Google-selected canonical `www`
against a user-declared canonical of the apex. Crawl succeeded, fetch succeeded,
indexing was allowed, and Google still refused, because the two signals
contradicted each other. Zero of 44 pages indexed.

Any change to `SITE.url`, to Vercel's domain settings, or to the sitemap must
keep all four in agreement: served domain, canonical tag, sitemap `loc`, and
redirect direction.

### Programmatic pages, when they come

**Three unique sentences minimum or do not generate the page.** Differentiate on data, never adjectives. Split sitemaps above 5,000 URLs. ISR or SSG only, never SSR.

---

## 7. Content

Case studies and blog posts are **MDX files in the repo**. No CMS, no database, no auth. If a task seems to need one, it does not.

### Portfolio boundary, important

Only engagements where **Manuel Technologies was the vendor** appear under `/work`: CWV Drift Monitor, Impressiful, Cangaf, Miyaki Beauty, Dementia In Home, BOT Properties.

Higglo Digital, SkillCEF and ChainYacc were **staff roles**. They appear on `/about` as personal experience, attributed to Emmanuel, never as company work.

**Never name the current employer anywhere.** Copy says "a US digital agency".

---

## 8. Forms and email

Contact form posts to `/api/contact`, which sends via Resend:

| Field | Value | Why |
|---|---|---|
| `from` | `noreply@send.manueltechnologies.com` | The **subdomain** is what Resend verified |
| `to` | `emmanuelakyeam@gmail.com` (`CONTACT_RECIPIENT`) | Every enquiry lands in Emmanuel's inbox directly |
| `replyTo` | The enquirer's address | Hitting reply answers the prospect, not the robot |

**`CONTACT_RECIPIENT` is server side only and must never render in the UI.** The
address shown to visitors is `SITE.email`, the business address. A personal
Gmail on a contact page undercuts everything else on the site.

**Every enquiry CTA points at `/contact`, never `mailto:`.** A `mailto:` link
depends on the paid mailbox staying active and on the visitor having a mail
client configured. The form does not, and it delivers to Gmail either way.

`mailto:` is allowed in exactly one situation: where the visible link text *is*
the address, as a courtesy for people who prefer their own mail client. That
covers the footer, the contact page, and the CWV privacy policy, where a direct
address is legally expected. Any link whose label is a call to action, such as
"Start a conversation" or "Get in touch", goes to `/contact`.

### Why sending is on a subdomain

Resend verifies `send.manueltechnologies.com`, not the root. The root already
carries the SPF record for Namecheap Private Email, and a domain may only have
one SPF record. Verifying the root would have meant editing that record, and
getting it wrong kills `info@manueltechnologies.com` silently, with no error.

**Never add a second SPF record to the root. Never change nameservers to Vercel**,
which would move the MX records and take email down.

Qualification, deliberate:

- Business email required. Block gmail, yahoo, outlook, hotmail, icloud
- Budget range field
- Company website field

No secrets in the repo. `RESEND_API_KEY` and `RESEND_FROM_EMAIL` live in Vercel
env vars. **Never paste an API key into chat, a file, or a commit.** Code reads
them from `process.env`, so the value is never needed in conversation.

---

## 9. Working from references

Emmanuel sends reference sites section by section. Every one is logged in
`MT Agency/00-intake/references/REFERENCE-LOG.md` and influences the build from
then on **by default, without being named again.**

### What transfers and what does not

**Take:** layout logic, spacing rhythm, hierarchy, what a section is *for*,
interaction pattern, the kind of visual evidence used, density.

**Never take:** colour, typeface, imagery, or sentences. Palette is locked.
Copy lifted close enough to be recognisable is plagiarism, and a prospect who
spots it stops trusting everything else.

**Never take a factual claim.** REF-007 (Serval) claimed a client list including
Fox, Notion, Perplexity, Vercel and Brex. None of that is true of Manuel
Technologies. The register was taken; every claim was rejected. Do this every
time. Borrowing another firm's proof is the fastest way to lose a deal, and it
is dishonest.

### The failure mode to defend against

Twenty sites borrowed section by section produces a site that looks like twenty
sites. It fails slowly, so nobody notices until it is finished and incoherent.

The defence is that the design system is decided first and every reference is
filtered through it. A reference changes **what a section does**, never what the
site looks like. If a reference is good enough to change the system itself, that
is a real option, decided deliberately and applied everywhere at once.

### Push back on

- Anything needing a heavy JS library where CSS gets 90% of it
- Carousels. Bad for CWV, usually bad for conversion. Scroll snap does it free
- Patterns that break at 360px
- Anything pushing a page past its image budget

None of these are refusals. They are trade offs to show Emmanuel so he decides.

---

## 10. Pre commit checklist

1. **Every page touched carries visual evidence, not just text.** Section 4
2. `next build`, first load JS within budget
3. Lighthouse mobile throttled, four 100s
4. `grep -rP '[\x{2013}\x{2014}]' src/` returns nothing
5. No new `"use client"` without a reason
6. Every image has explicit width and height, correct `sizes`, meaningful `alt`
7. 320px and 360px, no horizontal scroll
8. One `h1`, canonical present and pointing at the **apex**, schema valid
9. British spelling, no banned words
10. Spacing on the 8px scale, no `box-shadow`, one accent use per viewport
11. All four interactive states present, focus ring intact
12. No `mailto:` CTAs outside the contact page and privacy policy
13. No API keys or secrets anywhere in the diff
