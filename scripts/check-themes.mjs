import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const css = readFileSync("design-system/themes.css", "utf8");
const luminance = (hex) => {
  const rgb = hex.match(/[a-f0-9]{2}/gi).map((part) => {
    const value = parseInt(part, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};
let count = 0;
for (const match of css.matchAll(/\[data-theme="([^"]+)"\]\s*\{([^}]+)\}/g)) {
  const [, name, body] = match;
  const tokens = Object.fromEntries(
    [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2]]),
  );
  for (const foreground of [
    "color-text",
    "color-text-muted",
    "color-danger",
    "color-success",
  ]) {
    for (const background of ["color-canvas", "color-surface", "color-surface-muted"]) {
      const a = luminance(tokens[foreground]),
        b = luminance(tokens[background]);
      assert(
        (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) >= 4.5,
        name + ": " + foreground + " / " + background,
      );
    }
  }
  for (const background of ["color-action", "color-action-hover"]) {
    const a = luminance(tokens["color-action-contrast"]),
      b = luminance(tokens[background]);
    assert((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) >= 4.5, name + ": action");
  }
  for (const role of [
    "font-body",
    "font-display",
    "radius-control",
    "radius-lg",
    "shadow-md",
    "space-section",
    "container-content",
  ])
    assert(tokens[role], name + ": " + role);
  count++;
}
assert.equal(count, 8);
console.log("8 thèmes : contrats et 112 paires de contraste conformes (>= 4.5:1).");
