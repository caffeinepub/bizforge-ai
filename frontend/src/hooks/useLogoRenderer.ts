import { LogoConcept } from '../backend';

export interface LogoVariant {
  id: string;
  name: string;
  renderSVG: (concept: LogoConcept, brandName: string) => React.ReactElement;
}

import React from 'react';

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function safeName(name: string): string {
  return name || 'Brand';
}

function renderWordmark(concept: LogoConcept, brandName: string): React.ReactElement {
  const name = safeName(brandName);
  const primary = concept.primaryColor || '#3498db';
  return React.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 300 150', width: '100%', height: '100%' },
    React.createElement('rect', { width: 300, height: 150, fill: primary }),
    React.createElement(
      'text',
      {
        x: 150,
        y: 85,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fill: '#ffffff',
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        letterSpacing: 2,
      },
      name
    )
  );
}

function renderLettermark(concept: LogoConcept, brandName: string): React.ReactElement {
  const name = safeName(brandName);
  const primary = concept.primaryColor || '#3498db';
  const initials = getInitials(name);
  return React.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 300 150', width: '100%', height: '100%' },
    React.createElement('rect', { width: 300, height: 150, fill: '#1a1a2e' }),
    React.createElement('circle', { cx: 150, cy: 75, r: 55, fill: primary }),
    React.createElement(
      'text',
      {
        x: 150,
        y: 75,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fill: '#ffffff',
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
      },
      initials
    )
  );
}

function renderEmblem(concept: LogoConcept, brandName: string): React.ReactElement {
  const name = safeName(brandName);
  const primary = concept.primaryColor || '#3498db';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#2ecc71';
  return React.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 300 150', width: '100%', height: '100%' },
    React.createElement('rect', { width: 300, height: 150, fill: '#0f0f1a' }),
    React.createElement('polygon', {
      points: '150,15 195,45 195,105 150,135 105,105 105,45',
      fill: 'none',
      stroke: primary,
      strokeWidth: 3,
    }),
    React.createElement('polygon', {
      points: '150,30 180,52 180,98 150,120 120,98 120,52',
      fill: primary,
      opacity: 0.2,
    }),
    React.createElement(
      'text',
      {
        x: 150,
        y: 68,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fill: secondary,
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        letterSpacing: 1,
      },
      name.toUpperCase()
    ),
    React.createElement(
      'text',
      {
        x: 150,
        y: 90,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fill: '#ffffff',
        fontSize: 9,
        fontFamily: 'Arial, sans-serif',
        letterSpacing: 2,
      },
      'EST. 2024'
    )
  );
}

function renderIconWordmark(concept: LogoConcept, brandName: string): React.ReactElement {
  const name = safeName(brandName);
  const primary = concept.primaryColor || '#3498db';
  return React.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 300 150', width: '100%', height: '100%' },
    React.createElement('rect', { width: 300, height: 150, fill: '#12121f' }),
    React.createElement('rect', { x: 30, y: 45, width: 60, height: 60, rx: 12, fill: primary }),
    React.createElement('line', { x1: 45, y1: 75, x2: 75, y2: 75, stroke: '#fff', strokeWidth: 3, strokeLinecap: 'round' }),
    React.createElement('line', { x1: 60, y1: 60, x2: 60, y2: 90, stroke: '#fff', strokeWidth: 3, strokeLinecap: 'round' }),
    React.createElement(
      'text',
      {
        x: 110,
        y: 70,
        dominantBaseline: 'middle',
        fill: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
      },
      name
    ),
    React.createElement(
      'text',
      {
        x: 112,
        y: 95,
        dominantBaseline: 'middle',
        fill: primary,
        fontSize: 10,
        fontFamily: 'Arial, sans-serif',
        letterSpacing: 2,
      },
      concept.logoStyle ? concept.logoStyle.toUpperCase() : 'BRAND'
    )
  );
}

function renderMonogram(concept: LogoConcept, brandName: string): React.ReactElement {
  const name = safeName(brandName);
  const primary = concept.primaryColor || '#3498db';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#e74c3c';
  const initials = getInitials(name);
  const letter1 = initials[0] || 'A';
  const letter2 = initials[1] || initials[0] || 'B';
  return React.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 300 150', width: '100%', height: '100%' },
    React.createElement('rect', { width: 300, height: 150, fill: '#0d0d1a' }),
    React.createElement('rect', { x: 80, y: 25, width: 140, height: 100, rx: 4, fill: 'none', stroke: primary, strokeWidth: 1.5 }),
    React.createElement(
      'text',
      {
        x: 130,
        y: 85,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fill: primary,
        fontSize: 52,
        fontWeight: 'bold',
        fontFamily: 'Georgia, serif',
        opacity: 0.9,
      },
      letter1
    ),
    React.createElement(
      'text',
      {
        x: 170,
        y: 85,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fill: secondary,
        fontSize: 52,
        fontWeight: 'bold',
        fontFamily: 'Georgia, serif',
        opacity: 0.9,
      },
      letter2
    )
  );
}

function renderAbstractMark(concept: LogoConcept, brandName: string): React.ReactElement {
  const name = safeName(brandName);
  const primary = concept.primaryColor || '#3498db';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#2ecc71';
  return React.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 300 150', width: '100%', height: '100%' },
    React.createElement('rect', { width: 300, height: 150, fill: '#0f0f1e' }),
    React.createElement('circle', { cx: 150, cy: 75, r: 45, fill: 'none', stroke: primary, strokeWidth: 2.5 }),
    React.createElement('circle', { cx: 130, cy: 65, r: 20, fill: primary, opacity: 0.7 }),
    React.createElement('circle', { cx: 170, cy: 85, r: 20, fill: secondary, opacity: 0.7 }),
    React.createElement('circle', { cx: 150, cy: 75, r: 12, fill: '#ffffff', opacity: 0.15 }),
    React.createElement(
      'text',
      {
        x: 150,
        y: 135,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fill: '#ffffff',
        fontSize: 11,
        fontFamily: 'Arial, sans-serif',
        letterSpacing: 3,
      },
      name.toUpperCase()
    )
  );
}

function renderMascotBadge(concept: LogoConcept, brandName: string): React.ReactElement {
  const name = safeName(brandName);
  const primary = concept.primaryColor || '#3498db';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#f39c12';
  return React.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 300 150', width: '100%', height: '100%' },
    React.createElement('rect', { width: 300, height: 150, fill: '#111122' }),
    React.createElement('polygon', {
      points: '150,10 220,40 240,115 150,140 60,115 80,40',
      fill: primary,
    }),
    React.createElement('polygon', {
      points: '150,22 210,48 228,112 150,132 72,112 90,48',
      fill: 'none',
      stroke: secondary,
      strokeWidth: 2,
    }),
    React.createElement('circle', { cx: 150, cy: 68, r: 22, fill: secondary }),
    React.createElement(
      'text',
      {
        x: 150,
        y: 68,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fill: '#111',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
      },
      getInitials(name)
    ),
    React.createElement(
      'text',
      {
        x: 150,
        y: 108,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fill: '#ffffff',
        fontSize: 10,
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        letterSpacing: 1.5,
      },
      name.toUpperCase().substring(0, 12)
    )
  );
}

function renderStackedWordmark(concept: LogoConcept, brandName: string): React.ReactElement {
  const name = safeName(brandName);
  const primary = concept.primaryColor || '#3498db';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#2ecc71';
  const words = name.trim().split(/\s+/);
  const line1 = words[0] || name;
  const line2 = words.slice(1).join(' ') || concept.logoStyle || 'STUDIO';
  return React.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 300 150', width: '100%', height: '100%' },
    React.createElement('rect', { width: 300, height: 150, fill: '#0a0a18' }),
    React.createElement('line', { x1: 60, y1: 75, x2: 240, y2: 75, stroke: primary, strokeWidth: 1, opacity: 0.4 }),
    React.createElement(
      'text',
      {
        x: 150,
        y: 58,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fill: '#ffffff',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        letterSpacing: 3,
      },
      line1.toUpperCase()
    ),
    React.createElement(
      'text',
      {
        x: 150,
        y: 92,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fill: secondary,
        fontSize: 14,
        fontFamily: 'Arial, sans-serif',
        letterSpacing: 6,
      },
      line2.toUpperCase()
    )
  );
}

function renderNegativeSpaceMark(concept: LogoConcept, brandName: string): React.ReactElement {
  const name = safeName(brandName);
  const primary = concept.primaryColor || '#3498db';
  const initials = getInitials(name);
  return React.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 300 150', width: '100%', height: '100%' },
    React.createElement('rect', { width: 300, height: 150, fill: primary }),
    React.createElement('rect', { x: 90, y: 20, width: 120, height: 110, rx: 8, fill: '#ffffff' }),
    React.createElement(
      'text',
      {
        x: 150,
        y: 75,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fill: primary,
        fontSize: 52,
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
      },
      initials
    ),
    React.createElement(
      'text',
      {
        x: 150,
        y: 138,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fill: '#ffffff',
        fontSize: 10,
        fontFamily: 'Arial, sans-serif',
        letterSpacing: 2,
      },
      name.toUpperCase()
    )
  );
}

function renderGradientWordmark(concept: LogoConcept, brandName: string): React.ReactElement {
  const name = safeName(brandName);
  const primary = concept.primaryColor || '#3498db';
  const secondary = (concept.secondaryColors && concept.secondaryColors[0]) || '#e74c3c';
  const gradId = 'grad-wm';
  return React.createElement(
    'svg',
    { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 300 150', width: '100%', height: '100%' },
    React.createElement(
      'defs',
      null,
      React.createElement(
        'linearGradient',
        { id: gradId, x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
        React.createElement('stop', { offset: '0%', stopColor: primary }),
        React.createElement('stop', { offset: '100%', stopColor: secondary })
      )
    ),
    React.createElement('rect', { width: 300, height: 150, fill: '#0a0a18' }),
    React.createElement(
      'text',
      {
        x: 150,
        y: 75,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        fill: 'url(#' + gradId + ')',
        fontSize: 38,
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif',
        letterSpacing: 2,
      },
      name
    ),
    React.createElement('rect', { x: 60, y: 100, width: 180, height: 2, fill: 'url(#' + gradId + ')' })
  );
}

export function buildLogoVariants(): LogoVariant[] {
  return [
    { id: 'wordmark', name: 'Wordmark', renderSVG: renderWordmark },
    { id: 'lettermark', name: 'Lettermark', renderSVG: renderLettermark },
    { id: 'emblem', name: 'Emblem', renderSVG: renderEmblem },
    { id: 'icon-wordmark', name: 'Icon + Wordmark', renderSVG: renderIconWordmark },
    { id: 'monogram', name: 'Monogram', renderSVG: renderMonogram },
    { id: 'abstract-mark', name: 'Abstract Mark', renderSVG: renderAbstractMark },
    { id: 'mascot-badge', name: 'Mascot-Style Badge', renderSVG: renderMascotBadge },
    { id: 'stacked-wordmark', name: 'Stacked Wordmark', renderSVG: renderStackedWordmark },
    { id: 'negative-space', name: 'Negative Space Mark', renderSVG: renderNegativeSpaceMark },
    { id: 'gradient-wordmark', name: 'Gradient Wordmark', renderSVG: renderGradientWordmark },
  ];
}

export function exportToPNG(svgElement: SVGSVGElement, filename: string): void {
  try {
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgElement);
    const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = svgElement.viewBox.baseVal.width || 300;
      canvas.height = svgElement.viewBox.baseVal.height || 150;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = filename + '.png';
      a.click();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
    };
    img.src = url;
  } catch (e) {
    console.error('Export failed', e);
  }
}
