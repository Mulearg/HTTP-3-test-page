# Astro pilot

A second build of the same page, in `astro/`, testing one question ahead of the
~140-page migration:

> Can the components we already have ship as static HTML, or does moving off a
> client-rendered SPA mean rewriting them?

Answer: **twenty of the twenty-one components port with zero changes.** Only the
nav needs thought, and only because it is the one interactive thing on the page.

## How it is wired

`astro/` is its own package, but it does **not** contain a copy of the source.
It imports `../app/src` through an `@app` alias (`astro.config.mjs`) and shares
`app/public` as its asset root. Both builds compile the same files; only the
renderer differs. A forked copy would have drifted, and every difference between
the two builds would then have been arguable rather than measurable.

- `astro/src/layouts/Base.astro` — the document shell, head identical to
  `app/index.html`.
- `astro/src/pages/index.astro` — the same section list as `app/src/App.tsx`.
  Every section renders at build time and ships no JavaScript. `Nav` is the one
  exception: `client:idle` hydrates it as an island.

Run it:

```bash
npm install --prefix astro && npm run build --prefix astro
```

## Result: identical rendering

Measured at 1280px, production build of each, same machine:

| | SPA (`app/dist`) | Astro (`astro/dist`) |
|---|---|---|
| `<section>` elements | 10 | 10 |
| Section offsets (all ten) | 127 … 6308 | 127 … 6308 — identical |
| Document height | 7058px | 7058px |
| Rendered text | 6203 chars | 6203 chars |
| Images | 26, none broken | 26, none broken |
| Console errors | none | none, no hydration mismatch |

Not "close enough" — the same numbers. The nav mega-menus, the hover bridges and
the utility-dropdown close grace all still work; the Products menu was opened
with a real pointer hover against the Astro build and rendered correctly.

## Result: what ships over the wire

| | SPA | Astro |
|---|---|---|
| HTML | 1.2 kB gz — an empty `<div id="root">` | 9.1 kB gz — the whole page |
| Words a crawler sees with no JS | **0** | **1228** |
| CSS | 6.6 kB gz | 6.7 kB gz |
| Blocking before first paint | 71 kB of JS must download, parse and run | nothing |
| Deferred JS | — | 75.7 kB gz, `client:idle`, nav only |

The line that matters for 140 landing pages is the third one. Today the markup a
crawler receives is `<div id="root"></div>` and nothing else; Google renders JS,
but it does so on a second pass out of a queue, and no other crawler, scraper or
share-preview bot reliably does it at all. Static HTML removes that entire class
of risk, and takes the first paint from "after 71 kB of JavaScript" to "as fast
as the HTML arrives".

## The one thing that would still be a rewrite

The nav island drags React and React-DOM in with it — 67 kB gz of the 75.7 kB
above — for what is, in substance, a few booleans of open/closed state. It is
deferred, cached across all 140 pages, and off the critical path, so it costs
nothing at first paint. But it is the only reason any React runtime ships at all.

Rewriting `Nav` + `NavDropdown` as an Astro component with plain JS would take
the whole site to **~16 kB gz per page, no framework runtime**. That is one
rewrite of one component, amortised across every page — worth doing before the
migration rather than after, but it is not needed to prove the pilot.

## Not done here

- Deployment still points at the SPA. `vercel.json` builds `app/`; pointing it
  at `astro/` is a three-line change, deliberately left for a decision rather
  than made as a side effect of the pilot.
- The mobile artboard (`27889:14`) is still unreconciled in both builds.
- The ten AA contrast failures are design-sourced and unaffected by either.
