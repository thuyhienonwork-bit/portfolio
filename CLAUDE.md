# CLAUDE.md

Personal portfolio of Thuy Hien (Ris) Nguyen. The live site is a single static
`index.html` (no build step) plus report images in `reports/`. It must keep
working when opened directly or served by GitHub Pages.

## Setup

- `npm install` installs `gsap`, `@gsap/react`, `lenis` and the `shadcn` CLI,
  then copies the browser builds into `vendor/` (`npm run vendor` re-copies).
  `index.html` loads GSAP, ScrollTrigger and Lenis from `vendor/`, never from
  `node_modules/`. Commit `vendor/` after upgrading a package.
- Official GSAP skills live in `.claude/skills/gsap-*` (from
  `greensock/gsap-skills`, MIT). Read the matching skill before writing GSAP code.
- `.mcp.json` registers the shadcn MCP server. `components.json` adds the
  React Bits registry as `@react-bits`, e.g. `npx shadcn add @react-bits/BlurText-TS-TW`.

## Motion rules

1. **Lenis for smooth scroll, exactly one instance.** Create it once at page
   (or app root) level, never per component or per section. Drive it from the
   GSAP ticker and keep ScrollTrigger in sync:
   ```js
   gsap.registerPlugin(ScrollTrigger);
   const lenis = new Lenis({ autoRaf: false });
   lenis.on('scroll', ScrollTrigger.update);
   gsap.ticker.add((time) => lenis.raf(time * 1000));
   gsap.ticker.lagSmoothing(0);
   ```
   In `index.html` the instance is `window.siteLenis` (null when reduced motion
   is on). Use `lenis.scrollTo()` for programmatic scrolling, `lenis.stop()` /
   `lenis.start()` around modals, and `data-lenis-prevent` on inner scroll areas.
2. **In React, use `useGSAP()` from `@gsap/react`**, not `useEffect`/`useLayoutEffect`,
   with a `scope` ref so selectors stay local and cleanup is automatic. Wrap
   event-handler animations in `contextSafe`. Register plugins once
   (`gsap.registerPlugin(useGSAP, ScrollTrigger)`).
3. **Prefer React Bits components** (via the shadcn MCP / `@react-bits` registry)
   before hand-writing an effect. Adapt them to the site's palette and fonts
   (CSS variables in `:root`).
4. **Respect `prefers-reduced-motion`.** With reduced motion: no Lenis (native
   scroll), no scroll-scrubbed or looping animation; show final states instead.
   Use `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)` for
   GSAP animations, and keep the existing CSS `@media (prefers-reduced-motion: reduce)` blocks.

## Checks before committing

- No horizontal scroll at 320, 360, 390, 768, 1024, 1440 px.
- Animations never hide content if JS fails to load.
