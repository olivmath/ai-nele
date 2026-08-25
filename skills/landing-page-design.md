---
name: landing-page-design
description: >-
  Visual design system for landing pages and web UI. Strict rules for typography
  (fonts, type scale, weights), spacing tokens, corner radius, backgrounds, hero
  layout, icons, motion choreography, content realism, interactive states, and
  ship requirements. Use when building, editing, styling, or reviewing visual
  design for ANY landing page, marketing site, web UI, component, or prototype.
  For page structure and copy frameworks, use landing-page-generator and
  landing-page-copy instead.
---

# Landing Page Design — Visual System

Non-negotiable visual rules for landing pages and web UI. Every value resolves through these rules instead of being invented ad hoc.

For page **structure and copy**, use `landing-page-generator` and `landing-page-copy`.

## Scope

Apply to all web UI work: landing pages, marketing sites, components, dashboards, prototypes, and design reviews. When a rule here conflicts with a framework default, this file wins. When the user's explicit prompt conflicts with a rule, the user wins.

## B1. Typography

### Fonts

**Use:** Geist, Manrope, Geist Mono, Poppins.

**Never use:** Inter, Roboto, Arial, Open Sans, Helvetica.

**Never use italic fonts** anywhere in the interface.

**One typeface per site.** Do not pair two fonts unless the prompt explicitly asks for it. Geist Mono is allowed alongside a primary font only for code, data, or numeric UI where a monospace is functionally required.

**Never use ultra bold weights** (900 / black). Cap at semibold or bold.

### Copy rules

**No hyphens in text.** Do not use `-` inside body copy, headings, or labels. Rewrite the phrase instead.

**No orphaned words.** A single word must never sit alone on the last line. Apply `text-wrap: balance` for headings and `text-wrap: pretty` for body copy.

### Type scale

Always resolve font sizes to Tailwind's default type scale. Never leave arbitrary values in place, including `text-[19px]`, `font-size: 22px`, or `1.4rem`.

If an existing size does not land exactly on a step, snap it to the **closest step below**, taking both the size and its paired line height.

| Class | Size | Line height |
|---|---|---|
| `text-xs` | 12px (0.75rem) | 16px |
| `text-sm` | 14px (0.875rem) | 20px |
| `text-base` | 16px (1rem) | 24px |
| `text-lg` | 18px (1.125rem) | 28px |
| `text-xl` | 20px (1.25rem) | 28px |
| `text-2xl` | 24px (1.5rem) | 32px |
| `text-3xl` | 30px (1.875rem) | 36px |
| `text-4xl` | 36px (2.25rem) | 40px |
| `text-5xl` | 48px (3rem) | 1 |
| `text-6xl` | 60px (3.75rem) | 1 |
| `text-7xl` | 72px (4.5rem) | 1 |
| `text-8xl` | 96px (6rem) | 1 |
| `text-9xl` | 128px (8rem) | 1 |

Do not combine scale snapping with independently set custom line heights elsewhere in an audit. Tracking and line height may only be adjusted **within** the value the matched step already provides, so the two rules never fight each other.

### Button type

- Main buttons: `text-base` (16px), semibold.
- Smaller header buttons: `text-sm` (14px), semibold.

## B2. Spacing

Only these values. Nothing between them, nothing outside them.

| Token | Value |
|---|---|
| Spacing-0 | 0 |
| Spacing-25 | 2px |
| Spacing-50 | 4px |
| Spacing-75 | 8px |
| Spacing-100 | 12px |
| Spacing-200 | 16px |
| Spacing-300 | 24px |
| Spacing-400 | 32px |
| Spacing-500 | 40px |
| Spacing-600 | 48px |
| Spacing-700 | 64px |
| Spacing-800 | 80px |
| Spacing-900 | 96px |

**Main buttons:** 8px vertical padding, 12px horizontal padding.

## B3. Corner radius

Only use Tailwind's radius values.

**Nested radius formula.** When a shape sits inside another shape and the gap between them is **less than 32px**:

```
inner radius = outer radius − gap
```

Apply this only when the result is **greater than 2**. Below that, leave the inner shape square or unchanged.

Example: an outer card at `rounded-2xl` (16px) with 8px of internal padding gives an inner element an 8px radius (`rounded-lg`).

## B4. Borders and backgrounds

- **Never apply a border to only one side of a card.** Borders go all the way around or not at all.
- **Never use gradients in backgrounds.** Backgrounds are flat.

### Dark mode background colors

Use only these:

`#000000` · `#181818` · `#1F1F1F` · `#272727` · `#313131` · `#131209`

## B5. Hero section

### Heading color

- **Dark theme:** left to right gradient on the heading text, `#FFFFFF` → `#9B9B9B`.
- **Light theme:** left to right gradient on the heading text, `#000000` → `#666666`.

This is the one place gradients are used, and only on text, never on the background.

### Layout

- Heading and subheading both get a **max width of 680px**.
- Read the heading copy and insert line breaks at **meaningful** points.
- Never break a line in a way that cuts a phrase awkwardly or makes the sentence harder to read. Break where the thought breaks.

## B6. Icons

**Use:** Phosphor, Solar, or Iconamoon.

**Never use:** Material Icons, Material Symbols.

## B7. Motion choreography (fluid dynamics)

Never use default transitions. All motion simulates real world mass and spring physics through custom cubic beziers.

```
transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
```

### Fluid island nav

**Closed state.** The navbar is a floating glass pill detached from the top: `mt-6`, `mx-auto`, `w-max`, `rounded-full`.

**Hamburger morph.** On click, the hamburger lines fluidly rotate and translate into a perfect X using `rotate-45` and `-rotate-45` with absolute positioning. They must never simply disappear.

**Modal expansion.** The menu opens as a screen filling overlay with a heavy glass effect: `backdrop-blur-3xl bg-black/80` or `bg-white/80`.

**Staggered mask reveal.** Nav links inside the expanded state fade in and slide up from an invisible box, `translate-y-12 opacity-0` resolving to `translate-y-0 opacity-100`, staggered per item with `delay-100`, `delay-150`, `delay-200`, and so on.

### Scroll interpolation

Elements never appear statically on load. As they enter the viewport they execute a gentle, heavy fade up:

```
translate-y-16 blur-md opacity-0  →  translate-y-0 blur-0 opacity-100
```

over 800ms or longer.

For JavaScript driven reveals use `IntersectionObserver` or Framer Motion's `whileInView`. **Never use `window.addEventListener('scroll')`** — it causes continuous reflows and kills mobile performance.

---

## B8. Content realism

Never ship filler. These are the tells that a page was generated rather than made.

- **No Lorem Ipsum.** Write real draft copy.
- **No "John Doe".** Use diverse, realistic names.
- **No placeholder brands** like "Acme Corp", "Nexus", or "SmartFlow". Invent contextual, believable names.
- **No round fake numbers** like `99.99%`, `50%`, `$100.00`. Use organic data: `47.2%`, `$99.00`, `+1 (312) 847-1928`.
- **No AI cliches.** Never "Elevate", "Seamless", "Unleash", "Next Gen", "Game changer", "Delve", "Tapestry", or "In the world of".
- **Sentence case headers**, not Title Case On Everything.
- **Active voice.** "We could not save your changes", not "Mistakes were made".
- **No exclamation marks in success messages**, and no "Oops!" in errors. Be direct: "Connection failed. Please try again."
- **Unique avatars** per person, and varied blog post dates.

## B9. States

Every interactive element ships with its full state set:

- **Hover** — background shift, slight scale, or translate
- **Active** — `scale(0.98)` or `translateY(1px)` for physical feedback
- **Focus** — a visible focus ring. Accessibility requirement, not optional.
- **Loading** — skeleton loaders shaped like the real layout, not circular spinners
- **Empty** — a composed "getting started" view, never a blank panel
- **Error** — inline and specific. Never `window.alert()`.

No dead links. A button pointing at `#` is either linked or visually disabled. The current page must be indicated in the navigation.

## B10. Ship requirements

Things that get forgotten and make a page feel unfinished:

- Privacy policy and terms links in the footer
- A custom, branded 404
- Client side form validation for email format and required fields
- A skip to content link for keyboard users
- Cookie consent where the jurisdiction requires it
- A branded favicon
- `<title>`, meta description, `og:image`, and social sharing tags
- Alt text on every meaningful image
- Semantic HTML: `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`
- A way back from every page

## B11. Tagline reveal section (mandatory)

Every landing page includes one large type section stating the core benefit or tagline, separate from the hero. It sits further down the page as its own moment, not stacked directly under the hero.

**Copy**
- Minimum two lines of text.
- A benefit statement or tagline, written in the voice of A5, not a generic section heading.

**Typography**
- Size `text-4xl` to `text-6xl` depending on line count, following the B1 type scale.
- Max width capped like the hero, so lines break at meaningful points per B5.

**Animation**
- Text starts in a subtle, muted tone, roughly 25 to 35% opacity of the theme's base text color.
- As the section scrolls into view, each word transitions individually from that muted tone to the full text color, in reading order.
- Words activate one at a time as they cross a trigger line, not the entire block flipping at once. The transition uses the custom easing curve from B7, never a linear fade.
- Implement with `IntersectionObserver` per word, or a single scroll listener throttled through `requestAnimationFrame`. Never an unthrottled `window.addEventListener('scroll')`, per B7.

---

# Quick checklist
- [ ] Single approved typeface, no italics, no ultra bold
- [ ] No hyphens in copy, no orphaned words
- [ ] Every font size lands on a Tailwind scale step
- [ ] Every spacing value comes from the spacing table
- [ ] Nested radii follow the formula
- [ ] No single sided card borders, no background gradients
- [ ] Hero heading and subheading capped at 680px with meaningful line breaks
- [ ] Icons from Phosphor, Solar, or Iconamoon
- [ ] Every transition uses a custom cubic bezier, scroll reveals use IntersectionObserver
- [ ] Tagline reveal section present, minimum two lines, words activate one at a time on scroll

**Content and ship**
- [ ] No Lorem Ipsum, no placeholder brands, no AI cliches, no round fake numbers
- [ ] Hover, active, focus, loading, empty, and error states all present
- [ ] No dead links, current nav item indicated
- [ ] 404, legal links, form validation, favicon, meta tags, alt text
