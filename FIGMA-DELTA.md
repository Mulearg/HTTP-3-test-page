# Figma vs. build — reconciliation

Checked 2026-09-01 against file `dOmspApFU8JeMbBiot0r71`, desktop artboard
`27881:14` (1440 × **6831**). Full metadata for all 12 sections; deep
`get_design_context` on Hero (`27882:14`) and Where it runs (`27967:14`).

**Headline: the design supersedes `CONTENT-v2.md` in a lot of places.** I built
from the copy spec because the artboards were unreachable. The spec was a plan;
the design is what was actually made, and the kickoff says Figma wins. Most of
`src/content.ts` is therefore wrong — not subtly, but wrong strings.

---

## 1. Content that is simply different

| Where | I built (from CONTENT-v2 / invented) | Figma actually says |
| --- | --- | --- |
| Nav links | Proxies, Scraping, Solutions, Resources, Pricing | **Products, Pricing, Education, Culture, Solutions** |
| Nav utility bar | Documentation, Support, Log in | **Contact Us · Partners ▾ · Log in ▾** |
| Nav CTA label | "Start now" | **"Try Proxies Now"** |
| Where-it-runs heading | "Where it runs" | **"Live on Residential, from two entry points"** |
| Availability | checkmark matrix (5 protocols × 3 products) | **a list**: protocol → "Residential only" / "All three products" |
| Testimonial | invented quote, attributed "ScraperAPI" | **"We rely on their good quality IP addresses so much that they simply became our largest provider."** — Zoltan Bettenbuk, CTO, ScraperAPI |
| Use cases | 4 invented one-liners | **4 title + description pairs**: E-commerce price monitoring / AI training-data collection / Ad verification / SERP analysis |
| Closing CTA 2nd button | "Read the protocol docs" | **"Talk to us"** |
| Footer columns | Proxies / Scraping / Resources / Company | **PRODUCTS / RESOURCES / OTHERS** + a Contact column |
| Comparison rows | Transport, Multiplexing, HOL blocking, Handshake, Connection migration | **Transport, Handshake before first byte, Head-of-line blocking, Survives an IP change, Encryption** — and different cell values |

**Eyebrows I omitted entirely** (the design has one per section):
`WHY IT MATTERS AT SCALE`, `ONE GATEWAY`, `WHERE IT RUNS`, `BEFORE YOU BUILD`,
`WHERE HTTP/3 EARNS ITS KEEP`.

The Why-HTTP/3 and Traps card bodies are also substantially longer and more
specific than the summaries I wrote from the spec.

## 2. A whole component is missing

The hero has a **stream diagram** panel (`27882:28`, 508 × 322) that I did not
build at all — it is the thing that makes the head-of-line-blocking claim
visual:

- White card, 1px `#E1E6F4`, radius 10, padding 28, gap 14
- Label `STREAM BEHAVIOUR UNDER PACKET LOSS` — 12px bold `#757575`, tracking 1.4px
- Two blocks, HTTP/2-over-TCP (bottom border) and HTTP/3-over-QUIC
- Each: a head row (`justify-between`, 12px bold; left `#050038`, right `#757575`)
  and 3 bar rows of 8px-tall pills, radius 4, row gap 6, bar gap 4
- HTTP/2 rows: `92px rgba(5,0,56,.22)` + `14px` marker + flex-1 `#E1E6F4` —
  the marker is `#EE3889` on row 1 only, `#E1E6F4` on rows 2–3 (all stalled)
- HTTP/3 rows: `92px #07B6BF` + `14px #EE3889` + flex-1 `#E1E6F4`; rows 2–3 are
  a single full-width `#07B6BF` bar (they kept flowing)
- Caption 12px regular `#757575`

`#EE3889` as the lost-packet marker is legal — image.pink is scoped to
"gradient stop and illustration only", and this is illustration.

## 3. Layout corrections

- **Gutters differ by region**: nav and footer inset **86px**; body sections
  **120px**. I used 120 everywhere, so the chrome is 34px too narrow.
- **Section padding is 88px top** (hero 88/76), not the 112px I guessed.
- **Several section heads are centred** — Why HTTP/3, Comparison, Where it runs.
  I left-aligned all of them.
- **Stat band is four plain 300px columns**, no card border or divider grid.
  I built a bordered 4-up grid.
- **Logo renders at 157 × 29.6**, not the asset's native 175 × 33.
- Hero copy column is 620 wide, gap 72 to the diagram.
- Hero subhead is **`#050038` at 16px** — not ink-secondary at 18px.
- Hero trust line is **12px** (caption), not 16px.
- Hero button gap is **14px**, not 20px.
- Hero badge is a **pill with white fill and a 1px `#E1E6F4` border**, padding
  15/7, gap 9 — mine had no chip at all.
- The Where-it-runs callout is a **dark `#050038` panel** with white text, not
  the light tint panel I built.
- Entry-point hostnames use **JetBrains Mono 13px** — see §5.

## 4. What I got right

Worth recording so it does not get "fixed":

- Secondary button — Figma shows `px-38 py-20`, which is exactly my CSS
  `18px 36px` + 2px border. The token file's fold-the-border note is confirmed.
- Hard offset `#04B81E 3px 3px 0 0`, zero blur, zero spread ✓
- Hero wash: sky 9% → transparent 61% composited over white ✓
- Where-it-runs ground: duotone-band 9% horizontal over `#F2F5FD` ✓ — exactly
  as built, including the "over white it disappears" reasoning
- Icon tile 48px ✓ · radius card 10 ✓ · pill 100 ✓
- h1 60/72/−0.6 ✓ · h2 50/62.5 ✓
- Nav CTA 158 × 38, radius 39 ✓
- "Residential only" / "Live" affirmative text is `#016F74`, **not** the CTA
  green — the design honours `cta-green-is-a-fill-never-type`, and so does my
  build.

## 5. Two conflicts the design creates

**(a) The primary button label is WHITE in the design.**
`get_design_context` returns `text-white` on `bg-[#04b81e]`. The token file says
the opposite, in as many words:

> "Label MUST be #050038 (7.41:1). White on this green is 2.66:1 and fails AA —
> do not use white."

White on `#04B81E` really is 2.66:1. So the design and the token file directly
contradict each other, and the design's version fails AA. I built it with
`ink.primary` per the token file. **This needs a decision** — it is the same
class of problem as the `#81A786` hover, and the component description in Figma
even flags that hover as unverified, so the file is already known to carry
production quirks.

**(b) JetBrains Mono appears in a third place.**
`_rules.scale-gaps` licenses the mono face "for those two blocks only". The
design also sets the four entry-point hostnames in JetBrains Mono 13px. Either
the rule's count is stale or the hostnames should be Plus Jakarta Sans.

## 6. Not yet pulled

Deep design context still to fetch before rebuilding: Nav `27949:14`, Stat band
`27883:14`, Why HTTP3 `27883:27`, Comparison `27884:14`, Protocols and ports
`27966:14`, How you connect `27885:14`, Traps `27969:14`, Proof `27887:14`,
Closing CTA `27888:14`, Footer `27953:18`. Mobile artboard `27889:14` untouched.

---

# Status after reconciliation — 2026-09-01

All 12 desktop sections were pulled with `get_design_context` and the build was
rewritten against them. `content.ts` was rewritten wholesale from the artboard.

**Resolved.** Every item in §1 (wrong strings), §2 (the missing stream diagram)
and §3 (layout) is now implemented from the artboard. Verified in-browser at
1440: nav/footer gutter 86px, body gutter 120px, hero padding 88/76, Why 92,
Traps 88, Closing CTA a dark `#050038` band at exactly 275px, footer `#282828`
at 56px, logo 157 × 29.606, table headers dark with rgba-white labels. Page
height 6962 against the artboard's 6831. No horizontal scroll at 1440 or 390.

The stream diagram was rebuilt from its spec and verified segment by segment:
HTTP/2 rows all carry the stalled 92px lead with the pink marker on row 1 only;
HTTP/3 row 1 carries a sky lead plus the pink marker, and rows 2–3 are single
full-width sky bars. All bars 8px tall, radius 4.

**Decided.** The primary CTA label ships WHITE, matching the artboard and
diverging from the token file's explicit rule. It is 2.66:1 and fails AA. This
was raised before implementing and the call was to match the design; the reason
and the one-line reversal are recorded in `Button.module.css`.

**Primary hover was fixed after the reconciliation.** `action.cta-hover` alone
turned out to be near-imperceptible — `#04B81E → #03A01A` is about a 12%
luminance shift on a saturated green, invisible across a 64px pill. The fill
still steps to the token colour, but the affordance is now carried by motion:
the button lifts 1px and the badge arrow advances 3px, with a
`prefers-reduced-motion` fallback to the colour change alone. No new colour was
invented.

## Contrast debt, all design-sourced

Ten AA failures remain. Every one is the artboard's own value, kept because the
design was chosen as the source of truth. Listed so the debt is visible:

| Where | Ratio | Needs |
| --- | --- | --- |
| Primary CTA label, white on `#04B81E` (×2) | 2.66:1 | 4.5 |
| Secondary CTA label, `#04B81E` on white (×2) | 2.66:1 | 4.5 |
| Code comments, white @36% on `#050038` (×4) | 3.12:1 | 4.5 |
| "Coming soon" chip, `#757575` on `#E1E6F4` (×2) | 3.69:1 | 4.5 |

Cheap fixes if wanted: comments to white @50%, chip text to `#5F5F5F`, and the
two CTA labels as already described. All four are one-line changes.

## Still open

- **Mobile artboard `27889:14` not reconciled.** The responsive rules are my
  own judgment, not the artboard's: verified only that 390px has no horizontal
  scroll, a 20px gutter, a stacked hero, and tables that scroll inside their
  own containers. Page height 10220 against the artboard's 9417 — close, but
  the mobile layout has not been checked section by section.
- **JetBrains Mono in a third place** — the entry-point hostnames, against
  `_rules.scale-gaps`' "those two blocks only".
- `[YOUR BENCHMARK NUMBERS]` still a placeholder, now rendered as the
  artboard's own chip.
- Mobile Proxies still absent from the availability list.

---

# Button states — corrected against the component sets

The button component sets were read directly (`28004:50`, `28006:20`,
`28006:27`) after an interim pass invented a hover treatment. All six states
now match the design:

| Role | State | Node | Design |
| --- | --- | --- | --- |
| Primary | Hover | `28004:26` | fill `#81A786` — **nothing else changes** |
| Primary | Pressed | `28004:38` | fill `#038A17` |
| Secondary | Hover | `28006:16` | offset shadow removed; fill, border, label unchanged |
| Secondary | Pressed | `28006:18` | white fill, border and label `#038A17` |
| Nav | Hover | `28006:23` | `#F8F8F8`, `#1B4DCA` border + label, weight 500 |
| Nav | Pressed | `28006:25` | `#F8F8F8`, `#133791` border + label, weight 500 |

**Primary hover reversed to `#81A786`.** The build first shipped
`action.cta-hover #03A01A`, chosen at kickoff. The artboard's Hover variant is
the sage, and that is now what ships. Both the token file and Figma's own
component description dissent — "appears exactly once in the whole stylesheet,
is not in the token palette [...] treat it as unverified" — and the objection
that desaturating a primary CTA on hover is backwards still stands. Recorded,
not resolved. `--color-action-cta-hover` keeps the token value `#03A01A` so the
revert is one line; `--color-action-cta-hover-shipped` carries the sage.

**Invented motion removed.** An interim pass added a 1px lift and a 3px arrow
nudge because `#03A01A` was near-imperceptible. That is not in the design. The
design's hover is a fill change and nothing more — which the sage makes plainly
visible on its own, so the compensation is no longer needed either.

**Two pressed states were inferred wrong and are fixed.** Secondary previously
greyed its fill; the design keeps the fill white and darkens border and label.
Nav previously flipped back to a solid blue fill with a white label; the design
deepens the hover *inversion* instead.

---

# Nav dropdowns — built from the LIVE SITE

Added 2026-09-01. The artboard draws the nav bar with five chevroned labels but
**does not draw the panels those chevrons open**, so live rayobyte.com is the
only source for them. Everything was read off the live DOM: copy, hrefs,
grouping, geometry, typography, icon assets and the per-item rail tints.

## Measured, then matched

| Property | Live | Built |
| --- | --- | --- |
| Panel width | 1265 | **1265** |
| Panel top | 127 | **127** |
| Panel radius | `0 0 20px 20px` | same |
| Panel shadow | `rgba(0,0,0,.2) 0 6px 7px` | same |
| Card | 298 × 105 | **298 × 105** |
| Card radius / gap | 5px / 13px | same |
| Card hover | `rgba(0,0,0,.2) 5px 5px 5px` | same |
| Icon rail | 43px wide | **43px** |
| Grid | `298px 298px`, gap 17.6 / 28.8 | same |
| Title | 14 / 700 / 20 | same |
| Description | 13 / 400 / 19 | same |
| Group heading | 16 / 600 + rule | same |
| See-all pill | 195 × 51, 2px border, radius 100, 15/700 | **195 × 51** |

Two deliberate differences:

- **Panel side padding is 86px, not the live 88.55px.** 86 is the artboard's
  chrome gutter, and the panel must line up with the logo and links above it.
  Using the live value would misalign the panel against this build's own nav.
- **See-all pill uses `image.pink #EE3889` / `image.sky #07B6BF`** where the
  live site has `#EE3888` / `#07B7BF` — one unit off in a single channel, and
  these are the real palette tokens. Imperceptible, and it keeps the colour in
  the token system.

## Menu shapes, all matching live

| Menu | Structure | See-all |
| --- | --- | --- |
| Products | 2 groups — Proxy Solutions (2-col, 6), Scraping Solutions (1-col, 3) | See All Products (pink) |
| Pricing | same two groups, cards carry the published rates | See All Pricing (sky) |
| Education | flat 3-col, 5 items | none |
| Culture | 2-col (5 items) + "Latest Rayobyte Stories" (1 story) | none |
| Solutions | flat 3-col, 5 items | See All Use Cases (sky) |

Utility bar: **Partners** → Resell, Affiliates. **Log in** → Residential
Dashboard, Data Center & ISP Dashboard.

## Three things worth knowing

**1. The rail icons are not square.** The live site renders each glyph into a
`22 × 77` box. The source SVGs are small (16×21, 21×19, 24×24…), so with the
default `preserveAspectRatio` they letterbox — the glyph draws at its own ratio,
centred, in a tall box. That tall box is what gives the rail its 103px and the
card its 105px. Sizing them square collapses the card to 85px and stops
matching; this cost a round of debugging.

**2. The rail tints are off-palette.** Eight pastels — `#FFECD4 #DEF0FF
#F0E9FF #FFE1DD #FFE7E7 #D0FAD1 #D8FFF3 #EAE9FE` — appear nowhere in
`rayobyte.tokens.json`. None are on the retired list, so nothing here is
forbidden, but they do widen the palette. Reproduced because matching the live
site was the brief, and centralised in `RAIL` in `navMenus.ts` so they are one
edit to re-map.

**3. Keyboard access was added, not copied.** The live dropdowns open on hover
via Webflow IX2 with no keyboard path at all. The build keeps the hover
behaviour identically and adds what the original lacks: a real `<button>`
toggle with `aria-expanded`/`aria-controls`, Enter and Space to open, Escape to
close and return focus, and close-on-focus-leave. Purely additive.

Icons are downloaded into `public/assets/nav/` rather than hotlinked from the
Webflow CDN.

## Dropdown hover bug — fixed

Reported after the first build: the panel opened on hover but vanished the
moment you moved toward it, so the menu could not be clicked.

**Cause.** The toggle sits inside the nav row; the panel hangs below the row.
That leaves a ~26px strip between them (measured: toggle bottom 101, panel top
127) which belongs to `.row`, not to the dropdown. A hit-test in the middle of
that strip returned `.row` with `inRootSubtree: false`. Moving the pointer down
crossed it, `mouseleave` fired on the root, and the panel unmounted before the
pointer arrived.

**Fix.** A transparent hover bridge — `.panel::before`, 32px tall, spanning the
panel's full width and sitting directly above it. Because it is a
pseudo-element of the panel, and the panel is a DOM descendant of the root,
hovering the bridge still counts as being inside the root, so no `mouseleave`
fires. No timers, so nothing feels laggy.

**Verified** by sampling `elementFromPoint` every 4px from the toggle down into
the panel: all inside the root subtree, `gapFullyBridged: true`. Then driven
with real pointer moves — the panel survives the trip down, a card hovers with
the correct href and the live `rgba(0,0,0,.2) 5px 5px 5px` shadow, the far
opposite corner keeps it open, switching to another menu leaves exactly one
open, and moving off the nav closes it.

---

# Dropdown padding & positioning — corrected against the live CSS

The first pass measured the live panels at one viewport (1280) and hard-coded
what it saw. That was the mistake: several of the live values are **fluid**, so
matching at 1280 and diverging badly at every other width. Reported as the
panels looking cramped and mispositioned on a wide screen.

Reading the authored rules rather than only computed values found four things:

**1. Panel padding is a percentage.** `padding: 1.5rem 7% 2rem`, not a fixed
gutter. 7% is 88.5px on a 1265px page but **131.9px on an 1885px one**. The
build had a fixed 86px, so on a wide screen the panel content sat ~46px too
close to the edge.

**2. The groups row is CENTRED**, via `.flex-block-106 { justify-content:
center }`. The build left-aligned every panel at the gutter — up to 56px off.

**3. Cards resize at ≥1440**, and not uniformly per menu:

| Menu | 1265px page | 1885px page |
| --- | --- | --- |
| Products | 298 (single col 293) | **348** (single col 350) |
| Pricing | 333, height 125 | **364**, height **100** |
| Education | 298, height 120 | **300**, height **113** |
| Culture | 298 | **298** — does not grow |
| Solutions | 298 | **300** |

Culture has its own `.nav_grid.culture` rule repeated at every breakpoint, so it
alone keeps 298px cards. Sharing the default columns made it 50px too wide.

**4. Cards have explicit heights**, not content-driven ones:
`._3-columns { height: 105px; min-height: 95px; max-height: 126px }`, with
`.pricing` 125→100 and `.educ` 120→113 at ≥1440. The 30px offset also belongs
to `.nav_grid { margin-right: 1.875rem }`, not to the group.

Also added: the panel's `border-top: 2px solid #EEE` and the Culture row's 31px
gap. The story tile is not inside a `.nav_grid`, so it takes no grid margin —
missing that made the Culture row 24px wide and shifted the panel 12px.

## Result — verified at two viewports

First card's left edge, mine minus live:

| Menu | at 1280 | at 1900 |
| --- | --- | --- |
| Products | +1 | 0 |
| Pricing | 0 | +1 |
| Education | 0 | 0 |
| Culture | +3 | +3 |
| Solutions | 0 | 0 |

Card width and height are exact (0px difference) for all five menus at both
widths. Before this pass the left edge was out by up to 56px at 1280 and more
at 1900, with cards 50px too narrow on wide screens.

**Lesson worth keeping:** measuring computed values at a single viewport is not
enough for a fluid layout. Read the authored rule, then verify at both a narrow
and a wide width.

---

# Dropdown breathing room — a deliberate deviation from live

Requested after reviewing the panels: the gutter at the panel edges and the
channel between column groups both read as too tight. These are the first
dropdown values that intentionally do NOT match rayobyte.com, so they are
isolated behind two custom properties on `.panel`:

```css
--nav-panel-inset: 9%;    /* live: 7%  */
--nav-group-gap:  64px;   /* live: 30px */
```

Setting them back to `7%` and `30px` restores exact parity with the live site;
nothing else needs touching.

Two follow-on corrections came out of the change:

**Trailing gutter removed.** The channel is applied as `margin-right` on each
grid, so leaving it on the LAST group folded dead space into the centred row —
the visible content then sat half a gutter left of true centre. At the live
30px that is a 15px lean and easy to miss; at 64px it is 32px and obvious.
`.group:last-child .grid { margin-right: 0 }` fixes it, and also covers the
Culture story tile, which is not inside a grid on the live site and never
carried the margin there.

**Culture double-gutter removed.** Culture had both a row `gap` and the grid
`margin-right` set from the variable, so its channel came out at 128px — twice
every other menu. The row gap is gone; the grid margin is the single source.

## Measured after the change (1425px page)

| Menu | Left space | Right space | Group channel |
| --- | --- | --- | --- |
| Products | 143 | 143 | 64 |
| Pricing | 121 | 121 | 64 |
| Education | 234 | 234 | n/a (one group) |
| Culture | 222 | 215 | 64 |
| Solutions | 234 | 234 | n/a (one group) |

Symmetric everywhere except Culture, which is 7px out because the 300px story
tile is the rightmost element and is taller than the card grid beside it.

---

# See-all button alignment — fixed

Reported: the see-all pill sat well left of the cards above it.

**Cause.** `.footer` was a direct child of `.panel`, so it began at the panel's
padding edge, while `.groups` is centred and begins wherever its content width
puts it. The two drifted apart by however much the centring offset was — on the
Pricing menu that was ~190px, with the pill stranded out to the left.

**Fix, and it mirrors live.** The live site wraps the groups row AND the see-all
in one `.div-block-85` (a `flex-start` column, gap 24) and centres that whole
block, so the button inherits the row's left edge for free. Added the same
wrapper as `.inner`; `.footer` now sits inside it and its top rule starts at the
same edge too.

Verified — card left vs button left, at a 1425px page:

| Menu | Card | Button | Aligned |
| --- | --- | --- | --- |
| Products | 143 | 143 | yes |
| Pricing | 128 | 128 | yes |
| Solutions | 234 | 234 | yes |
| Education | 234 | — | no button on live |
| Culture | 222 | — | no button on live |

---

# CTA label size — 16px

Instructed. The two body CTAs are now both 16px:

| Role | Was | Now |
| --- | --- | --- |
| Primary | 20px / 700 / 28 | **16px / 700 / 21** |
| Secondary | 16px / 700 / 22.4 | unchanged, already 16 |
| Nav | 15px / 600 / 22.5 | unchanged — see below |

This is a divergence from the artboard and from production, both of which set
the primary label at 20px. It is a useful one though: 16/700/21 is exactly
`typography.button` in the token file — the token that claimed to cover "all
three button roles" while no role actually used it. The primary now does, so
the two body CTAs match and the token is real instead of aspirational. The
primary is wired to the token variables rather than a literal.

Geometry is unaffected. The primary's 64px height comes from the 52px badge
plus 6px above and below, not the label, so only the width changed (195 -> 176).

**The nav CTA was left at 15px, deliberately.** It is a separate role with a
measured fixed size of 158x38. At 16px the label "Try Proxies Now" computes to
125.1px against 124px of available content box — it overflows by 1.1px. Taking
it to 16px therefore means also widening the button or cutting its padding,
which breaks a size that both Figma and production agree on. Raised rather than
done.

---

# Utility dropdowns unselectable — fixed

Reported: the Partners and Log in menus in the top bar opened but could not be
clicked into.

**Cause — different from the mega-menu bug, despite looking the same.** There is
no vertical gap here; the panel starts exactly at the toggle's bottom edge. The
problem is horizontal overhang: the panel is ~220px wide but hangs off a ~77px
toggle, extending ~143px to the LEFT. The strip beside the toggle — inside the
panel's horizontal span, above its top edge — belongs to the utility bar, not to
the dropdown. Confirmed by hit-test: the point (1008, 25) with the panel open
returns `_bandLink_`, the "Contact Us" link. Any diagonal move toward a
left-hand item crosses that strip, fires mouseleave, and the panel closes before
the pointer arrives.

Reproduced deterministically: hover the toggle, move diagonally left, and
`aria-expanded` flips to `false` mid-path.

**Why the mega-menu fix does not transfer.** Those use a transparent bridge over
their dead strip. Here the dead strip is *occupied* by the other band links, so
a bridge would sit on top of them and swallow clicks on "Contact Us".

**Fix.** A 160ms close grace on `UtilityDropdown` — `mouseleave` schedules the
close, `mouseenter` cancels it, and the timer is cleared on unmount. It leaves
the neighbouring links untouched and covers every approach angle rather than one
rectangle.

Verified with real pointer movement: the diagonal path that previously closed
the menu now lands on "Resell" with the panel still open; Log in opens with both
dashboards; moving away closes both; and "Contact Us" is still the top element
at its own centre while a panel is open.

---

## SEO and document semantics — tier 1

None of this changes a pixel. It changes what a crawler, a share scraper or a
screen reader gets out of the same page.

**`<h1>` was missing a space.** The artboard breaks the headline across two
lines, and each line was rendered as its own block-level `<span>`. Visually
correct; in `textContent` the two text nodes ran together as
`"HTTP/3 over QUIC,across 40M+ residential IPs"` — which is the string a crawler
indexes and a screen reader reads. Now joined with a real space, with `<br>`
doing the visual break.

**Ten `<section>` elements had no accessible name.** A `<section>` is only
exposed as a `region` landmark once it has one; without it the element is inert
markup and the page offers no landmark structure to navigate by. `Section.tsx`
now generates an id for its `<h2>` and points `aria-labelledby` at it, so the
name can never drift from the visible heading. Two sections needed more: the
"one credential set" section renders its own `<h2>` inside `children`, so
`Section` gained a `labelledBy` prop; the proof section has no `<h2>` at all —
its head is a styled eyebrow — so it takes a literal `label`.

**Four `<nav>` elements, none labelled.** With more than one nav on a page they
are indistinguishable without names. The header nav is "Primary"; the three
footer columns take their own column title.

**Footer column titles were `<h2>`.** They sit under no `<h2>`-level topic and
outrank the section headings above them. Now `<h3>`.

**Head.** Added canonical, favicon, `theme-color`, and full OG/Twitter tags.
`og:image` is deliberately absent — no 1200×630 asset is committed yet, and a
broken image reference previews worse than none; `tools/og-card.html` renders
the card and carries the command that produces it.

**`noindex` and `Disallow: /`, deliberately.** This page reproduces copy,
product names and prices that already live on rayobyte.com. Indexed on a second
domain it would compete with the real site for the same terms. Both the meta tag
and `public/robots.txt` carry a comment saying what to change when the page
ships as canonical.

**Still open.** Ten AA contrast failures remain, all design-sourced. Server
rendering is the tier-3 item: nothing above changes the fact that the markup a
crawler receives is an empty `<div id="root">`.
