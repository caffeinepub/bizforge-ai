import { useCallback } from 'react';
import type { LogoConcept } from '@/backend';

// Map icon concept text to a simple shape type
function mapIconConceptToShape(iconConcept: string): string {
  const text = iconConcept.toLowerCase();
  if (text.includes('wave') || text.includes('flow') || text.includes('curve')) return 'wave';
  if (text.includes('star') || text.includes('spark') || text.includes('shine')) return 'star';
  if (text.includes('hex') || text.includes('honeycomb')) return 'hexagon';
  if (text.includes('diamond') || text.includes('gem') || text.includes('crystal')) return 'diamond';
  if (text.includes('triangle') || text.includes('arrow') || text.includes('peak') || text.includes('mountain')) return 'triangle';
  if (text.includes('circle') || text.includes('round') || text.includes('globe') || text.includes('sphere')) return 'circle';
  if (text.includes('square') || text.includes('block') || text.includes('box')) return 'square';
  if (text.includes('bolt') || text.includes('lightning') || text.includes('energy')) return 'bolt';
  if (text.includes('cross') || text.includes('plus') || text.includes('health')) return 'cross';
  return 'abstract';
}

// Map font style text to CSS font properties
function mapFontStyle(fontStyle: string): { fontFamily: string; fontWeight: string; letterSpacing: string } {
  const text = fontStyle.toLowerCase();
  let fontFamily = 'Outfit, sans-serif';
  let fontWeight = '700';
  let letterSpacing = '0.02em';

  if (text.includes('serif') && !text.includes('sans')) {
    fontFamily = 'Georgia, serif';
  }
  if (text.includes('mono') || text.includes('code')) {
    fontFamily = 'monospace';
    letterSpacing = '0.05em';
  }
  if (text.includes('light') || text.includes('thin')) {
    fontWeight = '300';
  } else if (text.includes('bold') || text.includes('heavy') || text.includes('black')) {
    fontWeight = '800';
  } else if (text.includes('medium')) {
    fontWeight = '500';
  }
  if (text.includes('wide') || text.includes('spaced') || text.includes('tracking')) {
    letterSpacing = '0.12em';
  }
  if (text.includes('condensed') || text.includes('narrow') || text.includes('tight')) {
    letterSpacing = '-0.02em';
  }
  return { fontFamily, fontWeight, letterSpacing };
}

// Build a simple SVG icon using only basic primitives
function buildIconSVG(shape: string, color: string, size: number): string {
  const cx = size / 2;
  const cy = size / 2;
  const r = Math.round(size * 0.38);

  switch (shape) {
    case 'circle':
      return [
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="0.9"/>`,
        `<circle cx="${cx}" cy="${cy}" r="${Math.round(r * 0.55)}" fill="none" stroke="white" stroke-width="${Math.round(size * 0.04)}" opacity="0.4"/>`,
      ].join('');

    case 'wave':
      return [
        `<rect x="${Math.round(cx - r)}" y="${Math.round(cy - r * 0.35)}" width="${r * 2}" height="${Math.round(r * 0.28)}" rx="${Math.round(r * 0.14)}" fill="${color}" opacity="0.9"/>`,
        `<rect x="${Math.round(cx - r * 0.65)}" y="${Math.round(cy + r * 0.15)}" width="${Math.round(r * 1.3)}" height="${Math.round(r * 0.28)}" rx="${Math.round(r * 0.14)}" fill="${color}" opacity="0.55"/>`,
      ].join('');

    case 'star': {
      const outerR = r;
      const innerR = Math.round(r * 0.45);
      const pts: string[] = [];
      for (let i = 0; i < 10; i++) {
        const angle = (i * Math.PI) / 5 - Math.PI / 2;
        const rad = i % 2 === 0 ? outerR : innerR;
        pts.push(`${Math.round(cx + rad * Math.cos(angle))},${Math.round(cy + rad * Math.sin(angle))}`);
      }
      return `<polygon points="${pts.join(' ')}" fill="${color}" opacity="0.9"/>`;
    }

    case 'hexagon': {
      const hpts: string[] = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3 - Math.PI / 6;
        hpts.push(`${Math.round(cx + r * Math.cos(angle))},${Math.round(cy + r * Math.sin(angle))}`);
      }
      return `<polygon points="${hpts.join(' ')}" fill="${color}" opacity="0.9"/>`;
    }

    case 'diamond':
      return `<polygon points="${cx},${cy - r} ${cx + Math.round(r * 0.7)},${cy} ${cx},${cy + r} ${cx - Math.round(r * 0.7)},${cy}" fill="${color}" opacity="0.9"/>`;

    case 'triangle':
      return `<polygon points="${cx},${cy - r} ${cx + Math.round(r * 0.87)},${cy + Math.round(r * 0.5)} ${cx - Math.round(r * 0.87)},${cy + Math.round(r * 0.5)}" fill="${color}" opacity="0.9"/>`;

    case 'square':
      return `<rect x="${Math.round(cx - r * 0.75)}" y="${Math.round(cy - r * 0.75)}" width="${Math.round(r * 1.5)}" height="${Math.round(r * 1.5)}" rx="${Math.round(size * 0.06)}" fill="${color}" opacity="0.9"/>`;

    case 'bolt':
      return `<polygon points="${cx + Math.round(r * 0.2)},${cy - r} ${cx - Math.round(r * 0.3)},${cy + Math.round(r * 0.1)} ${cx + Math.round(r * 0.1)},${cy + Math.round(r * 0.1)} ${cx - Math.round(r * 0.2)},${cy + r} ${cx + Math.round(r * 0.3)},${cy - Math.round(r * 0.1)} ${cx - Math.round(r * 0.1)},${cy - Math.round(r * 0.1)}" fill="${color}" opacity="0.9"/>`;

    case 'cross':
      return [
        `<rect x="${Math.round(cx - r * 0.2)}" y="${cy - r}" width="${Math.round(r * 0.4)}" height="${r * 2}" rx="${Math.round(size * 0.04)}" fill="${color}" opacity="0.9"/>`,
        `<rect x="${cx - r}" y="${Math.round(cy - r * 0.2)}" width="${r * 2}" height="${Math.round(r * 0.4)}" rx="${Math.round(size * 0.04)}" fill="${color}" opacity="0.9"/>`,
      ].join('');

    default:
      return [
        `<circle cx="${Math.round(cx - r * 0.25)}" cy="${cy}" r="${Math.round(r * 0.65)}" fill="${color}" opacity="0.7"/>`,
        `<circle cx="${Math.round(cx + r * 0.25)}" cy="${cy}" r="${Math.round(r * 0.65)}" fill="${color}" opacity="0.7"/>`,
      ].join('');
  }
}

// ─── Variant Builders ────────────────────────────────────────────────────────

/**
 * WORDMARK — brand name rendered in styled typography on a solid/gradient background.
 */
function buildWordmarkSVG(concept: LogoConcept, brandName: string): string {
  const width = 400;
  const height = 160;
  const primary = concept.primaryColor || '#C9A84C';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#8B6914';
  const { fontFamily, fontWeight, letterSpacing } = mapFontStyle(concept.fontStyle);

  const nameFontSize = brandName.length > 14 ? 28 : brandName.length > 9 ? 36 : 44;
  const cx = width / 2;
  const cy = height / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="wm-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1A1A2E"/>
      <stop offset="100%" stop-color="#0D0D1A"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" rx="14" fill="url(#wm-bg)"/>
  <rect width="${width}" height="${height}" rx="14" fill="none" stroke="${primary}" stroke-width="1.5" opacity="0.3"/>
  <rect x="${Math.round(cx - 60)}" y="${Math.round(cy + nameFontSize * 0.55)}" width="120" height="3" rx="1.5" fill="${primary}" opacity="0.6"/>
  <text x="${cx}" y="${cy}" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="${nameFontSize}" letter-spacing="${letterSpacing}" fill="${primary}" text-anchor="middle" dominant-baseline="middle">${brandName}</text>
  <text x="${cx}" y="${Math.round(cy + nameFontSize * 0.55 + 16)}" font-family="Outfit, sans-serif" font-weight="400" font-size="11" letter-spacing="0.18em" fill="${secondary}" text-anchor="middle" opacity="0.75">${concept.logoStyle.toUpperCase()}</text>
</svg>`;
}

/**
 * LETTERMARK — 1–2 initials in a bold geometric container.
 */
function buildLettermarkSVG(concept: LogoConcept, brandName: string): string {
  const width = 400;
  const height = 160;
  const primary = concept.primaryColor || '#C9A84C';
  const accent = (concept.secondaryColors && concept.secondaryColors[0]) || '#8B6914';
  const { fontFamily, fontWeight } = mapFontStyle(concept.fontStyle);

  const initials = brandName
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const cx = width / 2;
  const cy = height / 2;
  const r = 52;
  const fontSize = initials.length === 1 ? 52 : 38;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="lm-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1A1A2E"/>
      <stop offset="100%" stop-color="#0D0D1A"/>
    </linearGradient>
    <linearGradient id="lm-circle" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${primary}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" rx="14" fill="url(#lm-bg)"/>
  <rect width="${width}" height="${height}" rx="14" fill="none" stroke="${primary}" stroke-width="1.5" opacity="0.25"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#lm-circle)"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${primary}" stroke-width="2" opacity="0.7"/>
  <circle cx="${cx}" cy="${cy}" r="${r - 6}" fill="none" stroke="${accent}" stroke-width="1" opacity="0.3"/>
  <text x="${cx}" y="${cy}" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="${fontSize}" fill="${primary}" text-anchor="middle" dominant-baseline="middle">${initials}</text>
</svg>`;
}

/**
 * EMBLEM — brand name inside a geometric badge/shield with icon.
 */
function buildEmblemSVG(concept: LogoConcept, brandName: string): string {
  const width = 400;
  const height = 160;
  const primary = concept.primaryColor || '#C9A84C';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#8B6914';
  const { fontFamily, fontWeight } = mapFontStyle(concept.fontStyle);

  const cx = width / 2;
  const cy = height / 2;
  const bw = Math.min(320, brandName.length * 18 + 80);
  const bh = 100;
  const bx = cx - bw / 2;
  const by = cy - bh / 2;

  const nameFontSize = brandName.length > 12 ? 20 : brandName.length > 8 ? 24 : 28;

  const hw = bw / 2;
  const hh = bh / 2;
  const pts = [
    `${cx - hw + 20},${cy - hh}`,
    `${cx + hw - 20},${cy - hh}`,
    `${cx + hw},${cy}`,
    `${cx + hw - 20},${cy + hh}`,
    `${cx - hw + 20},${cy + hh}`,
    `${cx - hw},${cy}`,
  ].join(' ');

  const shape = mapIconConceptToShape(concept.iconConcept);
  const iconSize = 22;
  const iconSVG = buildIconSVG(shape, primary, iconSize);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="em-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1A1A2E"/>
      <stop offset="100%" stop-color="#0D0D1A"/>
    </linearGradient>
    <linearGradient id="em-badge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${primary}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${secondary}" stop-opacity="0.08"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" rx="14" fill="url(#em-bg)"/>
  <polygon points="${pts}" fill="url(#em-badge)"/>
  <polygon points="${pts}" fill="none" stroke="${primary}" stroke-width="1.5" opacity="0.6"/>
  <g transform="translate(${Math.round(cx - iconSize / 2)},${Math.round(by + 10)})">${iconSVG}</g>
  <line x1="${bx + 20}" y1="${cy - 4}" x2="${cx - nameFontSize * brandName.length * 0.3 - 8}" y2="${cy - 4}" stroke="${primary}" stroke-width="1" opacity="0.3"/>
  <line x1="${cx + nameFontSize * brandName.length * 0.3 + 8}" y1="${cy - 4}" x2="${bx + bw - 20}" y2="${cy - 4}" stroke="${primary}" stroke-width="1" opacity="0.3"/>
  <text x="${cx}" y="${cy + 6}" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="${nameFontSize}" fill="${primary}" text-anchor="middle" dominant-baseline="middle" letter-spacing="0.06em">${brandName.toUpperCase()}</text>
  <text x="${cx}" y="${Math.round(by + bh - 14)}" font-family="Outfit, sans-serif" font-weight="400" font-size="9" letter-spacing="0.2em" fill="${secondary}" text-anchor="middle" opacity="0.7">${concept.logoStyle.toUpperCase()}</text>
</svg>`;
}

/**
 * ICON + WORDMARK — icon to the left of the brand name on a dark background.
 */
function buildIconWordmarkSVG(concept: LogoConcept, brandName: string): string {
  const width = 400;
  const height = 160;
  const iconSize = 72;
  const iconX = 48;
  const iconY = Math.round((height - iconSize) / 2);
  const textX = iconX + iconSize + 20;
  const textY = Math.round(height / 2);

  const primary = concept.primaryColor || '#C9A84C';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#8B6914';
  const accent = (concept.secondaryColors && concept.secondaryColors[1]) || primary;
  const { fontFamily, fontWeight, letterSpacing } = mapFontStyle(concept.fontStyle);

  const shape = mapIconConceptToShape(concept.iconConcept);
  const iconSVG = buildIconSVG(shape, accent, iconSize);

  const nameFontSize = brandName.length > 12 ? 22 : brandName.length > 8 ? 28 : 34;
  const taglineY = textY + 18;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="iw-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#111118"/>
      <stop offset="100%" stop-color="#0A0A12"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" rx="14" fill="url(#iw-bg)"/>
  <rect width="${width}" height="${height}" rx="14" fill="none" stroke="${primary}" stroke-width="1.5" opacity="0.2"/>
  <rect x="${iconX - 8}" y="${iconY - 8}" width="${iconSize + 16}" height="${iconSize + 16}" rx="16" fill="${primary}" opacity="0.08"/>
  <g transform="translate(${iconX},${iconY})">${iconSVG}</g>
  <line x1="${iconX + iconSize + 10}" y1="${Math.round(height * 0.25)}" x2="${iconX + iconSize + 10}" y2="${Math.round(height * 0.75)}" stroke="${primary}" stroke-width="1" opacity="0.2"/>
  <text x="${textX}" y="${textY - 2}" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="${nameFontSize}" letter-spacing="${letterSpacing}" fill="${primary}" dominant-baseline="auto">${brandName}</text>
  <text x="${textX}" y="${taglineY}" font-family="Outfit, sans-serif" font-weight="400" font-size="10" letter-spacing="0.16em" fill="${secondary}" opacity="0.7" dominant-baseline="auto">${concept.iconConcept.toUpperCase().slice(0, 28)}</text>
</svg>`;
}

/**
 * MONOGRAM — stacked/overlapping initials in a square frame.
 */
function buildMonogramSVG(concept: LogoConcept, brandName: string): string {
  const width = 400;
  const height = 160;
  const primary = concept.primaryColor || '#C9A84C';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#8B6914';
  const { fontFamily, fontWeight } = mapFontStyle(concept.fontStyle);

  const words = brandName.split(/\s+/);
  const initials = words.map((w) => w[0]).join('').toUpperCase().slice(0, 3);
  const cx = width / 2;
  const cy = height / 2;
  const boxSize = 90;
  const bx = cx - boxSize / 2;
  const by = cy - boxSize / 2;

  const fontSize = initials.length === 1 ? 60 : initials.length === 2 ? 44 : 32;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="mg-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1A1A2E"/>
      <stop offset="100%" stop-color="#0D0D1A"/>
    </linearGradient>
    <linearGradient id="mg-box" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${primary}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${secondary}" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" rx="14" fill="url(#mg-bg)"/>
  <rect width="${width}" height="${height}" rx="14" fill="none" stroke="${primary}" stroke-width="1" opacity="0.2"/>
  <rect x="${bx}" y="${by}" width="${boxSize}" height="${boxSize}" rx="8" fill="url(#mg-box)"/>
  <rect x="${bx}" y="${by}" width="${boxSize}" height="${boxSize}" rx="8" fill="none" stroke="${primary}" stroke-width="2" opacity="0.8"/>
  <rect x="${bx + 4}" y="${by + 4}" width="${boxSize - 8}" height="${boxSize - 8}" rx="5" fill="none" stroke="${secondary}" stroke-width="1" opacity="0.3"/>
  <text x="${cx}" y="${cy}" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="${fontSize}" fill="${primary}" text-anchor="middle" dominant-baseline="middle" letter-spacing="-0.02em">${initials}</text>
  <text x="${cx + boxSize / 2 + 16}" y="${cy - 8}" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="14" fill="${primary}" dominant-baseline="middle" opacity="0.9">${brandName}</text>
  <text x="${cx + boxSize / 2 + 16}" y="${cy + 12}" font-family="Outfit, sans-serif" font-weight="400" font-size="9" letter-spacing="0.18em" fill="${secondary}" dominant-baseline="middle" opacity="0.65">${concept.logoStyle.toUpperCase()}</text>
</svg>`;
}

/**
 * ABSTRACT MARK — geometric SVG shape with brand name caption on accent color background.
 */
function buildAbstractMarkSVG(concept: LogoConcept, brandName: string): string {
  const width = 400;
  const height = 160;
  const primary = concept.primaryColor || '#C9A84C';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#8B6914';
  const accent = (concept.secondaryColors && concept.secondaryColors[1]) || primary;
  const { fontFamily, fontWeight, letterSpacing } = mapFontStyle(concept.fontStyle);

  const cx = width / 2;
  const cy = height / 2;
  const nameFontSize = brandName.length > 14 ? 22 : brandName.length > 9 ? 28 : 34;

  // Abstract overlapping shapes
  const r1 = 38;
  const r2 = 28;
  const iconCx = 72;
  const iconCy = cy;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="am-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0F1020"/>
      <stop offset="100%" stop-color="#080810"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" rx="14" fill="url(#am-bg)"/>
  <rect width="${width}" height="${height}" rx="14" fill="none" stroke="${accent}" stroke-width="1" opacity="0.2"/>
  <!-- Abstract overlapping circles -->
  <circle cx="${iconCx - 14}" cy="${iconCy - 10}" r="${r1}" fill="${primary}" opacity="0.25"/>
  <circle cx="${iconCx + 14}" cy="${iconCy + 10}" r="${r2}" fill="${secondary}" opacity="0.35"/>
  <circle cx="${iconCx}" cy="${iconCy}" r="${Math.round(r1 * 0.55)}" fill="${accent}" opacity="0.5"/>
  <circle cx="${iconCx - 14}" cy="${iconCy - 10}" r="${r1}" fill="none" stroke="${primary}" stroke-width="1.5" opacity="0.6"/>
  <circle cx="${iconCx + 14}" cy="${iconCy + 10}" r="${r2}" fill="none" stroke="${secondary}" stroke-width="1" opacity="0.5"/>
  <!-- Divider -->
  <line x1="${iconCx + r1 + 10}" y1="${Math.round(height * 0.28)}" x2="${iconCx + r1 + 10}" y2="${Math.round(height * 0.72)}" stroke="${primary}" stroke-width="1" opacity="0.25"/>
  <!-- Brand name -->
  <text x="${iconCx + r1 + 26}" y="${cy - 6}" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="${nameFontSize}" letter-spacing="${letterSpacing}" fill="${primary}" dominant-baseline="middle">${brandName}</text>
  <text x="${iconCx + r1 + 26}" y="${cy + nameFontSize * 0.55}" font-family="Outfit, sans-serif" font-weight="400" font-size="10" letter-spacing="0.14em" fill="${secondary}" opacity="0.7">${concept.iconConcept.slice(0, 24).toUpperCase()}</text>
</svg>`;
}

/**
 * MASCOT-STYLE BADGE — circular badge with icon at top, brand name in center, tagline at bottom.
 */
function buildMascotBadgeSVG(concept: LogoConcept, brandName: string): string {
  const width = 400;
  const height = 160;
  const primary = concept.primaryColor || '#C9A84C';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#8B6914';
  const accent = (concept.secondaryColors && concept.secondaryColors[1]) || primary;
  const { fontFamily, fontWeight } = mapFontStyle(concept.fontStyle);

  const cx = width / 2;
  const cy = height / 2;
  const outerR = 68;
  const innerR = 60;

  const shape = mapIconConceptToShape(concept.iconConcept);
  const iconSize = 28;
  const iconSVG = buildIconSVG(shape, accent, iconSize);

  const nameFontSize = brandName.length > 12 ? 16 : brandName.length > 8 ? 19 : 22;

  // Arc text approximation using straight text on a curved path is complex; use positioned text instead
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="mb-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1A1A2E"/>
      <stop offset="100%" stop-color="#0D0D1A"/>
    </linearGradient>
    <linearGradient id="mb-badge" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${primary}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${secondary}" stop-opacity="0.08"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" rx="14" fill="url(#mb-bg)"/>
  <circle cx="${cx}" cy="${cy}" r="${outerR}" fill="url(#mb-badge)"/>
  <circle cx="${cx}" cy="${cy}" r="${outerR}" fill="none" stroke="${primary}" stroke-width="2" opacity="0.7"/>
  <circle cx="${cx}" cy="${cy}" r="${innerR}" fill="none" stroke="${secondary}" stroke-width="1" opacity="0.35"/>
  <!-- Icon at top -->
  <g transform="translate(${Math.round(cx - iconSize / 2)},${Math.round(cy - outerR * 0.62)})">${iconSVG}</g>
  <!-- Horizontal divider lines -->
  <line x1="${cx - 36}" y1="${cy - 10}" x2="${cx + 36}" y2="${cy - 10}" stroke="${primary}" stroke-width="1" opacity="0.4"/>
  <!-- Brand name center -->
  <text x="${cx}" y="${cy + 6}" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="${nameFontSize}" fill="${primary}" text-anchor="middle" dominant-baseline="middle" letter-spacing="0.04em">${brandName.toUpperCase()}</text>
  <!-- Tagline bottom -->
  <text x="${cx}" y="${cy + outerR * 0.58}" font-family="Outfit, sans-serif" font-weight="400" font-size="8" letter-spacing="0.2em" fill="${accent}" text-anchor="middle" opacity="0.8">${concept.logoStyle.toUpperCase()}</text>
</svg>`;
}

/**
 * STACKED WORDMARK — brand name split across two lines with SVG divider.
 */
function buildStackedWordmarkSVG(concept: LogoConcept, brandName: string): string {
  const width = 400;
  const height = 160;
  const primary = concept.primaryColor || '#C9A84C';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#8B6914';
  const { fontFamily, fontWeight, letterSpacing } = mapFontStyle(concept.fontStyle);

  const cx = width / 2;
  const cy = height / 2;

  // Split brand name into two halves
  const words = brandName.split(/\s+/);
  let line1: string;
  let line2: string;
  if (words.length >= 2) {
    const mid = Math.ceil(words.length / 2);
    line1 = words.slice(0, mid).join(' ');
    line2 = words.slice(mid).join(' ');
  } else {
    const mid = Math.ceil(brandName.length / 2);
    line1 = brandName.slice(0, mid);
    line2 = brandName.slice(mid);
  }

  const fontSize1 = line1.length > 10 ? 26 : line1.length > 6 ? 32 : 40;
  const fontSize2 = line2.length > 10 ? 22 : line2.length > 6 ? 28 : 34;
  const dividerW = Math.max(line1.length, line2.length) * fontSize1 * 0.55;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="sw-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#111118"/>
      <stop offset="100%" stop-color="#0A0A12"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" rx="14" fill="url(#sw-bg)"/>
  <rect width="${width}" height="${height}" rx="14" fill="none" stroke="${primary}" stroke-width="1.5" opacity="0.25"/>
  <!-- Line 1 -->
  <text x="${cx}" y="${cy - 22}" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="${fontSize1}" letter-spacing="${letterSpacing}" fill="${primary}" text-anchor="middle" dominant-baseline="middle">${line1.toUpperCase()}</text>
  <!-- Divider -->
  <rect x="${Math.round(cx - dividerW / 2)}" y="${cy - 4}" width="${Math.round(dividerW)}" height="2" rx="1" fill="${primary}" opacity="0.5"/>
  <rect x="${Math.round(cx - dividerW / 2 + 8)}" y="${cy - 1}" width="${Math.round(dividerW - 16)}" height="1" rx="0.5" fill="${secondary}" opacity="0.3"/>
  <!-- Line 2 -->
  <text x="${cx}" y="${cy + 26}" font-family="${fontFamily}" font-weight="400" font-size="${fontSize2}" letter-spacing="0.18em" fill="${secondary}" text-anchor="middle" dominant-baseline="middle">${line2.toUpperCase()}</text>
</svg>`;
}

/**
 * NEGATIVE SPACE MARK — icon as white cutout on primary color background with brand name below.
 */
function buildNegativeSpaceSVG(concept: LogoConcept, brandName: string): string {
  const width = 400;
  const height = 160;
  const primary = concept.primaryColor || '#C9A84C';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#8B6914';
  const { fontFamily, fontWeight, letterSpacing } = mapFontStyle(concept.fontStyle);

  const cx = width / 2;
  const cy = height / 2;
  const iconBgSize = 72;
  const iconBgX = cx - iconBgSize / 2;
  const iconBgY = cy - iconBgSize / 2 - 12;

  const shape = mapIconConceptToShape(concept.iconConcept);
  // Build icon in white for cutout effect
  const iconSVG = buildIconSVG(shape, '#ffffff', iconBgSize);

  const nameFontSize = brandName.length > 14 ? 16 : brandName.length > 9 ? 20 : 24;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="ns-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1A1A2E"/>
      <stop offset="100%" stop-color="#0D0D1A"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" rx="14" fill="url(#ns-bg)"/>
  <rect width="${width}" height="${height}" rx="14" fill="none" stroke="${primary}" stroke-width="1" opacity="0.2"/>
  <!-- Colored icon background block -->
  <rect x="${iconBgX}" y="${iconBgY}" width="${iconBgSize}" height="${iconBgSize}" rx="12" fill="${primary}" opacity="0.95"/>
  <!-- White icon cutout -->
  <g transform="translate(${iconBgX},${iconBgY})" style="mix-blend-mode:screen">${iconSVG}</g>
  <!-- Brand name below icon -->
  <text x="${cx}" y="${iconBgY + iconBgSize + 18}" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="${nameFontSize}" letter-spacing="${letterSpacing}" fill="${primary}" text-anchor="middle" dominant-baseline="middle">${brandName}</text>
  <text x="${cx}" y="${iconBgY + iconBgSize + 36}" font-family="Outfit, sans-serif" font-weight="400" font-size="9" letter-spacing="0.2em" fill="${secondary}" text-anchor="middle" opacity="0.65">${concept.logoStyle.toUpperCase()}</text>
</svg>`;
}

/**
 * GRADIENT WORDMARK — brand name text filled with linear gradient (primary to secondary) on dark background.
 */
function buildGradientWordmarkSVG(concept: LogoConcept, brandName: string): string {
  const width = 400;
  const height = 160;
  const primary = concept.primaryColor || '#C9A84C';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#8B6914';
  const accent = (concept.secondaryColors && concept.secondaryColors[1]) || primary;
  const { fontFamily, fontWeight, letterSpacing } = mapFontStyle(concept.fontStyle);

  const cx = width / 2;
  const cy = height / 2;
  const nameFontSize = brandName.length > 14 ? 30 : brandName.length > 9 ? 40 : 52;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="gw-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0A0A14"/>
      <stop offset="100%" stop-color="#060608"/>
    </linearGradient>
    <linearGradient id="gw-text" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${primary}"/>
      <stop offset="50%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="${secondary}"/>
    </linearGradient>
    <linearGradient id="gw-line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${primary}" stop-opacity="0"/>
      <stop offset="50%" stop-color="${primary}" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="${secondary}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" rx="14" fill="url(#gw-bg)"/>
  <!-- Subtle glow behind text -->
  <ellipse cx="${cx}" cy="${cy}" rx="${Math.round(nameFontSize * brandName.length * 0.28)}" ry="${Math.round(nameFontSize * 0.7)}" fill="${primary}" opacity="0.06"/>
  <!-- Gradient text -->
  <text x="${cx}" y="${cy}" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="${nameFontSize}" letter-spacing="${letterSpacing}" fill="url(#gw-text)" text-anchor="middle" dominant-baseline="middle">${brandName}</text>
  <!-- Gradient underline -->
  <rect x="${Math.round(cx - 80)}" y="${Math.round(cy + nameFontSize * 0.52)}" width="160" height="2" rx="1" fill="url(#gw-line)"/>
  <!-- Tagline -->
  <text x="${cx}" y="${Math.round(cy + nameFontSize * 0.52 + 16)}" font-family="Outfit, sans-serif" font-weight="400" font-size="10" letter-spacing="0.22em" fill="${secondary}" text-anchor="middle" opacity="0.6">${concept.fontStyle.toUpperCase().slice(0, 24)}</text>
</svg>`;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export interface LogoVariant {
  styleType: string;
  styleName: string;
  svgString: string;
}

export function buildLogoVariants(concept: LogoConcept, brandName: string): LogoVariant[] {
  return [
    {
      styleType: 'wordmark',
      styleName: 'Wordmark',
      svgString: buildWordmarkSVG(concept, brandName),
    },
    {
      styleType: 'lettermark',
      styleName: 'Lettermark',
      svgString: buildLettermarkSVG(concept, brandName),
    },
    {
      styleType: 'emblem',
      styleName: 'Emblem',
      svgString: buildEmblemSVG(concept, brandName),
    },
    {
      styleType: 'icon-wordmark',
      styleName: 'Icon + Wordmark',
      svgString: buildIconWordmarkSVG(concept, brandName),
    },
    {
      styleType: 'monogram',
      styleName: 'Monogram',
      svgString: buildMonogramSVG(concept, brandName),
    },
    {
      styleType: 'abstract-mark',
      styleName: 'Abstract Mark',
      svgString: buildAbstractMarkSVG(concept, brandName),
    },
    {
      styleType: 'mascot-badge',
      styleName: 'Mascot-Style Badge',
      svgString: buildMascotBadgeSVG(concept, brandName),
    },
    {
      styleType: 'stacked-wordmark',
      styleName: 'Stacked Wordmark',
      svgString: buildStackedWordmarkSVG(concept, brandName),
    },
    {
      styleType: 'negative-space',
      styleName: 'Negative Space Mark',
      svgString: buildNegativeSpaceSVG(concept, brandName),
    },
    {
      styleType: 'gradient-wordmark',
      styleName: 'Gradient Wordmark',
      svgString: buildGradientWordmarkSVG(concept, brandName),
    },
  ];
}

// Keep original buildLogoSVG for backward compatibility
export function buildLogoSVG(concept: LogoConcept, brandName: string): string {
  const width = 480;
  const height = 160;
  const iconSize = 96;
  const iconX = 24;
  const iconY = Math.round((height - iconSize) / 2);
  const textX = iconX + iconSize + 24;
  const textY = Math.round(height / 2);

  const shape = mapIconConceptToShape(concept.iconConcept);
  const { fontFamily, fontWeight, letterSpacing } = mapFontStyle(concept.fontStyle);
  const primaryColor = concept.primaryColor || '#C9A84C';
  const secondaryColor = (concept.secondaryColors && concept.secondaryColors[0]) || '#8B6914';

  const bgColor = '#1A1A2E';
  const bgColor2 = '#0D0D1A';

  const iconSVG = buildIconSVG(shape, primaryColor, iconSize);

  const nameFontSize = brandName.length > 12 ? 26 : brandName.length > 8 ? 32 : 38;
  const taglineFontSize = 12;
  const taglineY = textY + taglineFontSize + 8;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="lgBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${bgColor}"/>
      <stop offset="100%" stop-color="${bgColor2}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" rx="14" fill="url(#lgBg)"/>
  <rect width="${width}" height="${height}" rx="14" fill="none" stroke="${primaryColor}" stroke-width="1.5" opacity="0.35"/>
  <circle cx="${iconX + iconSize / 2}" cy="${iconY + iconSize / 2}" r="${iconSize / 2}" fill="${secondaryColor}" opacity="0.15"/>
  <g transform="translate(${iconX},${iconY})">${iconSVG}</g>
  <line x1="${iconX + iconSize + 12}" y1="${Math.round(height * 0.22)}" x2="${iconX + iconSize + 12}" y2="${Math.round(height * 0.78)}" stroke="${primaryColor}" stroke-width="1" opacity="0.25"/>
  <text x="${textX}" y="${textY - 2}" font-family="${fontFamily}" font-weight="${fontWeight}" font-size="${nameFontSize}" letter-spacing="${letterSpacing}" fill="${primaryColor}" dominant-baseline="auto">${brandName}</text>
  <text x="${textX}" y="${taglineY}" font-family="Outfit, sans-serif" font-weight="400" font-size="${taglineFontSize}" letter-spacing="0.14em" fill="${secondaryColor}" opacity="0.8" dominant-baseline="auto">${concept.logoStyle.toUpperCase()}</text>
  <rect x="${textX}" y="${taglineY + 10}" width="56" height="2" rx="1" fill="${primaryColor}" opacity="0.45"/>
</svg>`;
}

export function useLogoRenderer() {
  const exportToPNG = useCallback(
    (svgString: string, brandName: string, suffix?: string): void => {
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safeName = brandName.replace(/\s+/g, '-').toLowerCase();
      a.download = suffix
        ? `${safeName}-logo-${suffix}.svg`
        : `${safeName}-logo.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    []
  );

  return { exportToPNG, buildLogoSVG };
}
