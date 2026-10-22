/**
 * 生成示例照片（抽象黑白景观）。
 * 用途：让你在没有自己的照片时也能看到完整效果。
 * 真正使用时：删掉 src/assets/photos 里的图，换成你自己的照片即可。
 *
 * 运行：node scripts/make-placeholders.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = 'src/assets/photos';

const toHex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
const gray = (v) => '#' + toHex(v) + toHex(v) + toHex(Math.max(0, v - 4));

function artwork(seed, w, h) {
  const rnd = (i) => {
    const x = Math.sin(seed * 127.1 + i * 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  const horizon = 0.52 + rnd(1) * 0.22;
  const top = 190 + rnd(2) * 55;
  const bottom = 110 + rnd(3) * 60;
  const sunX = 20 + rnd(4) * 60;
  const sunY = 10 + rnd(5) * 30;
  const hillA = 0.18 + rnd(6) * 0.2;
  const hillB = 0.18 + rnd(7) * 0.2;
  const hy = h * horizon;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${gray(top)}"/>
      <stop offset="100%" stop-color="${gray(bottom)}"/>
    </linearGradient>
    <radialGradient id="glow" cx="${sunX}%" cy="${sunY}%" r="55%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${gray(bottom - 20)}"/>
      <stop offset="100%" stop-color="${gray(bottom - 55)}"/>
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${Math.round(w * 0.012)}"/>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#sky)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <rect y="${hy}" width="${w}" height="${h - hy}" fill="url(#water)"/>
  <g filter="url(#soft)">
    <path d="M0 ${hy} L${w * hillA} ${hy - h * 0.13} L${w * (hillA + 0.22)} ${hy} Z" fill="${gray(48)}" opacity="0.85"/>
    <path d="M${w * (1 - hillB)} ${hy} L${w * (1 - hillB + 0.1)} ${hy - h * 0.2} L${w} ${hy - h * 0.02} L${w} ${hy} Z" fill="${gray(38)}" opacity="0.9"/>
    <ellipse cx="${w * (0.2 + rnd(8) * 0.6)}" cy="${hy + h * 0.14}" rx="${w * 0.16}" ry="${h * 0.012}" fill="#ffffff" opacity="0.12"/>
  </g>
</svg>`;
}

async function makeNoise(w, h) {
  const nw = Math.max(4, Math.round(w / 3));
  const nh = Math.max(4, Math.round(h / 3));
  const buf = Buffer.alloc(nw * nh * 3);
  for (let i = 0; i < buf.length; i += 3) {
    const v = 128 + (Math.random() - 0.5) * 90;
    buf[i] = buf[i + 1] = buf[i + 2] = v;
  }
  return sharp(buf, { raw: { width: nw, height: nh, channels: 3 } })
    .resize(w, h, { fit: 'fill' })
    .png()
    .toBuffer();
}

export async function makeImage(file, w, h, seed) {
  await mkdir(OUT, { recursive: true });
  const base = sharp(Buffer.from(artwork(seed, w, h)));
  const noise = await makeNoise(w, h);
  await base
    .composite([{ input: noise, blend: 'overlay' }])
    .modulate({ saturation: 0 })
    .jpeg({ quality: 86, chromaSubsampling: '4:2:0' })
    .toFile(path.join(OUT, file));
  console.log('✓', file);
}

const jobs = [];
let seed = 1;

// 作品封面 3:2
const workCovers = ['harbour', 'fog', 'ridge', 'dune', 'river', 'tower'];
for (const name of workCovers) jobs.push([`work-${name}-cover.jpg`, 2400, 1600, seed++]);

// 图集：纵向 4:5 与横向混排
jobs.push(['work-harbour-g1.jpg', 1600, 2000, seed++]);
jobs.push(['work-harbour-g2.jpg', 2400, 1600, seed++]);
jobs.push(['work-harbour-g3.jpg', 1600, 2000, seed++]);
jobs.push(['work-harbour-g4.jpg', 2400, 1600, seed++]);
jobs.push(['work-fog-g1.jpg', 2400, 1600, seed++]);
jobs.push(['work-fog-g2.jpg', 1600, 2000, seed++]);
jobs.push(['work-ridge-g1.jpg', 1600, 2000, seed++]);
jobs.push(['work-ridge-g2.jpg', 2400, 1600, seed++]);
jobs.push(['work-dune-g1.jpg', 2400, 1600, seed++]);
jobs.push(['work-river-g1.jpg', 1600, 2000, seed++]);
jobs.push(['work-tower-g1.jpg', 1600, 2000, seed++]);

// 文章封面
jobs.push(['essay-cover-1.jpg', 2000, 1400, seed++]);
jobs.push(['essay-cover-2.jpg', 2000, 1400, seed++]);
jobs.push(['essay-cover-3.jpg', 2000, 1400, seed++]);

// 系列封面 4:5
jobs.push(['series-coast.jpg', 1600, 2000, seed++]);
jobs.push(['series-cities.jpg', 1600, 2000, seed++]);
jobs.push(['series-winter.jpg', 1600, 2000, seed++]);

for (const [file, w, h, s] of jobs) await makeImage(file, w, h, s);
console.log('done:', jobs.length);
