const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Regular Icon SVG (For Favicon, PWA 192, 512, Apple Touch Icon)
const regularSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="70%">
      <stop offset="0%" stop-color="#0E1E38" />
      <stop offset="50%" stop-color="#081120" />
      <stop offset="100%" stop-color="#03070E" />
    </radialGradient>
    <radialGradient id="glowGrad" cx="50%" cy="50%" r="48%">
      <stop offset="0%" stop-color="rgba(6, 182, 212, 0.4)" />
      <stop offset="60%" stop-color="rgba(14, 116, 144, 0.15)" />
      <stop offset="100%" stop-color="transparent" />
    </radialGradient>
    <linearGradient id="emblemBorderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E7490" />
      <stop offset="50%" stop-color="#06B6D4" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>
    <linearGradient id="silverTitleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="50%" stop-color="#E2E8F0" />
      <stop offset="100%" stop-color="#94A3B8" />
    </linearGradient>
  </defs>

  <!-- Luxury App Icon Squircle Background -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />
  <rect width="508" height="508" x="2" y="2" rx="110" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2" />
  
  <!-- Subtle Ambient Glow -->
  <circle cx="256" cy="256" r="200" fill="url(#glowGrad)" />

  <!-- Monogram Logo Centered and Scaled -->
  <g transform="translate(256, 256) scale(8.6) translate(-26, -26)">
    <!-- Hexagonal Base Shield -->
    <polygon points="26,3 46,14.5 46,37.5 26,49 6,37.5 6,14.5" stroke="url(#emblemBorderGlow)" stroke-width="2.2" fill="rgba(14, 116, 144, 0.22)" />
    <polygon points="26,7 42,16.5 42,35.5 26,45 10,35.5 10,16.5" stroke="rgba(255, 255, 255, 0.32)" stroke-width="1.2" fill="none" />
    
    <!-- Calligraphic 'خ / KA' Monogram Core -->
    <path d="M18 20C18 20 22 17 28 17C32 17 35 19 35 23C35 27 30 29 26 31C21 33 17 35 17 38C17 41 21 42 27 42C32 42 35 40 35 40" stroke="url(#silverTitleGrad)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="28" cy="12" r="2.4" fill="#38BDF8" />
  </g>
</svg>`;

// 2. Android Maskable Icon SVG (Full bleed square background, scaled to 70% safe zone)
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="70%">
      <stop offset="0%" stop-color="#0E1E38" />
      <stop offset="50%" stop-color="#081120" />
      <stop offset="100%" stop-color="#03070E" />
    </radialGradient>
    <radialGradient id="glowGrad" cx="50%" cy="50%" r="48%">
      <stop offset="0%" stop-color="rgba(6, 182, 212, 0.4)" />
      <stop offset="60%" stop-color="rgba(14, 116, 144, 0.15)" />
      <stop offset="100%" stop-color="transparent" />
    </radialGradient>
    <linearGradient id="emblemBorderGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E7490" />
      <stop offset="50%" stop-color="#06B6D4" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>
    <linearGradient id="silverTitleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="50%" stop-color="#E2E8F0" />
      <stop offset="100%" stop-color="#94A3B8" />
    </linearGradient>
  </defs>

  <!-- Full Bleed Background for Android Adaptive Shapes -->
  <rect width="512" height="512" fill="url(#bgGrad)" />
  
  <!-- Ambient Radial Glow -->
  <circle cx="256" cy="256" r="180" fill="url(#glowGrad)" />

  <!-- Monogram Logo Safe Zone Scaled (Within 360px safe circle) -->
  <g transform="translate(256, 256) scale(6.6) translate(-26, -26)">
    <!-- Hexagonal Base Shield -->
    <polygon points="26,3 46,14.5 46,37.5 26,49 6,37.5 6,14.5" stroke="url(#emblemBorderGlow)" stroke-width="2.2" fill="rgba(14, 116, 144, 0.22)" />
    <polygon points="26,7 42,16.5 42,35.5 26,45 10,35.5 10,16.5" stroke="rgba(255, 255, 255, 0.32)" stroke-width="1.2" fill="none" />
    
    <!-- Calligraphic 'خ / KA' Monogram Core -->
    <path d="M18 20C18 20 22 17 28 17C32 17 35 19 35 23C35 27 30 29 26 31C21 33 17 35 17 38C17 41 21 42 27 42C32 42 35 40 35 40" stroke="url(#silverTitleGrad)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="28" cy="12" r="2.4" fill="#38BDF8" />
  </g>
</svg>`;

async function buildIcons() {
  console.log('Writing favicon.svg...');
  fs.writeFileSync(path.resolve(__dirname, '../favicon.svg'), regularSvg, 'utf8');

  console.log('Generating PNG icons via Sharp...');
  const regBuffer = Buffer.from(regularSvg);
  const maskBuffer = Buffer.from(maskableSvg);

  await sharp(regBuffer).resize(512, 512).png().toFile(path.resolve(__dirname, '../icon-512.png'));
  console.log('icon-512.png generated.');

  await sharp(regBuffer).resize(192, 192).png().toFile(path.resolve(__dirname, '../icon-192.png'));
  console.log('icon-192.png generated.');

  await sharp(regBuffer).resize(180, 180).png().toFile(path.resolve(__dirname, '../apple-touch-icon.png'));
  console.log('apple-touch-icon.png generated.');

  await sharp(maskBuffer).resize(512, 512).png().toFile(path.resolve(__dirname, '../icon-maskable-512.png'));
  console.log('icon-maskable-512.png generated.');

  console.log('All executive app icons successfully generated!');
}

buildIcons().catch(err => {
  console.error('Failed to generate icons:', err);
  process.exit(1);
});
