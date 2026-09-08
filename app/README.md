# Rayobyte HTTP/3 landing page

React + TypeScript + Vite. Built from the **Figma desktop artboard**
`dOmspApFU8JeMbBiot0r71` / `27881:14`, with `rayobyte.tokens.json` for the
design tokens.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Layout

```
src/
  styles/tokens.css     every token, traceable to rayobyte.tokens.json
  styles/base.css       reset, type ramp, the two containers
  content.ts            all copy, transcribed from the artboard
  components/           Button, IconTile, Section, DataTable, CodeBlock,
                        StreamDiagram
  sections/             the 12 page sections, in artboard order
  navMenus.ts           nav mega-menu data, read from LIVE rayobyte.com
public/assets/icons/    SVGs exported from the artboard
public/assets/nav/      dropdown icons, downloaded from the live site
```

**Source of truth is the artboard, not `CONTENT-v2.md`.** The copy spec was the
plan; the design is what was made, and they disagree in many places — nav links,
the Where-it-runs heading, the testimonial, the use cases, the comparison rows
and the footer columns are all different. `../FIGMA-DELTA.md` has the full list
and the reconciliation status.

**There is deliberately no pricing section.** The old one advertised "HTTP/3
included" on Residential, Rotating ISP and Mobile; two of those three were
wrong.

## Two containers, on purpose

The artboard uses different gutters for chrome and body. `.container` insets
120px (every body section); `.container-chrome` insets 86px (nav and footer
only). This is easy to mistake for a bug — it is not.

## Verified against the artboard

Checked in-browser at 1440 rather than assumed:

| Check | Result |
| --- | --- |
| Gutters | chrome 86px, body 120px |
| Section rhythm | hero 88/76, Why 92, Traps/Protocols/Proof 88, Closing CTA 76, footer 56 |
| Closing CTA | dark `#050038`, height 275px — exactly the artboard |
| Footer | `#282828`, distinct from the CTA band's `#050038` |
| Logo | 157 × 29.606 in both nav and footer |
| Button geometry | primary 64px tall, badge 52px, nav exactly 158 × 38 |
| Secondary offset edge | `#04B81E 3px 3px 0 0`, zero blur, zero spread |
| Shadow clipping | 0 clipping ancestors — the Figma trap avoided |
| Stream diagram | every bar segment matches, 8px tall, radius 4 |
| Page height | 6962 vs the artboard's 6831 |
| Horizontal scroll | none at 1440 or 390; tables scroll inside their own wrapper |
| Retired colours | 0 occurrences as values |

## Decisions on record

**Primary CTA hover is the artboard's sage `#81A786`**, read from Button /
Primary State=Hover (`28004:26`) and confirmed against the rendered component
set. Both the token file and Figma's own component description flag that value
as unverified and point at `action.cta-hover #03A01A` instead; it ships anyway,
by decision, because it is what the design and production both show.

The design changes ONLY the fill on hover — no lift, no motion. An interim
pass here added a 1px lift and an arrow nudge to compensate for how subtle
`#03A01A` was; that was invented, is not in the design, and has been removed.

All six button states now match the component set exactly, including the two
pressed states that were previously inferred wrong: Secondary keeps a white
fill and darkens border and label to `#038A17`, and Nav deepens the hover
inversion to `#133791` rather than returning to a solid blue fill.

**Primary CTA label ships white**, matching the artboard and diverging from the
token file's explicit "do not use white". It is 2.66:1 and fails AA. Raised
before implementing; the call was to match the design. The one-line reversal is
in `Button.module.css`.

**Supporting-text scoping rule** (foot of `tokens.css`). `ink.secondary`
guarantees "4.6:1 **on white**"; that does not extend to `ground.tint` (4.22:1)
or `chrome.band` (4.14:1). Rather than invent a darker neutral, supporting text
steps up to `ink.primary` on tinted grounds via `--color-text-support`.

## Nav dropdowns

The five mega-menus and the two utility dropdowns are built from **live
rayobyte.com**, not the artboard — the artboard draws the chevrons but not the
panels they open. Panel width, top edge, radius, shadow, card size, rail width,
grid columns and the see-all pill all match the live site exactly; see
`../FIGMA-DELTA.md` for the measured comparison.

Two deliberate differences: the panel insets 86px (this build's chrome gutter,
so the panel lines up with the nav above it) rather than the live 88.55px, and
the see-all pills use the real `image.pink` / `image.sky` tokens rather than the
live values that sit one unit off them.

The eight icon-rail tints are off-palette pastels taken from the live site.
They are centralised in `RAIL` in `navMenus.ts` so they are one edit to re-map.

Keyboard access is additive: the live menus are hover-only with no keyboard
path, so the build keeps the hover behaviour and adds a real button toggle,
`aria-expanded`, Escape-to-close and close-on-focus-leave.

## Known debt

Ten AA failures remain, **all design-sourced** — the artboard's own values,
kept because the design is the source of truth. Full table in
`../FIGMA-DELTA.md`; each is a one-line fix if wanted.

`[YOUR BENCHMARK NUMBERS]` renders as the artboard's own chip. No published
figures exist — do not substitute invented numbers.

Mobile Proxies are absent from the availability list because the docs' table
does not cover them.

## Not done

**The mobile artboard `27889:14` has not been reconciled.** The responsive
rules are my own judgment. Verified only that 390px has no horizontal scroll, a
20px gutter, a stacked hero and internally-scrolling tables — not checked
section by section against the artboard.
