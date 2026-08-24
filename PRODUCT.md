# Richie Zhou — Portfolio

## What this is

A personal engineering portfolio. Single-page home with a long deliberate scroll,
plus two secondary routes (`/projects`, `/courses`). Deployed to GitHub Pages via
`gh-pages`, which is why routing uses `HashRouter`.

**Register: brand.** The design _is_ the product. A visitor's impression is the
deliverable, so the site has permission for ambitious first-load motion, pinned
scroll choreography, and single-purpose viewports.

## Audience

Engineering hiring managers and recruiters, on desktop most of the time, phone
some of the time. They are scanning for evidence of craft, not reading
documentation. The contact form exists to start a conversation about a role.

## Stack

- React 18 + Vite 6, plain JSX (no TypeScript)
- GSAP 3 + ScrollTrigger for choreography; Lenis for smooth scroll, driven off
  `gsap.ticker`
- Hand-written CSS, one file per section under `src/css/`. No framework.
- `react-router-dom` (HashRouter), `react-ga4`, `react-icons`

## Design system

### Palette

Sage off-white page, coral primary, with teal / pale-yellow / purple as
secondary accents. Committed rather than restrained: colour carries the brand.

Raw palette lives in `:root` / `[data-theme="dark"]` in `src/css/globals.css`.
On top of it sits a **semantic token layer** — use these, not the raw values:

| Token                                                     | Purpose                                                                       |
| --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `--on-accent`                                             | Text on any `--accent1` fill. Fixed dark; coral never flips.                  |
| `--accent1-ink` / `--accent4-ink`                         | Accent colours usable as _text_                                               |
| `--mat` / `--mat-ink` / `--mat-accent`                    | Permanently-light plate for transparent-PNG logos, and the inks that go on it |
| `--card` / `--card-border`                                | Themed card surface                                                           |
| `--badge-required` / `--badge-elective` / `--badge-level` | Course badge semantics                                                        |

The distinction that matters: `--accent1` and `--mat` are **the same value in
both themes**, so anything drawn on them needs non-flipping ink. Using
`var(--fg)` there is the bug that keeps recurring.

### Typography

Three families, each with one job:

- **rader** (italic, uppercase) — every display heading. The brand voice.
- **formula-narrow** — body copy.
- **supply-mono** — labels, eyebrows, metadata, buttons.

`globals.css` sets `h1,h2,h3 { font-family: rader; font-style: italic }`.
**If you override the family on a heading, override `font-style` too** — otherwise
you inherit the italic and get a synthetic oblique of a monospace face.

### Motion

The vocabulary is **physical cards and scrubbed choreography**, not fades:

- clip-path preloader → per-character wordmark reveal
- pinned scrub decks (featured-projects fan, expertise stack)
- parallax portrait, footer particle physics
- short clip-path wipe on route change

Tokens in `src/utils/motion.js`. Character reveals use `splitChars()` +
`.masked-line`. Reduced motion is handled in two places and both are required:
the block in `globals.css` (forces class-gated reveals to their end state) and
`src/utils/prefersReducedMotion.js` for anything JS-driven.

`will-change` is state-scoped, never declared permanently — gate it on `:hover`,
`.is-pinned`, or `.nav-overlay--animating`.

## Constraints

- **Static host.** No backend. The contact form drafts a message, copies it, and
  hands off to the visitor's mail client.
- **Assets are heavy.** Several project GIFs exceed 3 MB. Anything that preloads
  imagery must be gated on actually being visible.
- **Two themes are not optional.** Every surface needs to work in both. Verify,
  don't assume.
- **Prefer IntersectionObserver over scroll listeners.** Lenis already drives a
  rAF loop; a second scroll listener competes with it.

## Explicit non-goals

- Not a blog or CMS. No content pipeline.
- Not a design showcase for its own sake — motion serves the impression of craft,
  and "not too over" is a standing instruction.
