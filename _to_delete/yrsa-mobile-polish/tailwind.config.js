/**
 * Shared Tailwind config.
 *
 * Works two ways:
 *   1. In the browser, loaded right AFTER the `cdn.tailwindcss.com` script
 *      (uncomment both lines in index.html's <head> while you're designing).
 *   2. In Node, as the config for `node tailwind.build.js`, which compiles the
 *      classes you actually used into the inlined <style> block in index.html.
 */
var yrsaTheme = {
  theme: {
    extend: {
      colors: {
        bone: '#e3e0d9',
        lavender: '#c5c3cb',
        grey: '#979591',
        ink: '#2b241f',
        oxide: '#6c3423',
        brass: '#876330',
        pine: '#3f4a3d',
        'pine-light': '#9caf88',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        headline: ['Montserrat', 'sans-serif'],
        logo: ['Mynerve', 'cursive'],
      },
    },
  },
};

if (typeof window !== 'undefined') {
  window.tailwind = window.tailwind || {};
  window.tailwind.config = yrsaTheme;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Object.assign({ content: ['./index.html'] }, yrsaTheme);
}
