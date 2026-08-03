# Landing Page Redesign — Design Spec

## Context

Yrsa is repositioning from "photography portfolio" to travel/adventure content creator. This spec covers **Spec #1: the public landing page and its new supporting pages** (structural + visual redesign). The Private Archive (members-only section) is deliberately out of scope — it gets its own follow-up spec — but this spec adds the nav entry point and placeholder page for it.

Still a static HTML/CSS/JS project (Tailwind CDN, GSAP + ScrollTrigger, Lenis) — no build step, no backend, no CMS.

## Site Structure

Three static pages:

- **`index.html`** (redesigned) — the existing single-scroll cinematic landing page, extended with new sections.
- **`journal.html`** (new) — lightweight page listing trip journal entries in full.
- **`archive.html`** (new) — minimal "Private Archive — coming soon" placeholder page.

## Landing Page Section Order

Menu overlay (Work · Journal · About · Private Archive · Inquire) → Hero (unchanged) → **Social proof** (new) → Horizontal gallery (unchanged, gains pine swatch) → **Video/reels showcase** (new) → **Journal teaser** (new, 2–3 cards → journal.html) → About (unchanged) → **Newsletter signup** (new) → Contact (unchanged) → Footer (unchanged).

Social proof sits right after the hero (establishes credibility early, before the visitor commits to scrolling further) rather than later near the conversion point.

## Visual System

- **Palette**: adds a seventh color, **pine** (`#3f4a3d`, "Deep Pine") to the existing bone/lavender/grey/ink/oxide/brass set. Pine becomes the site's primary interactive/feedback accent — nav/menu link hovers, the Inquire and Send-message buttons, contact form focus states, footer link hovers, custom cursor accent — replacing oxide/brass in those functional roles. Oxide/brass remain in decorative-only use (existing logline labels, stat numbers) — untouched, no unnecessary diff. New sections introduced in this spec use pine for their logline labels, marking them visually as the newer additions.
- **Typography — two deliverable versions**:
  - **Primary**: Montserrat (headings + body, unchanged) + IBM Plex Mono (logline), exactly as today.
  - **Secondary (comparison)**: identical in every other respect, but headline/display moments (hero H1, section H2s, journal/archive page titles) swap to **Fraunces** (warm editorial serif — "Field Journal" personality, matches the site's existing "field journal / shot log" copy voice). Body text, logline, nav, forms, and buttons stay Montserrat/IBM Plex Mono in both versions — functional UI is not affected by the font comparison, consistent with the existing "depth for showcase, restrained for functional UI" rule.
  - Delivered as parallel files: `index.html` / `journal.html` / `archive.html` (Montserrat) and `index-fraunces.html` / `journal-fraunces.html` / `archive-fraunces.html` (Fraunces headlines).

## New Sections — Content Approach

All new content is static/placeholder, matching the existing project's no-CMS approach. Real content (journal entries, video clips, social handles) gets dropped in later without a structural rebuild.

- **Social proof**: platform icons + follower counts + brand-collaboration logos. Flat/functional treatment (no Layered Depth tilt) — it's a trust bar, not showcase content. Placeholder numbers/logos.
- **Video/reels showcase**: a grid of video cards using the Layered Depth card shell. One real card uses the existing hero loop asset (`assets/video/loop.mp4`); remaining cards are explicit "coming soon" placeholders (no fake photo-as-video-thumbnail — stays honest about placeholder status).
- **Journal teaser**: 2–3 Layered Depth cards, each a placeholder trip excerpt linking to `journal.html#entry-slug`. `journal.html` itself lists the same entries in full with placeholder body copy.
- **Newsletter signup**: form UI shell only; `action` points at a placeholder third-party endpoint (e.g. Mailchimp/ConvertKit-style URL) rather than custom backend code — swapped for the real endpoint when Yrsa picks a provider.
- **Archive entry point**: menu link labeled "Private Archive," leading to `archive.html`, a minimal page stating member access is coming soon.

## Testing / Verification Plan

Manual browser QA (no test framework, consistent with the existing project):

- Check `index.html`, `journal.html`, `archive.html` (both font versions) at 375px, 768px, 1024px, 1440px.
- Verify `prefers-reduced-motion` fallback on any new reveal/hover motion.
- Verify the horizontal pinned gallery still works after the pine swatch addition.
- Verify pine meets ≥4.5:1 text contrast in every context it's used as a text/button color against bone.
- Verify no console errors on any of the six pages.

## Out of Scope

- The Private Archive's actual functionality/access control — separate spec.
- Real content for journal entries, video clips, and social proof data.
- Any backend, CMS, or database.
- A live font-toggle switch between the two versions — they are delivered as separate static files for comparison, not a runtime switch.
