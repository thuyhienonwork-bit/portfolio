// Copies the browser builds of GSAP and Lenis into vendor/ so the static
// index.html can load them without a bundler (GitHub Pages has no node_modules).
import { cpSync, mkdirSync } from 'node:fs';
const files = [
  ['node_modules/gsap/dist/gsap.min.js', 'vendor/gsap.min.js'],
  ['node_modules/gsap/dist/ScrollTrigger.min.js', 'vendor/ScrollTrigger.min.js'],
  ['node_modules/lenis/dist/lenis.min.js', 'vendor/lenis.min.js'],
  ['node_modules/lenis/dist/lenis.css', 'vendor/lenis.css'],
];
mkdirSync('vendor', { recursive: true });
for (const [from, to] of files) cpSync(from, to);
console.log('vendor/ updated');
