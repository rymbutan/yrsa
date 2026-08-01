# UI/UX Polish Pass — Design Spec

## Context

The Yrsa photography portfolio is a single-page site (`index.html`) built with Tailwind CDN, GSAP + ScrollTrigger, and Lenis smooth scroll. It currently has:

- A fixed floating nav
- A full-bleed video hero with staggered text reveal
- A pinned horizontal-scroll gallery (desktop) / native swipe (mobile) with overlapping, tilted photo cards
- An About section (single portrait photo + bio text)
- A Contact section (dark background, form)
- A footer

There is no specific complaint driving this work — it's a general polish pass to make the site feel more fluid and more visually appealing. This is not a content or structural change: no new sections, no copy changes, no change to page order.

## Style Direction

Three treatment directions were mocked up and compared live (deep contrast + grain, big display type + pull quote, layered depth). **Layered Depth** was selected — an approach that extends the gallery's overlapping/tilted-photo language into other sections, using soft shadows and slight rotation to create a "stacked prints" feel.

## Scope Approach

**Depth for showcase content, restrained for functional UI.** The Layered Depth treatment applies to content/showcase moments (gallery, About) where it reinforces the site's "shot log" concept. Functional UI (nav, contact form, buttons) stays clean, flat, and highly legible — only receiving spacing/motion polish, not depth/tilt treatment. This preserves usability on interactive elements (touch targets, form legibility) while still visibly elevating the site. Motion refinement (easing, timing, transitions) applies consistently site-wide regardless of section.

---

## 1. Layered Depth System (shared visual language)

A reusable pattern, not one-off values per element, so the gallery and About section (and anything later) consume the same system:

- **Card shell**: rounded corners (`rounded-2xl`), a two-layer shadow (tight dark shadow + longer soft shadow, so cards read as resting slightly above the page rather than a flat drop-shadow), thin light border for edge definition against the bone background.
- **Tilt range**: constrained to −3° to +3°, alternating direction between stacked elements so overlaps read as deliberate, not random.
- **Depth order**: a consistent z-index rhythm (base → +1 → +2) so overlaps always look intentional.
- **Hover response** (interactive cards only): slight scale-up, shadow deepens, tilt eases toward 0° — tactile feedback without disrupting layout.
- **Shadow color**: warm ink-tinted shadow (not generic black), so it feels native to the site's palette (see Section 5).

Implementation note: expressed as a small set of reusable classes (e.g. a `.depth-card` pattern) rather than bespoke per-photo values, so the existing gallery panels get retrofitted onto this shared system instead of keeping their current one-off values.

## 2. Section-by-Section Application

| Section | Treatment |
|---|---|
| **Nav** | No depth treatment (functional). Polish: smoother hover underline on links, refined blur/opacity on the floating pill, subtle scroll-aware shrink (tighter padding after scrolling past hero). |
| **Hero** | No depth treatment. Motion-only refinement: smoother stagger timing between eyebrow/headline/subtext (currently mechanical), more considered scroll-cue animation. |
| **Intro/manifesto panel** (first horizontal gallery panel) | No depth treatment (text panel). Typography rhythm tightened — spacing between eyebrow/heading/body/swatches. |
| **Horizontal gallery** | Already uses overlap/tilt — retrofit onto the shared Layered Depth classes from Section 1 for consistency. Add hover-lift response. Smooth caption-reveal timing. |
| **About** | Full Layered Depth treatment: the existing portrait becomes the primary card, paired with a second, smaller overlapping card — a tighter cropped detail from the same portrait (hands/camera) — instead of one static image alone. Tightened paragraph/stat spacing. |
| **About → Contact seam** | Increased vertical breathing room at the boundary on both sides. Soft gradient transition easing the bone background into the dark ink background (rather than a hard cut), reinforced with a thin monospace divider line in the site's existing "log line" style — reads as a deliberate scene change. |
| **Contact** | No depth treatment (functional form — depth/tilt would hurt legibility). Polish: smoother input focus transitions, better label/field spacing rhythm, slightly more visual presence on the existing magnetic "Send message" button. |
| **Footer** | Spacing/typography polish only. No structural change. |

## 3. Motion System Refinements

- **Easing tokens** (replacing ad hoc per-section values):
  - Content reveals (fade/translate-in): `power3.out`, ~0.8–0.9s
  - Mask/clip-path wipes: `power4.inOut`, ~1.1s
  - Hover/micro-interactions: `power2.out`, ~0.25–0.4s
  - Scrubbed/parallax: linear (`none`), tied directly to scroll position — unchanged
- **Stagger rhythm**: tighten cascades so related elements (a heading + its supporting text, a set of stat counters) reveal in a consistent rhythm rather than popping in together.
- **Hover depth-shift**: the Section 1 hover response applied consistently to every Layered Depth card (About photos, gallery cards).
- **Section-boundary transitions**: extend the About→Contact gradient-seam treatment to other major handoffs — most notably hero-to-gallery, which currently cuts hard from video to bone background.
- **Reduced motion**: all of the above degrade to static end-states under `prefers-reduced-motion`, consistent with the site's existing handling (already implemented for reveals/cursor/parallax).

## 4. Typography & Spacing Rhythm

- **Two heading tiers below the hero**:
  - "Statement" tier: the gallery's intro/manifesto panel (closer to hero scale — it's the site's second big declarative moment)
  - "Section" tier: About and Contact headings unified to the same scale (currently mismatched: About uses `text-3xl md:text-4xl`, Contact uses `text-3xl md:text-5xl`)
- **Body text**: unify muted-text color usage (currently a mix of `ink/70`, `ink/75`, `bone/70`, `bone/85` without a clear rule) into two consistent tiers — primary body copy and secondary/caption text — each with a fixed line-height (1.6–1.7).
- **Line length**: standardize body paragraph containers to one consistent max-width column for a comfortable reading measure (currently `max-w-md`/`max-w-lg`/`max-w-xl` used inconsistently across sections).
- **Vertical rhythm**: standardize About/Contact section padding to one consistent value (`py-24 md:py-32`). Hero and horizontal gallery keep their own scroll-driven rhythm since they're choreographed differently by design.
- **Monospace "logline"**: unchanged — stays the unifying signature element, consistent size/letter-spacing everywhere.

## 5. Color & Imagery Treatment

- **Unifying photo filter**: one subtle CSS filter (gentle contrast lift, slight desaturation, slight warmth) applied via a shared class to every photo site-wide. The site's photography comes from mixed sources (professional travel shots vs. phone-shared portraits) with visibly different color grading; this filter makes them read as one cohesive body of work, especially now that the gallery overlaps them directly. This is distinct from the grain/vignette treatment considered (and rejected) during the visual comparison — no grain, no heavy vignette, just a light unifying grade.
- **Fuller palette use**: lavender and grey currently only appear in the small swatch decorations. Weave them into secondary background tints/borders on secondary elements so the full six-color palette feels used, not just bone/ink/oxide/brass with two colors left decorative-only.
- **Shadow color**: Layered Depth card shadows use a warm ink-tinted shadow (see Section 1) instead of a generic black default.
- **Hover accent consistency**: oxide/brass locked in as the one consistent "warm feedback" color for every hover/focus state site-wide (already mostly true — this makes it an explicit rule rather than a coincidence).

## Testing / Verification Plan

This is a static HTML/CSS/JS project with no test framework — verification is manual browser QA:

- Check every touched section at 375px, 768px, 1024px, and 1440px viewport widths.
- Verify `prefers-reduced-motion` fallback: all new hover/transition/seam-gradient additions must degrade to static end-states, no motion.
- Verify no regression to the existing horizontal pinned-scroll gallery (desktop pin behavior + mobile native-swipe fallback) after retrofitting its cards onto the shared Layered Depth classes.
- Verify text-over-image contrast remains ≥4.5:1 after the unifying photo filter is applied (existing site accessibility bar).
- Verify no console errors across the above breakpoints.

## Out of Scope

- No content/copy changes, no new sections, no change to information architecture (aside from the About→Contact seam treatment, which is visual, not structural).
- No change to the hero video or to which photos are used where.
- No build step or framework introduced — implementation stays within the existing single-file HTML + Tailwind CDN + GSAP/Lenis approach.
