#!/usr/bin/env node
/* --------------------------------------------------------------------------
   IndexNow submission.

   Tells Bing, Yandex and the other participating engines that URLs have
   changed, instead of waiting to be recrawled. One ping reaches every
   participant.

   Google does NOT participate. This does nothing for Google rankings or
   indexing, and no script can make Google index faster. It is still worth
   running, because Bing indexation is what feeds ChatGPT retrieval, and the
   site sells GEO.

   Usage:
     npm run indexnow                 submit every URL in the live sitemap
     npm run indexnow -- <url> <url>  submit specific URLs

   This is deliberately a manual command rather than a build step. Submitting
   is an outward facing action, and a postbuild hook would fire before the
   deploy is actually live. Run it after a deploy has gone out.
   -------------------------------------------------------------------------- */

const HOST = "manueltechnologies.com";
const KEY = "9c11b587107d7dd46b4d981174454288";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

/* IndexNow accepts at most 10,000 URLs per request. */
const MAX_PER_REQUEST = 10000;

async function urlsFromSitemap() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`sitemap fetch failed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) throw new Error("sitemap contained no <loc> entries");
  return urls;
}

function chunk(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

async function main() {
  const args = process.argv.slice(2);
  const urls = args.length > 0 ? args : await urlsFromSitemap();

  /* Guard against submitting a URL on another host. IndexNow rejects the
     whole batch if any URL is off host, so fail loudly and early. */
  const offHost = urls.filter((u) => !u.startsWith(`https://${HOST}/`) && u !== `https://${HOST}`);
  if (offHost.length > 0) {
    console.error(`Refusing to submit. These URLs are not on ${HOST}:`);
    offHost.forEach((u) => console.error(`  ${u}`));
    process.exit(1);
  }

  /* Verify the key file is actually reachable. IndexNow validates it on
     their side, and a 404 here means every submission is silently rejected. */
  const keyCheck = await fetch(KEY_LOCATION);
  if (!keyCheck.ok) {
    console.error(`Key file unreachable at ${KEY_LOCATION} (${keyCheck.status}).`);
    console.error("Deploy public/<key>.txt before submitting.");
    process.exit(1);
  }

  console.log(`Submitting ${urls.length} URLs for ${HOST}`);

  for (const batch of chunk(urls, MAX_PER_REQUEST)) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: batch,
      }),
    });

    /* 200 accepted, 202 accepted but key validation pending. Both are fine. */
    if (res.status === 200 || res.status === 202) {
      console.log(`  ${batch.length} URLs accepted (${res.status})`);
    } else {
      console.error(`  Rejected: ${res.status} ${res.statusText}`);
      console.error(`  ${await res.text()}`);
      process.exitCode = 1;
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
