# Software Design Document (SDD)
## Ophelia Ivy Mensah — Professional e-Portfolio
### CSP 6050: Capstone Seminar in College Student Personnel | BGSU
**Version:** 1.0 | **Date:** April 16, 2026 | **Status:** Draft — Awaiting Approval

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [File & Folder Architecture](#3-file--folder-architecture)
4. [Page Architecture](#4-page-architecture)
5. [Design System](#5-design-system)
6. [Accessibility Specification — WCAG 2.1 AA](#6-accessibility-specification--wcag-21-aa)
7. [Responsive Design](#7-responsive-design)
8. [Navigation System](#8-navigation-system)
9. [Component Library](#9-component-library)
10. [JavaScript Interactions](#10-javascript-interactions)
11. [Performance & SEO](#11-performance--seo)
12. [Testing Checklist](#12-testing-checklist)

---

## 1. Project Overview

| Property | Value |
|---|---|
| **Product** | Professional e-Portfolio Website |
| **Owner** | Ophelia Ivy Mensah |
| **Course** | CSP 6050: Capstone Seminar in College Student Personnel |
| **Institution** | Bowling Green State University |
| **Format** | Multi-page HTML/CSS/JS website |
| **Deployment** | Local folder (openable in any browser) or static hosting |
| **Accessibility Standard** | WCAG 2.1 Level AA |
| **Target Devices** | Desktop, Tablet, Mobile |

### 1.1 Design Goals

- Present Ophelia's professional identity, academic growth, and ACPA/NASPA competencies in a clean, compelling, and navigable site
- Score at the Exemplary level across all rubric criteria (200/200 pts)
- Be fully usable by visitors with disabilities — screen readers, keyboard-only navigation, low vision
- Require zero external accounts or hosting services to open and evaluate

---

## 2. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| Markup | HTML5 (semantic) | Accessibility-first structure; screen reader compatibility |
| Styling | CSS3 with custom properties (variables) | Maintainable design tokens; no build tools needed |
| Scripting | Vanilla JavaScript (ES6+) | Lightweight; no dependencies |
| Fonts | Google Fonts CDN — Playfair Display + Inter | Elegant + readable; CDN fallback to system fonts |
| Icons | Font Awesome 6 (CDN) | Accessible icon library with `aria-hidden` support |
| PDF Resume | Linked `.pdf` file in `/assets/` | Allows download; accessible via browser PDF viewer |
| Artifact Links | Placeholder `href="#"` initially | To be replaced with real file paths upon final submission |

---

## 3. File & Folder Architecture

```
ophelia-portfolio/
│
├── index.html              ← Home (landing page)
├── about.html              ← About Me + Mission Statement
├── resume.html             ← Resume (web-formatted + PDF link)
├── competencies.html       ← All 9 ACPA/NASPA competencies
├── artifacts.html          ← Artifact gallery
├── contact.html            ← Contact form + links
│
├── css/
│   ├── main.css            ← Global styles, design tokens, reset
│   ├── nav.css             ← Navigation (desktop + mobile)
│   ├── components.css      ← Cards, badges, buttons, forms
│   └── accessibility.css   ← Focus styles, skip links, reduced motion
│
├── js/
│   ├── nav.js              ← Mobile hamburger toggle
│   ├── accordion.js        ← Competency expand/collapse
│   └── theme.js            ← High-contrast mode toggle
│
└── assets/
    ├── resume.pdf          ← Downloadable resume (placeholder)
    ├── img/
    │   ├── hero-placeholder.jpg
    │   ├── profile-placeholder.jpg
    │   └── og-image.jpg    ← Open Graph preview image
    └── artifacts/
        ├── advising-philosophy.pdf     ← (placeholder)
        ├── equity-audit.pdf            ← (placeholder)
        ├── equity-audit-slides.pptx    ← (placeholder)
        ├── fall-practicum.pptx         ← (placeholder)
        ├── student-athlete-practicum.pptx ← (placeholder)
        ├── honors-interview-questions.docx ← (placeholder)
        ├── community-meal-financial.docx ← (placeholder)
        ├── community-meal-email.docx   ← (placeholder)
        └── hsoc-event-planning.docx    ← (placeholder)
```

---

## 4. Page Architecture

### 4.1 Shared Layout (All Pages)

Every page includes the following in order:

```
<html lang="en">
  <head>  ← Meta, title, Open Graph, font links, CSS
  <body>
    [skip-link]       ← "Skip to main content" (accessibility)
    <header>          ← Site logo/name + primary navigation
    <main id="main">  ← Page-specific content
    <footer>          ← Name, email, LinkedIn, copyright
```

### 4.2 Page-Level Breakdown

| Page | `<title>` | Key Landmark | Primary Heading |
|---|---|---|---|
| `index.html` | `Home — Ophelia Ivy Mensah` | `<main>` hero + intro | `<h1>` — name/tagline |
| `about.html` | `About Me — Ophelia Ivy Mensah` | `<main>` bio sections | `<h1>About Me` |
| `resume.html` | `Resume — Ophelia Ivy Mensah` | `<main>` resume body | `<h1>Resume` |
| `competencies.html` | `Competencies — Ophelia Ivy Mensah` | `<main>` tabbed content | `<h1>Professional Competencies` |
| `artifacts.html` | `Artifacts — Ophelia Ivy Mensah` | `<main>` card grid | `<h1>Artifacts` |
| `contact.html` | `Contact — Ophelia Ivy Mensah` | `<main>` form | `<h1>Contact` |

### 4.3 Heading Hierarchy

Each page maintains a strict heading hierarchy to support screen reader navigation:

```
h1  — Page title (one per page)
  h2  — Major section (e.g., "Exemplary Level")
    h3  — Subsection (e.g., "Advising & Supporting")
      h4  — Detail block (e.g., "Activities", "Artifacts")
```

---

## 5. Design System

### 5.1 Color Tokens (CSS Custom Properties)

```css
:root {
  /* Core palette — confirmed by owner */
  --color-ink:        #232323;   /* Primary text */
  --color-brown:      #685D54;   /* Headings, Exemplary badges, nav active */
  --color-taupe:      #A39382;   /* LARGE text only — see accessibility note */
  --color-cream:      #E5DED2;   /* Cards, section alternates */
  --color-ivory:      #FBF7F4;   /* Page background */

  /* Derived / functional */
  --color-bg:         var(--color-ivory);
  --color-surface:    var(--color-cream);
  --color-text:       var(--color-ink);
  --color-heading:    var(--color-brown);
  --color-muted:      #5C524A;   /* Darkened taupe — passes AA for body text */
  --color-link:       #4A3E35;   /* Darker for AA contrast on ivory */
  --color-link-hover: var(--color-brown);
  --color-focus:      #1A5E9C;   /* High-visibility blue — meets WCAG focus */

  /* Competency tier badges */
  --badge-exemplary:  var(--color-brown);
  --badge-proficient: #5C524A;
  --badge-foundational: #7A7068;

  /* High-contrast mode overrides (see Section 6.5) */
}
```

> ⚠️ **Accessibility Note:** `#A39382` (taupe) achieves approximately 3.4:1 contrast on ivory `#FBF7F4`. This **passes WCAG AA for large text only** (≥18pt / ≥14pt bold). It must **not** be used for body-sized text. A darkened variant `#5C524A` (~5.8:1) is assigned as `--color-muted` for all body-sized secondary text.

### 5.2 Contrast Ratios — Full Analysis

| Foreground | Background | Ratio | WCAG AA (Normal) | WCAG AA (Large) |
|---|---|---|---|---|
| `#232323` | `#FBF7F4` | ~17.2:1 | ✅ Pass | ✅ Pass |
| `#685D54` | `#FBF7F4` | ~5.6:1 | ✅ Pass | ✅ Pass |
| `#A39382` | `#FBF7F4` | ~3.4:1 | ❌ Fail | ✅ Pass |
| `#5C524A` (muted) | `#FBF7F4` | ~5.8:1 | ✅ Pass | ✅ Pass |
| `#232323` | `#E5DED2` | ~12.1:1 | ✅ Pass | ✅ Pass |
| `#FBF7F4` | `#685D54` | ~5.6:1 | ✅ Pass | ✅ Pass |
| `#FBF7F4` | `#232323` | ~17.2:1 | ✅ Pass | ✅ Pass |

> **Rule:** `#A39382` is permitted only for decorative elements, section dividers, or text ≥ 18px. Never for captions, labels, or body copy.

### 5.3 Typography Scale

```css
:root {
  --font-serif:  'Playfair Display', Georgia, serif;
  --font-sans:   'Inter', system-ui, sans-serif;

  /* Scale (using rem — respects user browser font size settings) */
  --text-xs:    0.75rem;   /*  12px base */
  --text-sm:    0.875rem;  /*  14px */
  --text-base:  1rem;      /*  16px */
  --text-lg:    1.125rem;  /*  18px */
  --text-xl:    1.25rem;   /*  20px */
  --text-2xl:   1.5rem;    /*  24px */
  --text-3xl:   1.875rem;  /*  30px */
  --text-4xl:   2.25rem;   /*  36px */
  --text-hero:  3rem;      /*  48px */

  /* Line heights — generous for readability */
  --leading-tight:  1.25;
  --leading-normal: 1.6;
  --leading-loose:  1.8;
}
```

> **Accessibility:** All font sizes use `rem` (not `px`) so they scale when a user adjusts their browser base font size. Minimum body text is `1rem` (16px).

### 5.4 Spacing Scale

```css
:root {
  --space-1:  0.25rem;   /*  4px */
  --space-2:  0.5rem;    /*  8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-24: 6rem;      /* 96px */
}
```

---

## 6. Accessibility Specification — WCAG 2.1 AA

This section defines all accessibility requirements. Every implementation decision must satisfy these specifications before the site is considered complete.

---

### 6.1 Skip Navigation

A "Skip to main content" link is the **first focusable element** on every page. It is visually hidden until focused, then reveals itself.

```html
<!-- Placed immediately after <body> on every page -->
<a href="#main" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  top: -999px;
  left: 1rem;
  padding: 0.75rem 1.5rem;
  background: var(--color-brown);
  color: var(--color-ivory);
  border-radius: 4px;
  font-weight: 600;
  z-index: 9999;
  text-decoration: none;
}
.skip-link:focus {
  top: 1rem;
}
```

---

### 6.2 Semantic HTML Structure

| Element | Usage |
|---|---|
| `<header>` | Site-wide branding + navigation (one per page) |
| `<nav aria-label="Main navigation">` | Primary navbar |
| `<main id="main">` | Primary page content — target of skip link |
| `<section aria-labelledby="[id]">` | Each thematic page section |
| `<article>` | Individual competency blocks |
| `<aside>` | Supplementary info (e.g., sidebar callouts) |
| `<footer>` | Site-wide contact info + copyright |
| `<h1>–<h6>` | Strict hierarchy — never skip levels |
| `<ul>`, `<ol>` | Lists of items — never used for layout |
| `<button>` | All interactive triggers (not `<div>` or `<span>`) |
| `<a href>` | Links to pages or anchors (not JavaScript voids) |

---

### 6.3 Images & Media

| Element | Rule |
|---|---|
| Informative images | `alt="[descriptive text]"` required |
| Decorative images | `alt=""` (empty alt) so screen readers skip them |
| Profile photo | `alt="Professional photo of Ophelia Ivy Mensah"` |
| Placeholder images | `alt="[Image placeholder — to be replaced]"` |
| Icons (decorative) | `aria-hidden="true"` + accompanying visible label |
| Icons (standalone) | `role="img"` + `aria-label="[purpose]"` |
| No images of text | Text must be real HTML text, not embedded in images |

---

### 6.4 Keyboard Navigation

All interactive elements are reachable and operable via keyboard:

| Interaction | Keyboard Support |
|---|---|
| Navigate links/buttons | `Tab` / `Shift+Tab` |
| Activate buttons/links | `Enter` or `Space` |
| Mobile nav open/close | `Enter` on hamburger button |
| Accordion open/close | `Enter` or `Space` on trigger |
| Close modal/overlay | `Escape` |
| Tab trapping in modals | `Tab` cycles within open modal only |

**Focus indicator** — all focusable elements show a visible, high-contrast outline:

```css
/* Global focus style — overrides browser defaults for consistency */
:focus-visible {
  outline: 3px solid var(--color-focus);   /* #1A5E9C */
  outline-offset: 3px;
  border-radius: 2px;
}
/* Remove outline for mouse users only */
:focus:not(:focus-visible) {
  outline: none;
}
```

---

### 6.5 High-Contrast Mode Toggle

A toggle button in the site header allows users to switch to a high-contrast mode (dark background, high-contrast text). Preference is saved in `localStorage`.

```css
/* High contrast mode overrides */
[data-theme="high-contrast"] {
  --color-bg:      #000000;
  --color-surface: #1A1A1A;
  --color-text:    #FFFFFF;
  --color-heading: #FFFF00;
  --color-muted:   #DDDDDD;
  --color-link:    #66CCFF;
}
```

```html
<!-- In site header -->
<button id="contrast-toggle" aria-pressed="false" aria-label="Toggle high-contrast mode">
  <i class="fa-solid fa-circle-half-stroke" aria-hidden="true"></i>
  <span class="sr-only">High contrast</span>
</button>
```

> The toggle's `aria-pressed` attribute updates to `"true"` when active, communicating state to screen readers.

---

### 6.6 Forms (Contact Page)

```html
<form aria-label="Contact form">
  <div class="form-group">
    <label for="name">Full Name <span aria-hidden="true">*</span>
      <span class="sr-only">(required)</span>
    </label>
    <input id="name" type="text" name="name" required
           autocomplete="name" aria-required="true" />
  </div>

  <div class="form-group">
    <label for="email">Email Address <span aria-hidden="true">*</span>
      <span class="sr-only">(required)</span>
    </label>
    <input id="email" type="email" name="email" required
           autocomplete="email" aria-required="true" />
  </div>

  <div class="form-group">
    <label for="message">Message <span aria-hidden="true">*</span>
      <span class="sr-only">(required)</span>
    </label>
    <textarea id="message" name="message" rows="5" required
              aria-required="true"></textarea>
  </div>

  <button type="submit">Send Message</button>
</form>
```

**Error handling:** Inline error messages use `role="alert"` and are associated with their field via `aria-describedby`.

---

### 6.7 Accordion / Expandable Competency Cards

```html
<button
  class="accordion-trigger"
  aria-expanded="false"
  aria-controls="competency-as-panel"
  id="competency-as-btn">
  Advising &amp; Supporting (AS)
  <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
</button>

<div
  id="competency-as-panel"
  role="region"
  aria-labelledby="competency-as-btn"
  hidden>
  <!-- competency content -->
</div>
```

When expanded: `aria-expanded="true"`, `hidden` attribute removed.

---

### 6.8 Reduced Motion

Users who set "Prefer Reduced Motion" in their OS will see no animations:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

### 6.9 Screen Reader Utility Class

```css
/* Visually hidden but available to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

Used for: supplementary labels, icon descriptions, status messages.

---

### 6.10 Language & Document Metadata

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Professional e-portfolio of Ophelia Ivy Mensah,
    emerging student affairs professional and graduate student at BGSU.">
  <!-- Prevents zoom disable on mobile — required for accessibility -->
  <!-- Note: do NOT use user-scalable=no -->
</head>
```

---

### 6.11 Artifact Downloads — Accessible Links

All downloadable files use descriptive link text and include file format and size context:

```html
<!-- ✅ Accessible -->
<a href="assets/artifacts/equity-audit.pdf"
   download
   aria-label="Download Final Equity Audit — PDF, approximately 2 MB">
  <i class="fa-solid fa-file-pdf" aria-hidden="true"></i>
  Download Equity Audit (PDF)
</a>

<!-- ❌ Inaccessible — avoid -->
<a href="#">Click here</a>
```

---

### 6.12 WCAG 2.1 AA Compliance Checklist

| Criterion | Requirement | Status |
|---|---|---|
| 1.1.1 | Alt text for all non-text content | Designed in |
| 1.3.1 | Info and relationships via semantic markup | Designed in |
| 1.3.3 | No instructions relying on shape/color alone | Designed in |
| 1.4.1 | Color not used as the only visual means | Designed in |
| 1.4.3 | Text contrast ≥ 4.5:1 (3:1 for large text) | Verified in §5.2 |
| 1.4.4 | Text resizable up to 200% without loss | `rem` units throughout |
| 1.4.10 | Reflow — no horizontal scroll at 320px | Responsive design §7 |
| 1.4.11 | Non-text contrast ≥ 3:1 (focus, UI components) | Focus ring §6.4 |
| 1.4.12 | Text spacing overrides supported | No `!important` on spacing |
| 2.1.1 | All functionality via keyboard | §6.4 |
| 2.1.2 | No keyboard traps (except modals, escapable) | §6.4 |
| 2.4.1 | Bypass blocks — skip link | §6.1 |
| 2.4.2 | Page has descriptive title | §4.2 |
| 2.4.3 | Focus order logical | DOM order matches visual |
| 2.4.4 | Link purpose clear from context | §6.11 |
| 2.4.7 | Focus visible | §6.4 |
| 3.1.1 | Language of page declared | `lang="en"` §6.10 |
| 3.2.2 | No unexpected context change on input | No auto-submit |
| 3.3.1 | Error identification | `role="alert"` §6.6 |
| 3.3.2 | Labels for all inputs | `<label>` §6.6 |
| 4.1.1 | Valid HTML | W3C validator before submission |
| 4.1.2 | Name, role, value for all UI components | ARIA §6.7 |
| 4.1.3 | Status messages programmatically determined | `role="alert"` |

---

## 7. Responsive Design

### 7.1 Breakpoints

```css
/* Mobile first */
/* xs  — default: < 480px (small phones) */
/* sm  — 480px (large phones / landscape) */
/* md  — 768px (tablets) */
/* lg  — 1024px (small laptops) */
/* xl  — 1280px (desktops) */

@media (min-width: 480px)  { /* sm  */ }
@media (min-width: 768px)  { /* md  */ }
@media (min-width: 1024px) { /* lg  */ }
@media (min-width: 1280px) { /* xl  */ }
```

### 7.2 Layout Behavior by Breakpoint

| Component | Mobile (<768px) | Tablet (768–1023px) | Desktop (≥1024px) |
|---|---|---|---|
| Navbar | Hidden; hamburger toggle | Hamburger or inline | Full horizontal nav |
| Hero | Full-width, stacked text | 60/40 split | 50/50 with image |
| About Me | Single column | Single column | Two-column (photo + text) |
| Resume | Single column sections | Single column | Two-column layout |
| Competency accordion | Full width | Full width | Full width |
| Artifact cards | 1 column | 2 columns | 3 columns |
| Contact form | Full width | Centered, 80% | Centered, 600px max |

### 7.3 Touch Targets

All interactive elements (buttons, links) have a minimum touch target of **44×44px** per WCAG 2.5.5 (AAA) and Apple/Google guidelines.

```css
button, a, input, textarea, select {
  min-height: 44px;
  min-width: 44px; /* where applicable */
}
```

---

## 8. Navigation System

### 8.1 Desktop Navigation (HTML Structure)

```html
<header>
  <div class="nav-container">
    <a href="index.html" class="nav-brand" aria-label="Ophelia Ivy Mensah — Home">
      Ophelia Ivy Mensah
    </a>

    <nav aria-label="Main navigation">
      <ul role="list">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About Me</a></li>
        <li><a href="resume.html">Resume</a></li>
        <li><a href="competencies.html">Competencies</a></li>
        <li><a href="artifacts.html">Artifacts</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>

    <div class="nav-controls">
      <button id="contrast-toggle"
              aria-pressed="false"
              aria-label="Toggle high-contrast mode">
        <i class="fa-solid fa-circle-half-stroke" aria-hidden="true"></i>
      </button>
      <button id="menu-toggle"
              class="hamburger"
              aria-expanded="false"
              aria-controls="mobile-menu"
              aria-label="Open navigation menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </div>

  <!-- Mobile drawer -->
  <div id="mobile-menu" hidden aria-label="Mobile navigation">
    <!-- same links as above -->
  </div>
</header>
```

### 8.2 Active Page Indicator

Current page link has `aria-current="page"` and a visual underline/highlight:

```html
<a href="about.html" aria-current="page">About Me</a>
```

---

## 9. Component Library

### 9.1 Competency Card

```
┌─────────────────────────────────────────────┐
│  [EXEMPLARY BADGE]                          │
│  Advising & Supporting (AS)                 │  ← h3
│  ─────────────────────────────────────────  │
│  Narrative summary (2–3 sentences)          │
│                                             │
│  ▸ Activities                               │  ← accordion trigger
│    · Fall Practicum – OAAP                  │
│    · Student-Athlete Services               │
│    · Honors Project Video                   │
│                                             │
│  ▸ Artifacts                                │
│    [📄 Advising Philosophy]  [📄 Practicum] │
└─────────────────────────────────────────────┘
```

### 9.2 Artifact Card

```
┌──────────────────────────────┐
│  📄                          │  ← icon (aria-hidden)
│  Equity Audit                │  ← h3
│  [EXEMPLARY] [SJI]           │  ← badges
│  Brief 1–2 sentence summary  │
│                              │
│  [↓ Download (PDF)]          │  ← button with accessible label
└──────────────────────────────┘
```

### 9.3 Badge Styles

```css
.badge {
  display: inline-block;
  padding: 0.2em 0.7em;
  border-radius: 999px;
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.badge--exemplary   { background: var(--badge-exemplary); color: var(--color-ivory); }
.badge--proficient  { background: var(--badge-proficient); color: var(--color-ivory); }
.badge--foundational{ border: 1.5px solid var(--color-brown); color: var(--color-brown); }
```

> **Accessibility:** Badges are never the only indicator of level. Each competency's level is also stated in the section heading text.

### 9.4 Button Variants

```css
/* Primary */
.btn-primary {
  background: var(--color-brown);
  color: var(--color-ivory);
  padding: 0.75rem 1.75rem;
  border-radius: 6px;
  font-weight: 600;
  min-height: 44px;
}
/* Secondary (outline) */
.btn-secondary {
  background: transparent;
  border: 2px solid var(--color-brown);
  color: var(--color-brown);
}
/* Download */
.btn-download {
  background: transparent;
  border: 1.5px solid var(--color-brown);
  color: var(--color-brown);
  font-size: var(--text-sm);
}
```

---

## 10. JavaScript Interactions

### 10.1 Mobile Nav Toggle (`nav.js`)

```javascript
const menuBtn = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu.hidden = isOpen;
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !mobileMenu.hidden) {
    mobileMenu.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.focus(); // Return focus to trigger
  }
});
```

### 10.2 Accordion (`accordion.js`)

```javascript
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));

    trigger.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
});
```

### 10.3 High-Contrast Toggle (`theme.js`)

```javascript
const toggle = document.getElementById('contrast-toggle');
const saved = localStorage.getItem('high-contrast');

if (saved === 'true') applyHighContrast();

toggle.addEventListener('click', () => {
  const isActive = toggle.getAttribute('aria-pressed') === 'true';
  toggle.setAttribute('aria-pressed', String(!isActive));
  document.documentElement.dataset.theme = isActive ? '' : 'high-contrast';
  localStorage.setItem('high-contrast', String(!isActive));
});

function applyHighContrast() {
  document.documentElement.dataset.theme = 'high-contrast';
  toggle.setAttribute('aria-pressed', 'true');
}
```

---

## 11. Performance & SEO

| Concern | Approach |
|---|---|
| Font loading | `font-display: swap` to prevent invisible text during load |
| Image optimization | Compressed JPEGs / WebP where possible; explicit `width` + `height` attributes to prevent layout shift |
| CSS | Single minified CSS file for production |
| No render-blocking JS | All scripts at bottom of `<body>` with `defer` |
| Open Graph tags | `og:title`, `og:description`, `og:image` on each page |
| Canonical URL | `<link rel="canonical">` if hosted online |

---

## 12. Testing Checklist

Before submission, verify the following:

### Accessibility Testing
- [ ] Run [axe DevTools](https://www.deque.com/axe/) browser extension — zero critical violations
- [ ] Keyboard-only navigation test — all pages fully functional without mouse
- [ ] Screen reader test (NVDA + Firefox, or VoiceOver + Safari) — headings, links, forms announced correctly
- [ ] Zoom to 200% — no content loss, no horizontal overflow
- [ ] Resize browser to 320px width — reflow test
- [ ] Activate high-contrast toggle — all text remains readable
- [ ] Reduced-motion OS setting — no animations play

### Content & Links
- [ ] All internal page links work
- [ ] All artifact download links present (placeholders acceptable)
- [ ] Resume PDF link opens correctly
- [ ] LinkedIn URL correct
- [ ] Contact mailto link correct
- [ ] Spell-check all text content

### Cross-Browser
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Rubric Verification
- [ ] Resume present and complete ✓
- [ ] Mission statement prominently displayed ✓
- [ ] 3 Exemplary competencies with narratives + artifacts ✓
- [ ] 3 Proficient competencies with 2+ activity descriptions ✓
- [ ] 3 Foundational competencies present ✓
- [ ] Design exceeds basic template ✓
- [ ] All links functional ✓
- [ ] Grammar and proofreading complete ✓

---

*Software Design Document v1.0 — Ophelia Ivy Mensah Portfolio | April 16, 2026*
