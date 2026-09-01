import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const carouselFiles = [
  "src/pages/carousel/SmartcontractDaoSlides.tsx",
  "src/pages/carousel/IncidentDeck.jsx",
];

for (const file of carouselFiles) {
  test(`${file} exposes printable PDF export`, async () => {
    const source = await readFile(file, "utf8");

    assert.match(source, /window\.print\(\)/);
    assert.match(source, /data-pdf-slide/);
    assert.match(source, /@media print/);
    assert.match(source, /Gerar PDF/);
  });
}
