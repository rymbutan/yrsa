# Private Archive — Immerse & Age-Gate Flow — Design Spec

## Context

Follow-up to `2026-08-04-landing-page-redesign-design.md`, which deliberately left "the Private Archive's actual functionality/access control" out of scope. This spec covers that access control: the flow a visitor goes through after clicking **Members** on the public homepage, based on a 3-screen mockup the user supplied (Landing → Immerse → Confirm 18+).

Access control here is an **age gate**, not an account system — no email/password, no signup form. This matches the site's existing no-backend, static-HTML approach (Tailwind CDN, GSAP + ScrollTrigger, no build step).

## Flow Overview

Three visual "screens," implemented as **one page** (`archive.html`) with JS-driven view states rather than three separate HTML files — there's no backend/router to justify multi-page plumbing, and a single page allows smooth GSAP cross-fades between states instead of full reloads.

1. **Landing** — `index.html`, unchanged. The existing hero + "Members" nav button is already the entry point shown in the mockup's first frame.
2. **Immerse** — `archive.html` default view. Replaces today's "Member access is coming soon" hero block with a teaser: full-bleed photo, `Members Only` headline, and an **ENTER** button.
3. **Confirm 18+** — a full-screen age-verification modal, triggered by ENTER, layered over Immerse.
4. **(post-confirm)** — reveals the site's existing "Member access is coming soon" copy in place, now gated behind the age check.

```
index.html (Members button)
  -> archive.html [Immerse view]
       -> ENTER clicked
            -> already verified (localStorage)? --------------------> [Coming-soon view]
            -> not verified -> [Age-gate modal]
                 -> CONTINUE (checkbox required) -> sets localStorage -> [Coming-soon view]
                 -> NOT NOW -> index.html
```

## Immerse View (`archive.html` default state)

- Full-bleed background photo reusing `assets/img/personal-portrait.jpg` (the blurred-figure-from-behind shot already used in the current archive hook), with a darkened gradient/grade overlay for a moodier "held back" feel than the public site.
- Header: wordmark (`Yrsaclicks`) on the left, **← Back** link on the right — same slot the "Members" button occupies on `index.html` — linking to `index.html`. This header persists across all three `archive.html` view-states (Immerse, age-gate, coming-soon), since it's one page — the coming-soon view's existing separate footer "← BACK TO HOME" link is removed as redundant now that the header covers it.
- Over the photo, bottom-anchored: `THE PRIVATE ARCHIVE` logline → **Members Only** headline → descriptive paragraph (reuse/adapt existing copy: *"Unreleased sets, uncut film, and frames that never make it to the public page. Nothing here is indexed or shared."*) → **ENTER** button.
- ENTER button style: pill-shaped, `brass` (`#876330`) fill — the token already exists in every page's Tailwind config but is currently only used for one decorative swatch on `index.html`. This gives it a real functional role as the archive flow's CTA color, distinct from the `pine` CTAs used on the public site.
- ENTER click behavior:
  - If `localStorage.yrsa_age_verified` is not set: fade in the age-gate modal (GSAP, reuse `power3.out` / 0.85s reveal timing already used site-wide).
  - If already set: skip the modal, fade directly to the coming-soon view.

## Age-Gate Modal (Confirm 18+)

- Full-screen fixed overlay, `ink` (`#2b241f`) background, fades in over Immerse (doesn't navigate away — same page, same URL).
- Centered card content:
  - `AGE VERIFICATION` logline label.
  - **You must be 18 or older** headline.
  - Description text: this area contains adult material; continuing confirms the visitor is of legal age and that viewing is lawful where they are.
  - Required checkbox: "I confirm I am 18 or older."
  - **CONTINUE** button — `brass` fill, matching ENTER — disabled until the checkbox is checked.
  - **NOT NOW** text link below CONTINUE.
  - Small disclaimer line under the buttons clarifying this is a self-declared confirmation (no ID/data collected) — consistent with the deliberate choice not to build email/password auth for this flow.
- CONTINUE behavior: sets `localStorage.yrsa_age_verified = '1'`, fades the modal out, reveals the coming-soon view.
- NOT NOW behavior: navigates back to `index.html` (treated as declining, same as backing out entirely — not just a step back to Immerse).

## Coming-Soon View (post-confirm)

Reuses the site's existing copy/layout verbatim (`PRIVATE ARCHIVE` logline, "Member access is coming soon." headline, description, "Get notified" CTA to `index.html#contact`) — just re-anchored as the third state in the new view-switching structure instead of the page's only content. Its old standalone footer back-link is dropped (see Immerse View header note above).

## Persistence

- `localStorage.yrsa_age_verified` — set on CONTINUE, checked on ENTER. No expiry; this is a static site with no session/account concept, so "remembered" means "remembered on this browser, indefinitely" until the visitor clears storage.
- No cookies, no server-side state — consistent with the no-backend constraint.

## Motion & Style

Reuse existing motion tokens rather than introducing new ones: `power3.out` / 0.85s for view-state reveals, `power2.out` / 0.3s for button hover/click feedback (mirroring the homepage's `members-btn` click "bling"). Respect `prefers-reduced-motion` exactly as `index.html` and the current `archive.html` already do (skip transform/opacity animation, snap to end state).

## Testing / Verification Plan

Manual browser QA (no test framework, consistent with the existing project):

- Click through the full flow at 375px, 768px, 1024px, 1440px: Members → Immerse → ENTER → age-gate → CONTINUE → coming-soon.
- Verify NOT NOW returns to `index.html`.
- Verify CONTINUE is disabled until the checkbox is checked.
- Reload `archive.html` after confirming once: ENTER should skip the age-gate modal and go straight to coming-soon.
- Clear localStorage and reload: age-gate should reappear on next ENTER.
- Verify `prefers-reduced-motion` fallback for the new view-transition animations.
- Verify keyboard/focus handling on the modal (checkbox and both buttons reachable via Tab; modal doesn't trap focus in a way that strands keyboard users).
- Verify no console errors.

## Out of Scope

- Real member-account creation, login, or any backend/database.
- Actual gated archive content (photos/video behind the gate) — the post-confirm view stays the existing "coming soon" placeholder.
- A `journal.html`-style separate page per screen — this is deliberately one page with JS states (see Flow Overview).
- The Fraunces typography variant (`archive-fraunces.html`) — this spec targets `archive.html` only; porting the flow to the Fraunces comparison file is a separate follow-up if that comparison is still active.
