# Mobile Horizontal Overflow Debug Report

**Date:** 2026-03-26
**Symptom:** On some phones, tapping/scrolling the page shifts horizontally — white space appears on left/right, snaps back on finger release.

---

## Root Cause Summary

**Primary culprit: `.template-card.slide-prev` and `.template-card.slide-next`** (slider carousel).
These cards are absolutely positioned at `left: 50%` then translated *off-screen* — extending the paint area beyond the viewport width. Although `.templates-slider` has `overflow: hidden`, the **parent sections above it do not**, so touch-scroll events can reveal overflowed paint area.

**Secondary culprits:** Animation elements using `translateX(±40px)` before the IntersectionObserver fires, and missing `overflow-x: hidden` on `<html>`/`<body>`.

---

## All Issues Found

### 1. Slider side cards extend outside viewport [HIGH — PRIMARY]

**File:** `assets/css/style.css` lines 429–442

```css
.template-card.slide-prev {
    transform: translate(calc(-50% - 120% - 40px), -50%) scale(0.96);
}
.template-card.slide-next {
    transform: translate(calc(-50% + 120% + 40px), -50%) scale(0.96);
}
```

**Why it breaks:** Cards are `width: clamp(280px, 32vw, 380px)`. On mobile (e.g. 390px screen), card width = ~280px. The `slide-next` card is pushed `calc(-50% + 120% + 40px)` = `+310px + 40px` to the right from center. That puts its right edge well past the right viewport boundary. On desktop the parent `.templates-slider` clips it with `overflow: hidden`, but the browser still tracks the paint rect — triggering rubber-band pan on touch.

**Fix:**
```css
/* Ensure slider clips side cards completely */
.templates-slider {
    overflow: hidden;
    /* already present — verify this is not overridden */
}

/* On mobile, reduce side card offset so they don't extend >50vw */
@media (max-width: 768px) {
    .template-card.slide-prev {
        transform: translate(calc(-50% - 95% - 20px), -50%) scale(0.88);
        opacity: 0.5;
    }
    .template-card.slide-next {
        transform: translate(calc(-50% + 95% + 20px), -50%) scale(0.88);
        opacity: 0.5;
    }
}
```

Or — simpler, just hide them on small screens:
```css
@media (max-width: 480px) {
    .template-card.slide-prev,
    .template-card.slide-next {
        display: none;
    }
}
```

---

### 2. Missing `overflow-x: hidden` on `html` and `body` [HIGH]

**File:** `assets/css/style.css` lines 44–55

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; ... }
/* html has NO overflow rule */
```

Neither `html` nor `body` has `overflow-x: hidden`. This is the **global safety net** that most sites rely on to prevent any overflowing child from causing horizontal scroll/rubber-band.

**Fix — add to top of style.css:**
```css
html, body {
    overflow-x: hidden;
}
```

> Note: `overflow-x: hidden` on `body` alone is sometimes insufficient on iOS Safari — must set on both `html` AND `body`.

---

### 3. `.anim-slide-left` / `.anim-slide-right` before IntersectionObserver fires [MEDIUM]

**File:** `assets/css/style.css` lines 1073–1085

```css
.anim-slide-left {
    opacity: 0;
    transform: translateX(-40px);  /* shifts element 40px left */
}
.anim-slide-right {
    opacity: 0;
    transform: translateX(40px);   /* shifts element 40px right */
}
```

These elements (`.showcase-content`, `.showcase-image-wrapper`) start translated 40px off their natural position. On narrow screens, `translateX(40px)` on a right-edge element can extend beyond the viewport for the brief moment before the IntersectionObserver fires and adds `.anim-visible`. During a slow page load or while scrolling quickly, this can contribute to overflow flicker.

**Fix — already partially addressed at 480px, extend the reduction:**
```css
@media (max-width: 768px) {
    .anim-slide-left:not(.anim-visible) {
        transform: translateX(-16px);
    }
    .anim-slide-right:not(.anim-visible) {
        transform: translateX(16px);
    }
}
```
(Current code already does this at 480px with 24px, extend to 768px with a smaller value.)

---

### 4. `.contact-hero::before` and `::after` — 500px circles extending off viewport [LOW]

**File:** `assets/css/style.css` lines 2322–2344

```css
.contact-hero::before {
    width: 500px; height: 500px;
    top: -80px; right: -80px;  /* extends 420px right of edge */
}
.contact-hero::after {
    width: 500px; height: 500px;
    bottom: -80px; left: -80px;  /* extends 420px left of edge */
}
```

`.contact-hero` has `overflow: hidden` (line 2319) — so these blobs are clipped. This is **correctly handled** but worth noting: if the `overflow: hidden` were ever removed, this would immediately cause overflow.

**Status:** No fix needed — contained by parent overflow.

---

### 5. `.pricing-card.highlighted` — `translateY(-24px)` [LOW]

**File:** `assets/css/style.css` line 2535

```css
.pricing-card.highlighted {
    transform: translateY(-24px);
}
```

Already reset at 768px (line 3452):
```css
@media (max-width: 768px) {
    .pricing-card.highlighted {
        transform: translateY(0);
    }
}
```

**Status:** Correctly handled — not a source of horizontal overflow.

---

### 6. `.process-grid::before` — connecting line [LOW]

**File:** `assets/css/style.css` lines 2439–2447

```css
.process-grid::before {
    left: 0; right: 0;
    border-top: 2px solid #C7D2FE;
}
```

Spans full width of `.process-grid` container only. Hidden at 480px (line 3573). No overflow risk.

**Status:** Not a culprit.

---

## Summary Table

| # | Element | Severity | Fix Required |
|---|---------|----------|-------------|
| 1 | `.template-card.slide-prev/next` transforms | HIGH | Yes — reduce offset or hide on mobile |
| 2 | Missing `overflow-x: hidden` on `html, body` | HIGH | Yes — add to global styles |
| 3 | `.anim-slide-right` translateX before observer | MEDIUM | Yes — reduce at 768px |
| 4 | `.contact-hero::before/after` 500px blobs | LOW | No — clipped by parent |
| 5 | `.pricing-card.highlighted` translateY | LOW | No — already reset at 768px |
| 6 | `.process-grid::before` line | LOW | No — not a horizontal issue |

---

## Recommended Fixes (in order of priority)

### Fix 1 — Add to top of `body` styles in `style.css`

```css
html, body {
    overflow-x: hidden;
}
```

### Fix 2 — Add inside `@media (max-width: 768px)` block in `style.css`

```css
/* Reduce side card offset to stay within viewport */
.template-card.slide-prev {
    opacity: 0.4;
    transform: translate(calc(-50% - 85% - 10px), -50%) scale(0.85);
}
.template-card.slide-next {
    opacity: 0.4;
    transform: translate(calc(-50% + 85% + 10px), -50%) scale(0.85);
}

/* Reduce slide animation distance */
.anim-slide-left:not(.anim-visible) {
    transform: translateX(-16px);
}
.anim-slide-right:not(.anim-visible) {
    transform: translateX(16px);
}
```

### Fix 3 (optional) — Hide side slider cards at 480px

```css
@media (max-width: 480px) {
    .template-card.slide-prev,
    .template-card.slide-next {
        display: none;
    }
}
```

---

## Files to Modify

- `/Users/phantienphuoc/Documents/project/web/Templexa/assets/css/style.css`
  - Line ~50: add `html { overflow-x: hidden; }` alongside `body` styles
  - Line ~988 (`@media (max-width: 768px)`): add slider side-card and anim-slide overrides

---

## Unresolved Questions

1. Is the rubber-band effect happening on iOS Safari specifically, or also Android Chrome? (iOS Safari has its own elastic scroll behavior that can be triggered by `position: fixed` elements — the fixed header at `left: 0; right: 0` should be safe but worth verifying.)
2. Are there any product-specific pages under `products/` folder that have their own CSS with `100vw` or wide fixed elements?
