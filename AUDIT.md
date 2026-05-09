# Mi Corazón — Engineering Audit & Refactor Roadmap

This document captures the findings from the full-repo engineering audit and
sequences them into discrete merge units. Each section below is designed to be
shipped as its own PR / commit so that progress is incremental and reviewable.

> **Context.** Mi Corazón is a personal romantic gift web page, not a product.
> Architectural recommendations are scoped to that reality. Nothing here is
> "FAANG for FAANG's sake"; every item either reduces real risk, improves
> craftsmanship, or makes the artifact more durable for its actual purpose.

## How to use this doc

1. Work top-to-bottom. Tiers run **P0 → P3**. Each tier groups related work.
2. Each merge unit is **self-contained** — you can stop after any one and the
   repo stays consistent.
3. Tick the checkboxes in each unit as you go. The "Verify" subsection tells
   you how to confirm before merging.
4. The "Suggested commit" line is a starter — adjust as needed.

Audit finding IDs (e.g. `A1`, `D2`) referenced in each section map back to the
original audit categories: **A** Source integrity, **B** Architecture, **C**
Data, **D** Styling, **E** Accessibility, **F** Performance, **G** Privacy,
**H** State, **I** Tests/CI, **J** DX/Docs, **K** Visual polish.

---

## Priority overview

| # | Merge unit | Tier | Effort | Why this order |
|---|---|---|---|---|
| 1 | Restore missing source files | P0 | 5 min | Repo currently misrepresents the runtime |
| 2 | Repo hygiene (README, .gitignore) | P0 | 45 min | Anyone (incl. future you) needs to grok this |
| 3 | Privacy posture (noindex, dev UI check) | P0 | 15 min | Personal letters should not be SEO-indexed |
| 4 | Dead code purge (`LetterScene`) | P1 | 5 min | Trivial, removes a "which is canonical?" fork |
| 5 | Recipient config (single source of truth) | P1 | 30 min | One file controls name/initials/dates |
| 6 | Accessibility basics | P1 | 90 min | Reduced motion, lang tags, ARIA, focusable dots |
| 7 | Photo optimization + preload fix | P1 | 45 min | ~90% bandwidth reduction, fixes wasted preloads |
| 8 | Performance polish | P2 | 30 min | Cap arrays, persist counter, image decoding |
| 9 | Design tokens & typography mixins | P2 | 2 hr | Foundation for the primitive layer |
| 10 | Primitive components + `useSwipe` | P2 | 4 hr | Replaces ~60% of inline-style soup |
| 11 | Routing + state polish | P2 | 90 min | Declarative scenes, hash deep links |
| 12 | Build pipeline (Vite + single-file) | P3 | 4 hr | Drop Babel from runtime, real source-of-truth |
| 13 | Optional emotional polish | P3 | flexible | Resurrect envelope animation, "new letter" badge |

---

# P0 — Critical (do these first)

These are not aesthetic. They are correctness and integrity. Each is short.

---

## 1. Restore missing source files

**Audit findings:** A1
**Effort:** 5 min &nbsp;·&nbsp; **Risk:** none

### Problem

`index.html` loads three babel-compiled scripts that have no source-of-truth
in the working tree:

| Script (recovered name) | Provides |
|---|---|
| `flourishes.jsx` (~7.7 KB) | `Flourish`, `CornerScroll`, `OrnateFrame`, `BigRose`, `BigTulip`, `BigLily` |
| `petals.jsx` (~5.9 KB) | `Petal`, `PetalLayer`, `SparkleBurst` |
| `tweaks-panel.jsx` (~24.3 KB) | `useTweaks`, `TweaksPanel`, all `Tweak*` controls, the `__TWEAKS_STYLE` keyframe stylesheet |

These are referenced from `scenes.jsx:23,27,575,578`, `app.jsx:48,56`,
`jardin.jsx:159,488–509`, and bundle-only — but the source files are not
committed. A clone cannot reproduce the artifact.

### Tasks

- [ ] Recover the three files from the bundle (Claude can extract them; they
      were extracted to `/tmp/missing/*.jsx` during the audit).
- [ ] Commit them at the repo root next to the existing `*.jsx` files. Match
      the existing flat layout — do not introduce `src/` yet.
- [ ] Confirm the bundle still matches: each on-disk file should be
      byte-identical to its base64-compressed counterpart in the bundle
      manifest.

### Verify

Open the page in a browser. The welcome scene's lily/tulip should still
appear, the garden's tweaks panel should still toggle, petals should still
drift. No visual change expected.

### Suggested commit

```
chore: commit missing source for flourishes, petals, tweaks-panel

These were loaded by the bundle but absent from source control. Adding them
makes the working tree faithful to the deployed artifact.
```

---

## 2. Repo hygiene — README, .gitignore

**Audit findings:** J1, J2
**Effort:** 45 min &nbsp;·&nbsp; **Risk:** none

### Problem

No `README.md`, no `.gitignore`. A new contributor (or future you) opening
this repo cannot answer:

- What is this?
- How do I open / preview it?
- How is `index.html` related to the `*.jsx` files?
- How do I add a letter / a memory photo / change the recipient?
- How is it deployed?

### Tasks

- [ ] Add `README.md` covering, at minimum:
  - One-paragraph "what it is"
  - "How to view" (open `index.html` in a browser; or any static server)
  - The runtime model (single-file bundle, Babel-in-browser, source/jsx
    files committed alongside the artifact)
  - "How to add a letter" (edit `letters-data.jsx`)
  - "How to add a memory photo" (drop in `photos/`, append `MEMORIES` in
    `scenes.jsx`, add to preload list once unit #7 lands)
  - "How to change the recipient" (after unit #5: edit `recipient.jsx`)
  - Source/bundle relationship caveat (until unit #12: edits to source do
    not regenerate `index.html`)
- [ ] Add `.gitignore` with at least: `node_modules/`, `.DS_Store`, `dist/`,
      `*.log`, `.env*`.

### Verify

Both files exist; README renders correctly on GitHub.

### Suggested commit

```
docs: add README and .gitignore

README documents the bundle/source relationship and common edit tasks.
```

---

## 3. Privacy posture

**Audit findings:** G1, K3
**Effort:** 15 min &nbsp;·&nbsp; **Risk:** none

### Problem

- The page has no `<meta name="robots" content="noindex,nofollow">`. Search
  engines will index "Mi Corazón · para Jenni" and the letter contents.
- The deployed page may show the developer-only `TweaksPanel` to the
  recipient (theme/density/firefly/spanish controls in `jardin.jsx:488–510`).

### Tasks

- [ ] Add `<meta name="robots" content="noindex,nofollow">` to the inner
      template `<head>` of `index.html` (the template-string head, not the
      outer bootstrap head — that one gets discarded after unpack).
- [ ] Read `tweaks-panel.jsx` (after unit #1) and confirm:
  - It self-hides when not running inside the editor host, OR
  - The garden's `<TweaksPanel>` call is gated (e.g., `?dev` query param,
    `localStorage.dev === '1'`, or a `process.env.NODE_ENV === 'production'`
    style guard).
  - If neither is true, gate it behind `new URLSearchParams(location.search).has('dev')`.
- [ ] If the page is ever hosted publicly (Vercel/Netlify/etc.), add
      `robots.txt: User-agent: *\nDisallow: /` to the deploy.

### Verify

- View page source in a browser; the `noindex` meta should be present after
  the bundle unpacks (use DevTools → Elements, not "View Source", since the
  bundle replaces the document).
- Hit the deployed URL with no query string; the bottom-right "Tweaks" panel
  should not be visible.

### Suggested commit

```
chore: noindex the page and gate the dev tweaks panel

Add robots meta + ensure TweaksPanel only shows in editor/dev contexts.
```

---

# P1 — High impact, contained scope

---

## 4. Dead code purge — remove `LetterScene`

**Audit findings:** B4
**Effort:** 5 min &nbsp;·&nbsp; **Risk:** none

### Problem

`scenes.jsx:172–281` defines `LetterScene` (envelope-with-wax-seal animation
that opens to a hard-coded short letter). It is exported via `Object.assign`
at `scenes.jsx:617–619` but no caller renders it — `app.jsx:51` routes the
`'cartas'` scene to `<CartasScene/>`. It is 110 lines of fully-styled dead
code that diverges from the actual letter UI.

### Tasks

- [ ] Confirm no callers: `git grep LetterScene` returns only the definition
      and the export.
- [ ] Delete the function (`scenes.jsx:172–281`).
- [ ] Remove `LetterScene` from the `Object.assign(window, …)` at the bottom
      of `scenes.jsx`.
- [ ] If unit #13 (envelope animation) is on the roadmap, save the original
      JSX as a snippet in the PR description for later reference. Do NOT
      keep it commented out in the file.

### Verify

Visit every scene; nothing has changed.

### Suggested commit

```
refactor: remove dead LetterScene

Not rendered anywhere; CartasScene is the canonical letter UI.
```

---

## 5. Recipient configuration

**Audit findings:** C1
**Effort:** 30 min &nbsp;·&nbsp; **Risk:** low (regression: easy to miss a hardcoded "Jenni")

### Problem

The recipient's name "Jenni" and her dates are hardcoded in five+ places:

| Location | Use |
|---|---|
| `index.html` template `<title>` | tab title |
| `scenes.jsx:124` | welcome scene whisper |
| `scenes.jsx:611` | finale signature |
| `scenes.jsx:225` (dead `LetterScene`) | wax-seal initial |
| `cartas.jsx:153` | upcoming-card wax seal |
| `letters-data.jsx:11–124` | inlined throughout the prose |

Dates inside letter prose ("a month since", "half a year") will silently
become stale.

### Tasks

- [ ] Create `recipient.jsx` at repo root:
  ```js
  const RECIPIENT = {
    name: 'Jenni',
    initial: 'J',
    salutation: 'mi amor',
    anniversaryISO: '2025-10-04',
    birthdayISO: '2025-09-28',
  };
  Object.assign(window, { RECIPIENT });
  ```
- [ ] Add `<script type="text/babel" src="recipient.jsx"></script>` to the
      template — placed **before** any consumer script (after vendors, before
      `letters-data.jsx`).
- [ ] Replace the hardcoded `'Jenni'` and `'J'` references in:
  - `scenes.jsx:124,611` (and `:225,256` if `LetterScene` not yet removed)
  - `cartas.jsx:153`
  - `index.html` template `<title>`
- [ ] Leave the prose inside individual letters alone — the *content* is the
      gift. Only structural references (titles, seals, signatures) get
      templatized.

### Verify

`git grep -n "Jenni" .` returns hits **only** in `recipient.jsx` and the
`letters-data.jsx` prose body strings. The page renders identically.

### Suggested commit

```
refactor: extract recipient identity to a single config

Centralize name, initial, salutation, and key dates so structural
references stop drifting from each other.
```

---

## 6. Accessibility basics

**Audit findings:** E1, E2, E4, E5, E6
**Effort:** 90 min &nbsp;·&nbsp; **Risk:** low

This is one PR with five sub-changes — none alone is large enough to merit
its own commit, but together they raise the floor materially.

### Tasks

- [ ] **Reduced motion (E2).** Wrap the keyframe animations in
      `prefers-reduced-motion` guards. The animations live in the bundle's
      `tweaks-panel.jsx` `__TWEAKS_STYLE` and as inline `<style>` tags. After
      unit #1, you can edit them directly. Add at the bottom:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
  Highest-priority animations to neutralize: `kenBurns`, `pulseGlow`,
  `candleFlicker`, `floatSlow`, `fireflyDrift`, `petalFall`, `petalSpin`.
- [ ] **Language tagging (E4).** Set `<html lang="es">` in the template (the
      page is mostly Spanish). For English-language paragraphs in
      `letters-data.jsx`, wrap with `<span lang="en">` — easiest if you map
      paragraphs through a tiny helper that detects language by heuristic, or
      add a `lang: 'en' | 'es'` field per paragraph (more reliable).
- [ ] **Memory pagination dots (E1).** `scenes.jsx:524–531` renders dots as
      `<div>`. Convert to `<button>` with:
  ```jsx
  <button
    type="button"
    aria-label={`recuerdo ${i + 1} de ${MEMORIES.length}`}
    aria-current={i === idx ? 'true' : undefined}
    onClick={() => setIdx(i)}
    style={{ /* …keep visual, add background:none, border:none, padding:0 */ }}
  />
  ```
- [ ] **Pointer + keyboard navigation (E5).** Replace the per-scene
      `onTouchStart/onTouchEnd` with `onPointerDown/Up`. Add an
      `onKeyDown` handler at the scene root for `ArrowLeft` / `ArrowRight`
      (cartas, memories) and `Home` / `End` (jump to first/last). After unit
      #10's `useSwipe`, this becomes a one-liner.
- [ ] **Contrast (E6).** Audit the lowest-contrast text:
  - `cartas.jsx:228` `rgba(244,232,216,0.55)` over velvet → bump to `0.7`
  - Welcome footer `scenes.jsx:159` `opacity: 0.55` → `0.75`
  - Garden `rgba(244,232,216,0.7)` is fine; leave it.
- [ ] **ARIA labels (general):**
  - Wax seals: `aria-label="sello"` (or skip — purely decorative? mark
    `aria-hidden="true"`)
  - Garden surface: `role="application"` with `aria-label="jardín de
    corazones, toca para enviar un te amo"`
  - Heart-burst overlays: `aria-hidden="true"`

### Verify

- macOS: System Settings → Accessibility → Display → "Reduce motion" → toggle
  on, reload — animations should be near-instant.
- VoiceOver / NVDA on the cartas scene should announce navigation correctly
  and read Spanish words with Spanish phonemes.
- Tab through the memory scene; the dots should be focusable.
- Lighthouse accessibility score should rise (run with `--preset=desktop` to
  remove the bundle preload noise).

### Suggested commit

```
a11y: reduced motion, lang tags, focusable pagination, contrast

- Honor prefers-reduced-motion (kenBurns, pulseGlow, floatSlow, etc.)
- Tag content language (es/en) for screen readers
- Memory pagination dots are now <button>s with aria-current
- Bump low-contrast captions above WCAG AA threshold
```

---

## 7. Photo optimization + preload fix

**Audit findings:** F1, F2
**Effort:** 45 min &nbsp;·&nbsp; **Risk:** low (regression: photo paths)

### Problem

- 11 photos totaling ~10 MB; several individual files >1.5 MB.
- The `<link rel="preload" as="image" href="photos/…">` block in
  `index.html:24–34` lives in the **outer** `<head>` that the bundler
  loader replaces via `documentElement.replaceWith`. Those preloads fire,
  then are torn down before the React app uses them. Wasted bandwidth.

### Tasks

- [ ] **Optimize photos.** Convert to WebP at quality 80 and downscale to
      `1080px` long edge (the deployed frame is ~280 CSS px on mobile;
      1080 covers 3× DPR). One-shot script:
  ```bash
  cd photos
  for f in *.jpeg; do
    cwebp -q 80 -resize 1080 0 "$f" -o "${f%.jpeg}.webp"
  done
  ```
  Or with ImageMagick: `magick mogrify -resize 1080x -quality 80 -format webp *.jpeg`.
- [ ] **Keep JPEG fallbacks** at the same resized dimension for older Safari
      (iOS 13 and earlier — likely a non-concern for the recipient, but cheap
      insurance):
  ```bash
  magick mogrify -resize 1080x -quality 82 *.jpeg
  ```
- [ ] **Update photo references** in `MEMORIES` (`scenes.jsx:286–349`) and
      `jardin.jsx:395`:
  - Switch `background: url(photos/x.jpeg)` to `<img>` elements with
    `srcset` or a `<picture>` element supporting WebP + JPEG.
- [ ] **Move preloads** from the outer `<head>` (`index.html:24–34`) into
      the **inner template** `<head>` (the JSON-encoded template string in
      the `<script type="__bundler/template">` tag). Update the URLs to the
      `.webp` versions.
- [ ] **Lazy-load** non-current memories: `loading="lazy" decoding="async"`
      on every `<img>` except the first.

### Verify

- Network tab: total page weight drops from ~12 MB to ~2 MB.
- Memory scene: every photo still renders; check on Chrome and Safari.
- DevTools → Lighthouse → Performance score should improve markedly on
  mobile.

### Suggested commit

```
perf: WebP photos, fix preload location, lazy-load offscreen memories

Photos compressed from ~10MB total to ~1MB. Preloads now live in the
template head so they survive the bundle unpack. Non-current memory
photos are lazy-loaded.
```

---

# P2 — Quality, polish, and scaling

These are the substantive refactors. Each is bigger; pace yourself.

---

## 8. Performance polish

**Audit findings:** F4, F5, H2
**Effort:** 30 min &nbsp;·&nbsp; **Risk:** very low

Three small, independent tweaks that together feel disproportionately
nicer.

### Tasks

- [ ] **Cap garden ephemeral arrays (F5).** In `jardin.jsx` `surfaceTap`
      (`:213–243`), bound `bursts`, `messages`, `flowers` arrays so rapid
      tapping doesn't unbound-grow:
  ```js
  setBursts(b => [...b, { id, x: cx, y: cy }].slice(-20));
  setMessages(m => [...m, { ... }].slice(-15));
  ```
- [ ] **Persist te-amo counter (H2).** Wrap the garden's `count` state in a
      `localStorage`-backed hook. New file `hooks.jsx`:
  ```js
  function usePersistentState(key, initial) {
    const [v, setV] = React.useState(() => {
      try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
      catch { return initial; }
    });
    React.useEffect(() => {
      try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
    }, [key, v]);
    return [v, setV];
  }
  Object.assign(window, { usePersistentState });
  ```
  Use `usePersistentState('mc.gardenCount', 0)` in `HeartGardenScene`.
  Decide: do milestone messages re-trigger on reload? Probably no — store
  `lastSeenMilestone` too and skip already-seen ones.
- [ ] **Memoize photo backgrounds (F4).** In `MemoriesScene` `:443`, lift
      the `background:` style into a `useMemo` keyed on `m.photo`. Or, even
      better, replace the `<div style={{ background: url(…) }}>` with an
      `<img>` (already needed for unit #7). One change covers both.

### Verify

- Open the garden, tap furiously for ~30 seconds. DOM size should plateau,
  not grow.
- Garden counter survives a page refresh.
- Memory photos do not visibly re-decode when double-tapping to heart.

### Suggested commit

```
perf: cap ephemeral arrays, persist garden counter, memoize photo bg

- Garden bursts/messages/flowers slice() to last N entries
- te-amo count restored from localStorage on next visit
- Memory photo backgrounds no longer re-evaluated per heart tap
```

---

## 9. Design tokens & typography mixins

**Audit findings:** D1, E3
**Effort:** 2 hr &nbsp;·&nbsp; **Risk:** moderate (visual regressions if a token mis-extracted)

### Problem

Every component literalises every color, font, size, opacity. ~25
occurrences of `#E8C9A0`, ~30 of `#F4E8D8`, ~50 of `'Cormorant Garamond',
serif`, ~25 of `'Pinyon Script', cursive`. The "eyebrow" italic-uppercase
caption is reimplemented inline in 8+ places. Body text is italic
everywhere — fatiguing at the lengths in the April letter.

### Tasks

- [ ] Create `theme.jsx`:
  ```js
  const COLOR = {
    velvetDeep: '#0F0206', velvetMid: '#1A0508', velvetCore: '#4A0812',
    paperLight: '#F8EFDC', paperShadow: '#EFE3C8',
    ink: '#3A1A08', inkDeep: '#5C0010', inkBlood: '#8B0000',
    gold: '#E8C9A0', cream: '#F4E8D8', rose: '#FFB0B8', ember: '#C8102E',
    glow: 'rgba(200,16,46,0.5)',
  };
  const FONT = {
    serif: "'Cormorant Garamond', serif",
    script: "'Pinyon Script', cursive",
  };
  const SPACE = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
  const RADIUS = { paper: 3, pill: 999 };
  const TYPE = {
    eyebrow: {
      fontFamily: FONT.serif, fontStyle: 'italic',
      fontSize: 12, color: COLOR.gold,
      letterSpacing: 4, textTransform: 'uppercase',
      opacity: 0.8,
    },
    caption: {
      fontFamily: FONT.serif, fontStyle: 'italic',
      fontSize: 11, color: COLOR.gold,
      letterSpacing: 2, textTransform: 'uppercase',
      opacity: 0.7,
    },
    body: {
      fontFamily: FONT.serif, fontSize: 15,
      color: COLOR.cream, lineHeight: 1.6,
    },
    heading: {
      fontFamily: FONT.script, color: COLOR.rose,
      fontWeight: 400, lineHeight: 1,
    },
  };
  Object.assign(window, { COLOR, FONT, SPACE, RADIUS, TYPE });
  ```
- [ ] Add a `<script type="text/babel" src="theme.jsx"></script>` to the
      template, placed **before** `scenes.jsx` and friends.
- [ ] Migrate **one scene first** (suggest `WelcomeScene`) as a proof of
      concept. Diff visually before/after — should be pixel-identical.
- [ ] Once that lands cleanly, migrate `CartasScene`, `MemoriesScene`,
      `HeartGardenScene`, `FinaleScene` in separate commits within the same
      PR (or separate PRs — your call).
- [ ] **Italics decision (E3).** Make a deliberate call:
  - **Option A:** keep italic body (current). Accept the readability cost.
  - **Option B:** body becomes roman serif; salutation, closing, and titles
    stay italic/script. Recommended.
  Document the choice in `theme.jsx` so a future reader knows it's
  intentional.

### Verify

- Side-by-side screenshots of every scene before and after. The only
  differences should be intended (e.g., the italic→roman body switch if you
  picked option B).
- `git grep "'Cormorant Garamond'"` returns ≤2 hits (the token + maybe the
  bundle's `@font-face`).

### Suggested commit

```
refactor: extract design tokens and typography mixins

theme.jsx centralizes color, font, space, radius, and four typographic
identities (eyebrow, caption, body, heading). Scenes migrated to consume
tokens; visual output unchanged.

[Optional addendum: switched body copy from italic to roman serif for
readability; salutations and closings remain italic.]
```

---

## 10. Primitive components + `useSwipe`

**Audit findings:** B3, D2, D3, E5
**Effort:** ~4 hr &nbsp;·&nbsp; **Risk:** moderate (broad refactor surface)

### Problem

After tokens land, the next-largest source of inline-style repetition is
the structural primitives themselves — paper cards (5 variants), nav
buttons (3 implementations), wax seals (2 implementations), the velvet
glass pill (3 uses), and per-scene padding/eyebrow/title boilerplate.

### Tasks

- [ ] Create `primitives.jsx` with these small components, each one a thin
      wrapper using the tokens from #9:
  - `<PaperCard variant="letter|envelope|upcoming|photo">` — replaces 5 inline declarations
  - `<NavBtn size="sm|md">` — replaces `arrowBtn`, `cartasBtn`, `navBtnStyle`
  - `<WaxSeal initial={…} size={…}>` — unifies the two `J` seals
  - `<GlassPill>` — top nav bar, garden counter, countdown pill
  - `<Eyebrow>{children}</Eyebrow>` — adds `· … ·` decoration automatically
  - `<DotNav count={n} active={i} onSelect={…} />` — focusable dot pagination
  - `<SceneFrame eyebrow={…} title={…} script={…}>` — wraps the
    `padding 90px 24px 60px; sceneFadeIn` boilerplate at the top of every scene
- [ ] Create `hooks.jsx` (or extend it from #8) with:
  - `useSwipe({ onLeft, onRight, threshold = 50, edges = 'clamp' })` —
    one source of swipe truth; uses pointer events; supports keyboard
    arrows when bound to a focusable container
  - `useReducedMotion()` — `matchMedia` wrapper
- [ ] Refactor scenes scene-by-scene; each in its own commit:
  - `WelcomeScene` → `<SceneFrame>` + `<Eyebrow>` + `<NavBtn>`
  - `CartasScene` → `<PaperCard variant="letter">`, `<PaperCard variant="upcoming">`, `<NavBtn>`, `<WaxSeal>`, `useSwipe`
  - `MemoriesScene` → `<PaperCard variant="photo">`, `<DotNav>`, `useSwipe`
  - `HeartGardenScene` → `<PaperCard variant="photo">`, `<GlassPill>`, `useSwipe` (long-press still custom)
  - `FinaleScene` → `<SceneFrame>`, mostly cosmetic
- [ ] Delete the now-orphaned `arrowBtn`, `cartasBtn`, `navBtnStyle` const
      blocks and the per-scene swipe handlers.

### Verify

- Visual diff per scene — should be ≈identical (small acceptable improvements
  from spacing-rhythm cleanup if you take the chance).
- DOM keyboard navigation: arrows advance cartas/memories; tab order is
  sane; focus rings visible.
- Pointer events work in desktop browsers (mouse drag swipe).

### Suggested commit (one example; expect 5–6 in this unit)

```
refactor(cartas): consume PaperCard + NavBtn + WaxSeal + useSwipe

Replaces inline declarations of the three primitives now in
primitives.jsx. Behavior is unchanged; pointer events now also drive
swipe in addition to touch.
```

---

## 11. Routing + state polish

**Audit findings:** B2, H2 (deep-link)
**Effort:** 90 min &nbsp;·&nbsp; **Risk:** low

### Problem

`SCENES = ['welcome', 'cartas', 'memories', 'garden', 'finale']` plus
`SCENES[sceneIdx]` plus `SCENES.slice(1)` plus index arithmetic encodes
routing across multiple lines in `app.jsx`. There is no way to share or
return to a specific letter via URL.

### Tasks

- [ ] Replace the array of strings with a declarative table:
  ```js
  const SCENES = [
    { id: 'welcome',  label: 'inicio',    Component: WelcomeScene,    inNav: false },
    { id: 'cartas',   label: 'cartas',    Component: CartasScene,     inNav: true  },
    { id: 'memories', label: 'recuerdos', Component: MemoriesScene,   inNav: true  },
    { id: 'garden',   label: 'jardín',    Component: HeartGardenScene,inNav: true  },
    { id: 'finale',   label: 'siempre',   Component: FinaleScene,     inNav: true  },
  ];
  ```
  Drive both the renderer and the nav from this single source.
- [ ] Hash deep-linking: read `location.hash` once on mount, set scene
      accordingly. On scene change, `history.replaceState(null, '', '#/cartas')`.
      For cartas specifically, allow `#/cartas/4` to jump to letter index 4.
      Welcome scene is *intentionally* not a hash target — entering via the
      ritual is part of the gift; document this choice with a comment.
- [ ] On hash change (`window.addEventListener('hashchange', …)`), update
      the scene if appropriate.

### Verify

- Type `…/index.html#/garden` directly in the URL bar, hit enter — the
  garden loads (skipping welcome by design? or showing welcome first? —
  decide and document).
- Share `#/cartas/4` — opens directly to the May 2026 letter.
- Browser back button moves between scenes.

### Suggested commit

```
refactor: declarative SCENES table + hash-based deep links

Single source of truth for scene id/label/Component/inNav. Hash routing
allows linking to a specific letter (#/cartas/4).
```

---

# P3 — Long-term & optional

These change foundations or add nice-to-haves. Don't pick these up until
P0–P2 are healthy.

---

## 12. Build pipeline (Vite + single-file)

**Audit findings:** A2, F3
**Effort:** ~4 hr &nbsp;·&nbsp; **Risk:** high (changes everything; do last)

### Problem

`index.html` is generated by an external tool that is not in the repo. Edits
to source files do **not** regenerate the bundle. Babel standalone (~860 KB
compressed) is shipped to runtime to compile JSX in the browser — ~70% of
the JS payload is build infrastructure.

### Tasks

- [ ] `npm init -y`; pin Node version in `.nvmrc`.
- [ ] Add Vite + plugin:
  ```bash
  npm i -D vite @vitejs/plugin-react vite-plugin-singlefile
  ```
- [ ] `vite.config.mjs`:
  ```js
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  import { viteSingleFile } from 'vite-plugin-singlefile';

  export default defineConfig({
    plugins: [react(), viteSingleFile()],
    build: { target: 'es2020', cssCodeSplit: false, assetsInlineLimit: 100_000 },
  });
  ```
- [ ] Reorganize: introduce `src/` directory with `main.jsx` entry. Convert
      `Object.assign(window, …)` exports into proper ES module `export`s and
      `import`s.
- [ ] Move `photos/` to `public/photos/` so Vite copies them as static assets
      (or `import` each photo to let Rollup hash + inline if small enough).
- [ ] Scripts:
  ```json
  {
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview",
      "check": "node validate.mjs"
    }
  }
  ```
- [ ] Add `validate.mjs` — a tiny pre-build sanity script:
  - Every letter has `id`, `date`, `monthLabel`, `body`.
  - Every `dateISO` parses as a real date.
  - Every photo path in `MEMORIES` exists on disk.
  - Recipient initial is one character.
- [ ] Verify the `dist/index.html` Vite produces is a single, self-contained
      file. If it isn't, tighten `vite-plugin-singlefile` config.
- [ ] Update README's "How to deploy" section.

### Verify

- `npm run build` produces `dist/index.html` ≤ ~600 KB (no Babel runtime).
- Open `dist/index.html` directly via `file://` — works without a server.
- All scenes work, animations work, photos work.
- Source map is accurate (or stripped, your call) — debugger works.

### Suggested commit (this unit will be several commits)

```
build: replace external bundler with Vite single-file pipeline

- npm scripts: dev, build, preview, check
- vite-plugin-singlefile produces a portable dist/index.html
- ES modules replace window-globals; Babel runtime removed
- validate.mjs guards date parsing and photo references
```

---

## 13. Optional emotional polish

**Audit findings:** K1, K2, K5; product-thinking suggestions from the audit
**Effort:** flexible &nbsp;·&nbsp; **Risk:** low

These are the gift-quality touches. Pick whichever resonate.

### Tasks (à la carte)

- [ ] **First-open envelope animation.** Resurrect the wax-seal envelope
      from the old `LetterScene` as the first time a letter is opened in
      `CartasScene`. Track per-letter "opened" state in `localStorage`. Cracks
      audibly (subtle CSS animation), seal lifts, paper unfolds.
- [ ] **"New letter" badge.** When a new month is unlocked (e.g., the May 4
      letter on May 4 2026), show a subtle gold dot on the cartas tab in the
      top nav until the recipient opens it. Use `localStorage` to track
      acknowledgement.
- [ ] **Per-letter "last read" memory.** Below the cartas pagination,
      whisper text: `· última lectura: hace 3 días ·`. Stored in
      `localStorage`.
- [ ] **Garden return memory.** In the garden, on second-and-later visits,
      show a one-time message: `bienvenida de vuelta · {N} te amos en total`
      where `N` is the persisted count.
- [ ] **Welcome → cartas cross-fade.** Replace the abrupt scene swap on
      enter with a 600 ms cross-fade and a wax-seal-cracking microanimation.
- [ ] **Cartas pagination polish.** Replace the bare `‹ 1/12 ›` with a
      gold-dot row matching `MemoriesScene`. Use the `<DotNav>` primitive
      from unit #10.
- [ ] **Wax seal unification (K5).** The wax seals in the old `LetterScene`
      and `UpcomingCard` have slightly different gradient stops and sizes.
      Standardize on the more refined version inside `<WaxSeal>`.

### Verify

These are quality-of-feel changes — verify by using the page on a phone, in
the actual reading conditions Jenni will use it. Does the moment land?

### Suggested commits (one per chosen item)

```
feat: envelope-opens animation on first-time letter view
feat: gold-dot "new letter" indicator on the cartas nav tab
feat: persist last-read time per letter
feat: returning-visitor whisper in the garden
feat: cross-fade transition from welcome to cartas
feat: dot pagination for cartas matching memories
refactor: unify wax-seal primitives across letter and upcoming cards
```

---

# Appendix — what NOT to do

A short list of things that look like improvements but would harm this
artifact:

- **Don't add telemetry / analytics.** This is a personal gift; tracking
  whether and how often Jenni opens it is invasive.
- **Don't introduce TypeScript** unless the codebase grows substantially.
  The types-to-runtime ratio at this scale is poor.
- **Don't add a state library** (Redux, Zustand, Jotai). Local `useState` is
  the right answer.
- **Don't extract every component into its own file.** Five scenes living
  in five small files is fine; over-modularization adds friction without
  benefit.
- **Don't replace the soul.** The page is intentionally ornate, intentionally
  Spanish-first, intentionally over-the-top. "Clean it up" suggestions that
  fight that direction are wrong.

---

*Audit produced 2026-05-09. Re-evaluate after units 1–7 land.*
