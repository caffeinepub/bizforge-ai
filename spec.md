# Specification

## Summary
**Goal:** Expand the Logo Concept Generator's logo showcase from 4 variants to 10 distinct logo style variants, each rendered as inline SVG cards.

**Planned changes:**
- Replace the existing 4-variant logo showcase with a 10-variant showcase in the Logo Concept Generator card workspace
- Implement the following 10 logo style variants as inline SVGs using brand inputs (brand name, primary/secondary/accent colors, icon shape, font style):
  1. Wordmark — brand name in recommended font on primary color background
  2. Lettermark — initials as large bold type in a circle with primary and accent colors
  3. Emblem — brand name inside a geometric badge/shield with icon symbol
  4. Icon + Wordmark — geometric icon left of brand name on dark background with gold accent
  5. Monogram — all initials stacked/overlapping in a square frame
  6. Abstract Mark — geometric/abstract SVG shape with brand name caption on accent background
  7. Mascot-Style Badge — brand name in circular badge with stylized icon and tagline placeholder
  8. Stacked Wordmark — brand name split into two lines with SVG divider on dark background
  9. Negative Space Mark — icon as white cutout on primary color background with brand name below
  10. Gradient Wordmark — brand name with linear gradient (primary to secondary) on dark background
- Display all 10 variants in a responsive 2-column grid of SVG cards (~300×180px each)
- Label each card with its style name below the preview
- Add an individual download button per card that exports the SVG as a PNG file
- Use only basic SVG primitives (rect, circle, polygon, text, line, linearGradient, clipPath)

**User-visible outcome:** After generating a logo concept, users see 10 distinct logo style variants in a 2-column grid, each with a labeled style name and a download button to export that variant as a PNG.
