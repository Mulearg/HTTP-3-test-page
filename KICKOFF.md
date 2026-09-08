# Kickoff prompt — HTTP/3 landing page → code

Open a new Claude Code session with `C:\Users\User\rayobyte-http3` as the working
directory, then paste everything below the line.

---

Build code from a finished Figma landing page design. Everything below was produced in a prior session; nothing needs redesigning.

## Source of truth

Figma file key: `dOmspApFU8JeMbBiot0r71` ("Rayobyte style"), page `27809:20` ("HTTP/3 landing page").

- Desktop artboard: node `27881:14` — 1440 wide, 12 sections
- Mobile artboard: node `27889:14` — 390 wide, same 12 sections, content parity verified
- Button components: `Button / Primary` `28004:50` (State × Layout, 6 variants), `Button / Secondary` `28006:20` (3), `Button / Nav` `28006:27` (3). All have hover/press variants wired as prototype interactions and a `Label` text property.

Section order on both artboards: Nav, Hero, Stat band/grid, Why HTTP3, Comparison, Protocols and ports, How you connect, Where it runs, Traps, Proof, Closing CTA, Footer. There is deliberately NO pricing section.

## Local files (working directory)

- `rayobyte.tokens.json` — W3C DTCG brand tokens. READ THIS FIRST. Colour, type ramp, radius, spacing, gradients, an `icon` group, a `button` group with measured per-state specs, and a `_rules` group of hard constraints.
- `CONTENT-v2.md` — the approved copy spec, sourced from https://docs.rayobyte.com/proxies/
- `Main.dc.html` / `Mobile.dc.html` — earlier HTML drafts. Structural reference only; they predate several design corrections, so Figma + the token file win where they disagree.
- `assets/` — real brand assets: `logo-black.svg`, `logo-white.svg` (175×33 lockups), `award.png`, `qr.svg`, `youtube.svg`, `x.svg` (the social SVGs already include their own bordered boxes — do not redraw the box).

## Before you start

1. Ask which target is wanted. It was never settled: the site runs on **Webflow** (project `rayobyte-staging-497d1c`, Webflow MCP tools available), but plain HTML/CSS or React are equally plausible. If Webflow, the existing project likely already has nav/footer/button classes worth reusing rather than rebuilding.
2. Load the `figma-design-to-code` skill BEFORE calling `get_design_context` — it is a mandatory prerequisite.
3. Read `_rules` in the token file. Several entries exist because they were violated during the design build.

## Constraints that will bite

- **Fonts**: Plus Jakarta Sans 400–700 only. JetBrains Mono appears in exactly two code blocks and is a documented exception to "no secondary face".
- **`action.cta #04B81E` is a fill, never type.** As type it is 2.66:1 and fails AA. Affirmative text uses `image.sky-deep #016F74`.
- **`action.nav #1B4DCA` is the nav-bar CTA only.** Never a body CTA, never an icon.
- **Six colours are retired** and must not appear: `#A358FC #FFBE38 #FF5A3C #FF7A08 #1EB84B #18B82A`.
- **Secondary button** carries `box-shadow: #04B81E 3px 3px 0 0` — hard, zero blur, zero spread. Hover removes it entirely (`box-shadow: none`). Any blur destroys the effect.
- **Primary button hover** is recorded as `#81A786` because that is what production ships, but the token file flags it as probably a bug; `action.cta-hover #03A01A` is the better value. Raise this rather than silently picking.

## Two unresolved content items

- `[YOUR BENCHMARK NUMBERS]` in the Comparison section is an intentional placeholder — no published figures exist.
- Whether Mobile Proxies support HTTP/3 is unknown; the docs' availability table covers only Residential / Rotating ISP / Rotating DC. HTTP/3 is Residential-only among those three.

Start by reading `rayobyte.tokens.json` and `CONTENT-v2.md`, then ask about the target platform.
