import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Standard high-res icon SVG (512x512)
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#141c2b" />
      <stop offset="55%" stop-color="#080c14" />
      <stop offset="100%" stop-color="#020306" />
    </radialGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdf3d6" />
      <stop offset="35%" stop-color="#e2ba6d" />
      <stop offset="70%" stop-color="#b68936" />
      <stop offset="100%" stop-color="#e8c782" />
    </linearGradient>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f6dfa9" />
      <stop offset="50%" stop-color="#9d7426" />
      <stop offset="100%" stop-color="#f2d79d" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />

  <!-- Outer ambient ring -->
  <circle cx="256" cy="256" r="206" fill="none" stroke="url(#ringGrad)" stroke-width="2.5" opacity="0.35" />
  
  <!-- Main luxury geometric ring -->
  <circle cx="256" cy="256" r="192" fill="none" stroke="url(#ringGrad)" stroke-width="6" />

  <!-- Inner accent ring -->
  <circle cx="256" cy="256" r="176" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.15" />

  <!-- Monogram KA with refined geometric styling -->
  <g filter="url(#glow)">
    <text x="256" y="296" text-anchor="middle" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="142" font-weight="800" letter-spacing="10" fill="url(#goldGrad)">KA</text>
  </g>

  <!-- Subtitle pill -->
  <rect x="180" y="338" width="152" height="24" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(226,186,109,0.3)" stroke-width="1"/>
  <text x="256" y="354" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="11" font-weight="700" letter-spacing="4" fill="#d9b672">RETAIL OPS</text>
</svg>
`;

// Maskable icon with 15% safe padding
const maskableSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGradMask" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#141c2b" />
      <stop offset="55%" stop-color="#080c14" />
      <stop offset="100%" stop-color="#020306" />
    </radialGradient>
    <linearGradient id="goldGradMask" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdf3d6" />
      <stop offset="35%" stop-color="#e2ba6d" />
      <stop offset="70%" stop-color="#b68936" />
      <stop offset="100%" stop-color="#e8c782" />
    </linearGradient>
    <linearGradient id="ringGradMask" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f6dfa9" />
      <stop offset="50%" stop-color="#9d7426" />
      <stop offset="100%" stop-color="#f2d79d" />
    </linearGradient>
  </defs>

  <!-- Full bleed for maskable cropping -->
  <rect width="512" height="512" fill="url(#bgGradMask)" />

  <!-- Centered safe zone content (within 80% circle) -->
  <circle cx="256" cy="256" r="162" fill="none" stroke="url(#ringGradMask)" stroke-width="5" />
  <circle cx="256" cy="256" r="148" fill="none" stroke="#ffffff" stroke-width="1" opacity="0.15" />

  <text x="256" y="290" text-anchor="middle" font-family="'Space Grotesk', -apple-system, sans-serif" font-size="118" font-weight="800" letter-spacing="8" fill="url(#goldGradMask)">KA</text>
  <rect x="190" y="324" width="132" height="22" rx="11" fill="rgba(255,255,255,0.06)" stroke="rgba(226,186,109,0.3)" stroke-width="1"/>
  <text x="256" y="339" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="9.5" font-weight="700" letter-spacing="3" fill="#d9b672">RETAIL OPS</text>
</svg>
`;

async function generate() {
  const iconBuffer = Buffer.from(iconSvg);
  const maskableBuffer = Buffer.from(maskableSvg);

  // apple-touch-icon 180x180
  await sharp(iconBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.resolve('./apple-touch-icon.png'));

  // icon-192x192
  await sharp(iconBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.resolve('./icon-192.png'));

  // icon-512x512
  await sharp(iconBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.resolve('./icon-512.png'));

  // icon-maskable-512
  await sharp(maskableBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.resolve('./icon-maskable-512.png'));

  // Save SVG favicon
  fs.writeFileSync(path.resolve('./favicon.svg'), iconSvg);

  console.log('Successfully generated all PWA icons & Apple Touch Icon!');
}

generate().catch(console.error);
