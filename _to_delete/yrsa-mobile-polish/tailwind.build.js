#!/usr/bin/env node
/**
 * Compiles the Tailwind classes used in index.html and writes the result into
 * the `<style>/*!TAILWIND!*\/</style>` placeholder in that same file.
 *
 * Why: the old setup loaded `cdn.tailwindcss.com`, which ships a ~120 KB
 * compiler and runs it in the browser on every single visit before anything
 * can paint. Inside the Instagram in-app browser on cellular that is the
 * slowest thing on the page. Compiling ahead of time makes it zero requests
 * and ~5 KB gzipped.
 *
 * Run it whenever you add or change Tailwind classes in index.html:
 *
 *   npm install -D tailwindcss@3
 *   node tailwind.build.js
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const ROOT = __dirname;
const HTML = path.join(ROOT, 'index.html');
const MARKER_OPEN = '<style>/*!TAILWIND!*/';
const MARKER_RE = /<style>\/\*!TAILWIND!\*\/[\s\S]*?<\/style>/;

const tmpIn = path.join(os.tmpdir(), 'yrsa-tw-in.css');
const tmpOut = path.join(os.tmpdir(), 'yrsa-tw-out.css');
fs.writeFileSync(tmpIn, '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n');

execFileSync(
  'npx',
  ['tailwindcss', '-c', path.join(ROOT, 'tailwind.config.js'), '-i', tmpIn, '-o', tmpOut, '--minify'],
  { cwd: ROOT, stdio: 'inherit' }
);

const css = fs.readFileSync(tmpOut, 'utf8').trim();
let html = fs.readFileSync(HTML, 'utf8');

if (!MARKER_RE.test(html)) {
  console.error('Could not find the ' + MARKER_OPEN + ' ... </style> block in index.html. Aborting.');
  process.exit(1);
}

html = html.replace(MARKER_RE, MARKER_OPEN + '\n' + css + '\n</style>');
fs.writeFileSync(HTML, html);
console.log('Inlined ' + (css.length / 1024).toFixed(1) + ' KB of Tailwind CSS into index.html');
