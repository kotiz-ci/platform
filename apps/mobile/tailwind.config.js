// KOTIZ mobile — Tailwind config (consommé par NativeWind)
// Source de vérité tokens : @kotiz/design-tokens (cf. Story 1.1 AC7 + ADR-009)
const kotizPreset = require("@kotiz/design-tokens/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset"), kotizPreset],
};
