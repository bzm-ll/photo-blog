import sharp from 'sharp';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#111110"/>
      <stop offset="55%" stop-color="#2a2a27"/>
      <stop offset="100%" stop-color="#55544d"/>
    </linearGradient>
    <radialGradient id="r" cx="78%" cy="26%" r="45%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#r)"/>
  <g stroke="#fafaf8" fill="none" opacity="0.85">
    <circle cx="880" cy="315" r="150" stroke-width="1.5"/>
    <circle cx="880" cy="315" r="52" fill="#fafaf8" stroke="none" opacity="0.9"/>
    <path d="M60 470h420" stroke-width="1.5" opacity="0.55"/>
  </g>
</svg>`;
await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile('public/og-default.jpg');
console.log('og ok');
