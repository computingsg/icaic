# ICAIC 2026 — Static / Client-Side Build (v2, verified)

Pure-HTML / CSS / JavaScript build of the ICAIC 2026 home page, converted
from the original PHP source (`index.php`). No server-side code required —
open `index.html` via a local server or any static host.

## v2 changes — countdown verified & fixed

The countdown was executed and verified with an automated jsdom test
harness that loads the real `index.html` + `jquery` + `scripts.js` and
reads the live DOM values. Results:

| Check                                              | Result |
| -------------------------------------------------- | ------ |
| Counter populated immediately on load (no flash)   | PASS   |
| Values match independent date arithmetic           | PASS   |
| Ticks correctly every second                       | PASS   |
| Expired state shows clean `0 / 0 / 0 / 0`          | PASS   |

Three problems were found in the **original** site's countdown and fixed
in `assets/js/scripts.js`:

1. **1-second stale flash.** `setInterval` doesn't fire immediately, so
   the original page showed its baked-in placeholder numbers
   (`116 / 8 / 4 / 28`) for a full second before the first update.
   Fixed: the counter now renders immediately on `DOMContentLoaded`.

2. **Buggy timezone "adjustment".** The original took the UTC instant
   `2026-09-20T08:00:00Z` and *added* 8 hours "for Singapore". A JS
   `Date` is an absolute instant — adding 8h just moved the deadline to
   `2026-09-21 00:00 SGT` for every visitor worldwide; it does not
   localize anything. Fixed: the target is now declared once with an
   explicit offset (`'2026-12-06T00:00:00+08:00'`), which is correct
   for all visitor timezones with no manual math.

3. **Wrong target date.** The original counted down to 20/21 September
   2026 while the page header advertises **6 – 10 December 2026**.
   Fixed: target set to conference start, midnight SGT, 6 Dec 2026.
   To change it, edit the single marked line at the top of
   `startCountdown()` in `assets/js/scripts.js`.

Counter appearance (from `styles.css`, unchanged): digits render at
4.5rem weight-600 in `--primary-light`, dropping to 2.75rem on mobile,
inside the bordered `#counter-border` container. Numbers are unpadded
(e.g. `8`, not `08`) — same as the original.

## Conversion notes (from v1)

1. **Removed PHP.** Only PHP present was a commented-out `$cur_page`
   navbar-class conditional; hard-coded to `sticky` to match the
   rendered page.
2. **Clean layout:**

   ```
   icaic-static/
   ├── index.html
   └── assets/
       ├── css/   all.min.css (Font Awesome), aos.css, bootstrap.min.css,
       │          google-fonts.css (was css2), plenary-speakers.css,
       │          slick.css, slick-theme.css, styles.css
       ├── js/    aos.js, bootstrap.bundle.min.js, jquery-3.4.1.min.js,
       │          scripts.js, slick.min.js   (all .js.download renamed)
       ├── img/   aNUS-logo-full-colour-4c.png, ai-image2.png,
       │          icaic-logo_2.png, nus-cs-logo.png
       ├── images/  (background images & video — missing, see below)
       └── fonts/   (slick icon font — missing, see below)
   ```

3. **Links:** all `https://icaic.sg/demo/*.php` rewired to relative
   `*.html` / `#anchor`. Sibling pages (`programme.html`,
   `registration.html`, `scam-alert.html`, `venue.html`, `tours.html`)
   still need converting from their PHP sources.
4. **Stripped runtime-injected DOM:** Slick's cloned slides /
   `slick-track` / inline transforms / dots removed (4 clean source
   slides remain; Slick rebuilds at load). AOS's `aos-init`/`aos-animate`
   classes removed (AOS re-applies them).
5. **Removed broken `fonts.css` link** (absent from the bundle).
6. **Email link** converted from a Gmail-compose URL to
   `mailto:xxx@xxx` — still a placeholder, swap in the real address.

## Missing media (not in the saved-page bundle)

The page renders and all JS works without these; you'll see a black
header (no video) and missing decorative backgrounds until they're
pulled from the production server (`https://icaic.sg/demo/images/...`):

- `assets/images/`: `ai_video.mp4`, `video-poster.png`,
  `divider-up.svg`, `divider-down.svg`, `random-bg-1.png`,
  `random-bg-2.png`, `random-bg-5.png`, `goals-container-bg.png`,
  `image-bg.png`, `image-fg.png`, `about-bg5.png`, `about-bg2-bw.jpg`,
  `goal-bg2.png`, `about-text-frame-mobile.png`,
  `about-palm-leaves-1.png`, `about-palm-leaves-2.png`,
  `text-frame2.png`, `text-frame2-mobile.png`, `quote-before.png`,
  `header-video-mobile-poster.png`
- `assets/img/`: `favicon.ico`
- `assets/fonts/`: `slick.eot`, `slick.woff`, `slick.ttf`, `slick.svg`
- `assets/css/`: `ajax-loader.gif` (slick spinner)

`styles.css` already references these at `../images/...`, which resolves
to `assets/images/` — just drop the files in, no code changes.

## Testing locally

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

Prefer a local server over `file://` (Google Fonts WOFF2 is CORS-blocked
from file URLs).

## Remaining work

- Convert remaining PHP pages (`programme.php`, `registration.php`,
  `scam-alert.php`, `venue.php`, `tours.php`, etc.).
- Replace `xxx@xxx` email placeholder.
- Source the missing media listed above.
