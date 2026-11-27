# Content programme

Started 25 November 2026. Goal: quality enquiries for the agency in 2027.

Every day, two services get one article each on manueltechnologies.com. Each article then becomes social posts, and the URLs are submitted for indexing the same day. In 8 working days every one of the 16 services has a new article, and the cycle starts again.

## Rules for every article

1. **Answer first.** The first paragraph answers the question in the title. AI Overviews and ChatGPT quote that paragraph, so it must stand on its own.
2. **Name a winner per situation.** A comparison that ends on "it depends" teaches nothing. Say which option wins, and for whom.
3. **Facts from the vendor's own page.** Every claim about a tool, platform or law links its source. No rates or audience sizes that go stale.
4. **Our own work as evidence.** At least one screenshot or diagram of something we built or run. Only real work from `/work` or our own products.
5. **Ends on the WhatsApp button.** This is automatic: `PostCta` closes every post with WhatsApp (pre-filled with the article title) and "Get a quote".
6. **House style.** British spelling, no dashes as punctuation, no banned words, serial comma. See CLAUDE.md.

## Formats that win AI answers

| Format | Example title | Why it works |
|---|---|---|
| X vs Y | Flutter vs React Native vs a PWA | Matches how people ask AI to compare |
| Which first | Google Ads vs Meta ads: which first? | Answers a decision, which attracts buyers |
| Cost | How much does a mobile app cost in Ghana? | Highest buying intent of any query |
| Best for | Best CMS for a Ghanaian business website | Cited in "best of" AI answers |
| How to choose | How to choose an SEO agency | Read at the shortlisting stage |
| Signs you need | 5 signs your business needs custom software | Catches people before they start shopping |

## The rotation, cycle 1

| Day | Service | Article | Service | Article |
|---|---|---|---|---|
| 1 ✅ | Mobile apps | Flutter vs React Native vs a PWA | Paid ads | Google Ads vs Meta ads: which first? |
| 2 ✅ | Website development | WordPress vs Webflow vs a custom build | Social media | Instagram vs TikTok vs LinkedIn for a business in Ghana |
| 3 ✅ | Custom software | Spreadsheet vs custom software: when to switch | Link building | Guest posts vs digital PR vs directories |
| 4 | Systems and integrations | Zapier vs Make vs a custom integration | Content and branding | Logo vs brand identity: what you actually need |
| 5 | Web design | Template vs custom design | Technical SEO | Shopify vs WooCommerce for SEO |
| 6 | AI agents | ChatGPT vs a custom AI assistant for your business | Analytics | Google Analytics vs Looker Studio vs a custom dashboard |
| 7 | AI automations | WhatsApp chatbot vs a human: what to automate | GEO | SEO vs GEO: what changes when AI answers first |
| 8 | On-page SEO | Blog post vs service page: which ranks for what | Programmatic SEO | Programmatic SEO vs hand written pages |

Cycle 2 repeats the services with the cost and "best for" formats, such as "How much does a mobile app cost in Ghana?"

## The daily routine

1. **Write** the two articles in `src/lib/blog-services-cluster.ts`. Add a diagram in `blog-visuals.ts` where the article has no screenshot.
   - **Hero photo:** a free Unsplash photo of real people, ideally African, at `public/blog/<slug>.webp`. 1200 by 750, under 100KB. Caption it "Photo by <name> on Unsplash", linked to the photo page. Never describe a stock photo as our work, and never name a place the photo was not taken.
2. **Check:** `next build`, the dash grep, and `node scripts/optimise-images.mjs --check`.
3. **Publish:** commit and push to main. Vercel deploys.
4. **Submit for indexing:**
   - Bing and ChatGPT search: `npm run indexnow -- <url> <url>`
   - Google: in Search Console, use URL inspection on each URL, then "Request indexing". The sitemap already lists new posts automatically.
5. **Social:** post the prepared copy on LinkedIn, Facebook, X, Instagram and WhatsApp Status. Each post links to the article, not the homepage.
6. **Measure, weekly:** WhatsApp taps (`click_whatsapp`) and form sends (`generate_lead`) by page in Google Analytics, plus Search Console impressions per post.

## Social copy, day 1

### Flutter vs React Native vs a PWA
https://manueltechnologies.com/blog/flutter-vs-react-native-vs-pwa

**LinkedIn / Facebook**
> Building an app for your business? Most businesses in Ghana do not need the App Store for their first version.
>
> If your customers reach you by a WhatsApp link, a QR code or an SMS, a progressive web app (PWA) opens straight from that link. No download on mobile data, one codebase, and every update is live the same day.
>
> You need Flutter or React Native when the app must be in the stores or drive hardware like Bluetooth printers.
>
> Our church management product Fold is a PWA, and we explain why in the full comparison:
> https://manueltechnologies.com/blog/flutter-vs-react-native-vs-pwa

**X**
> Flutter, React Native or a PWA for your business app?
>
> Reached by link, mostly forms and payments: PWA.
> Must be in the App Store or drive hardware: Flutter or React Native.
>
> The full comparison, with a real example:
> https://manueltechnologies.com/blog/flutter-vs-react-native-vs-pwa

**WhatsApp Status / Instagram story**
> Does your business app need the App Store? Probably not. Read why: manueltechnologies.com/blog/flutter-vs-react-native-vs-pwa

### Google Ads vs Meta ads
https://manueltechnologies.com/blog/google-ads-vs-meta-ads-ghana

**LinkedIn / Facebook**
> Google Ads or Facebook and Instagram ads: which should your business run first?
>
> If customers already search for what you sell (a plumber in East Legon, a lawyer in Kumasi), start with Google.
> If it sells on looks or nobody knows it exists yet (food, fashion, beauty, events), start with Meta.
>
> Whichever you pick, set up conversion tracking before spending a cedi. Otherwise you are paying for clicks with no idea which became customers.
>
> Full guide, with the exact tracking we run on our own site:
> https://manueltechnologies.com/blog/google-ads-vs-meta-ads-ghana

**X**
> Google Ads catches people already looking.
> Meta ads reach people who are not looking yet.
>
> Start where your customer already is, and track enquiries, not clicks.
>
> https://manueltechnologies.com/blog/google-ads-vs-meta-ads-ghana

**WhatsApp Status / Instagram story**
> Google Ads or Facebook ads first? The answer depends on one question. manueltechnologies.com/blog/google-ads-vs-meta-ads-ghana

## Social copy, day 2

### WordPress vs Webflow vs a custom build
https://manueltechnologies.com/blog/wordpress-vs-webflow-vs-custom-website

**LinkedIn / Facebook**
> WordPress, Webflow or a custom build for your business website?
>
> WordPress: you publish often, the budget is tight, and someone is paid to keep the plugins updated.
> Webflow: a design led marketing site your team edits visually.
> Custom: the site has to do something. Take payments, book, calculate, or connect to your other systems.
>
> One check settles it for many Ghanaian stores: Webflow's checkout runs on Stripe and PayPal, and Stripe sends businesses in Ghana to Paystack instead. So no Mobile Money inside a Webflow store.
>
> The full comparison, with a site we built that runs to over a thousand pages:
> https://manueltechnologies.com/blog/wordpress-vs-webflow-vs-custom-website

**X**
> WordPress, Webflow or custom?
>
> Publish often on a small budget: WordPress.
> Design led site, no payments: Webflow.
> The site has to take MoMo, book or calculate: custom.
>
> https://manueltechnologies.com/blog/wordpress-vs-webflow-vs-custom-website

**WhatsApp Status / Instagram story**
> Building a website? WordPress, Webflow or custom: one question decides it. manueltechnologies.com/blog/wordpress-vs-webflow-vs-custom-website

### Instagram vs TikTok vs LinkedIn
https://manueltechnologies.com/blog/instagram-vs-tiktok-vs-linkedin-ghana

**LinkedIn / Facebook**
> Instagram, TikTok or LinkedIn: where should your business post?
>
> Sell to consumers on looks (food, fashion, beauty, property): Instagram.
> Can make short videos every week and want reach beyond your followers: TikTok.
> Sell to businesses or professionals: LinkedIn.
>
> Pick one, post on a schedule you can keep for a year, and send every post toward WhatsApp. Then judge it by the conversations it starts, not the likes.
>
> Full guide, with the routine we run on our own content:
> https://manueltechnologies.com/blog/instagram-vs-tiktok-vs-linkedin-ghana

**X**
> Instagram for products that sell on looks.
> TikTok for reach through video.
> LinkedIn for selling to businesses.
>
> Pick one, and measure conversations, not followers.
>
> https://manueltechnologies.com/blog/instagram-vs-tiktok-vs-linkedin-ghana

**WhatsApp Status / Instagram story**
> Instagram, TikTok or LinkedIn for your business? Here is how to choose. manueltechnologies.com/blog/instagram-vs-tiktok-vs-linkedin-ghana

## Social copy, day 3

### Spreadsheet vs custom software
https://manueltechnologies.com/blog/spreadsheet-vs-custom-software

**LinkedIn / Facebook**
> Is your business run on a spreadsheet?
>
> That is the right start. It stops being right when several people edit the same sheet, nobody knows which copy is the latest, the same data is typed twice, and a wrong cell has already cost money.
>
> Before building anything, check whether a product already does the job. If it does not, build for the one process that hurts most, not everything at once.
>
> The seven signs, and how our own system MPOS replaced the notebook and the sheet for Ghanaian shops:
> https://manueltechnologies.com/blog/spreadsheet-vs-custom-software

**X**
> Signs you have outgrown the spreadsheet:
>
> "stock FINAL v3" exists.
> Only one person understands it.
> Staff can see the takings.
> A wrong cell has cost you money.
>
> When to switch, and to what:
> https://manueltechnologies.com/blog/spreadsheet-vs-custom-software

**WhatsApp Status / Instagram story**
> Is a spreadsheet still running your business? Seven signs it is time to switch. manueltechnologies.com/blog/spreadsheet-vs-custom-software

### Guest posts vs digital PR vs directories
https://manueltechnologies.com/blog/guest-posts-vs-digital-pr-vs-directories

**LinkedIn / Facebook**
> Not every backlink helps your website. Some count against it.
>
> Google's own spam policy names links with keyword anchor text in guest posts as link spam. Bulk directory links carry almost no value.
>
> What works: publish something genuinely useful, such as original data or a free tool, and tell the journalists and industry sites that cover your field. One good asset can earn links for years.
>
> Full comparison, with how we build our own research pages:
> https://manueltechnologies.com/blog/guest-posts-vs-digital-pr-vs-directories

**X**
> Guest posts for keyword links: spam, by Google's own policy.
> Directories: only the few customers use.
> Digital PR: the links that matter.
>
> https://manueltechnologies.com/blog/guest-posts-vs-digital-pr-vs-directories

**WhatsApp Status / Instagram story**
> Buying backlinks for your website? Read this first. manueltechnologies.com/blog/guest-posts-vs-digital-pr-vs-directories
