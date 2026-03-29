# Templexa Project Exploration Report

**Date**: 2026-03-28  
**Thoroughness**: MEDIUM  
**Scope**: Complete project structure, skills, wedding generation workflow

---

## 1. PROJECT ROOT STRUCTURE

The Templexa project is a template customization service website featuring 220+ design templates.

```
Templexa/
├── index.html                          # Homepage
├── products.html                       # Products listing page
├── product-detail.html                 # Product detail page
├── contact.html                        # Contact & pricing page
├── preview.html                        # Preview page
├── products-admin.html                 # Admin interface for products
├── bang-gia-thiep-cuoi.html           # Wedding card pricing page
├── thu-vien-hieu-ung.html             # Effects library page
├── assets/
│   ├── css/style.css                   # Main stylesheet (2900+ lines, CSS variables + dark mode)
│   ├── js/
│   │   ├── data.js                     # Products, categories, API config (4584 lines)
│   │   ├── main.js                     # Shared JS (dark mode, menu, animations)
│   │   ├── products.js                 # Search, filter, grid, pagination
│   │   ├── product-detail.js           # Detail page, gallery, modals
│   │   ├── contact.js                  # Pricing, form validation, Google Sheets
│   │   ├── products-admin.js           # Admin functionality
│   │   └── data-loader.js              # Data loading utilities
│   └── images/                         # Logo, icons, hero backgrounds, SVGs
├── products/                           # 220+ design templates (156 Web products + 65 Invitations)
│   ├── Web/
│   │   ├── Onepage/                    # Landing pages (30 products)
│   │   ├── E-commerce/                 # E-shop templates (37 products)
│   │   ├── Portfolio/                  # Portfolio sites (26 products)
│   │   ├── Education/                  # Course/training sites (34 products)
│   ├── Invitation/
│   │   ├── Wedding/                    # 40+ wedding invitations (gen_152 through gen_220)
│   │   ├── Other/                      # Birthday, anniversary invitations
│   └── shared/                         # Shared assets (music, images, fonts)
│       ├── music/wedding/              # Background music tracks
│       ├── images/
│       │   ├── wedding/                # Photo sets, icons, backgrounds
│       │   └── wedding-elements/       # Decorative elements
│       ├── fonts/
│       ├── new/                        # New assets awaiting cataloging
│       └── wedding-data.js             # Asset catalog metadata
├── wedding/                            # Wedding-related config
│   ├── config.js                       # Wedding template config
│   ├── template.html                   # Wedding invitation base template
│   └── trong-nghia-thu-thuy/          # Specific couple folder
├── docs/
│   ├── SYSTEM.md                       # System documentation
│   ├── wedding-tag-matrix.md           # Wedding asset tag reference
│   └── memory/                         # Design feedback & learnings
│       ├── MEMORY.md
│       ├── feedback-envelope-iteration.md
│       ├── feedback-wedding-design-depth.md
│       ├── feedback-wedding-ui-design.md
│       └── feedback-asset-processing.md
├── scripts/                            # Utility scripts
│   ├── convert-webp.js                 # Convert PNG/JPG to WebP
│   └── update-webp-refs.js             # Update WebP references in code
├── .claude/                            # Project-specific Claude config
│   ├── commands/                       # Custom commands (8 files)
│   ├── skills/                         # Project skills (3 skills)
│   ├── agent-memory/                   # Agent memory
│   └── settings.local.json
├── plans/                              # Project plans & reports
├── package.json                        # Node.js project config
├── .gitignore
├── CLAUDE.md                           # Project guide (design system, conventions)
└── README.md
```

**Key Statistics**:
- 220 design products total (156 Web + 65 Invitations)
- 40+ generated wedding invitations (gen_152 through gen_220)
- 4584-line data.js with complete product catalog
- 8 custom commands in `.claude/commands/`
- 3 project-specific skills in `.claude/skills/`

---

## 2. `.CLAUDE/` DIRECTORY STRUCTURE (PROJECT-SPECIFIC)

```
.claude/
├── commands/                           # 8 custom skill commands
│   ├── gen-wedding.md                  # Generate wedding invitations
│   ├── gen-wedding-pro.md              # Premium wedding generation (design + frontend-design)
│   ├── catalog-assets.md               # Catalog new images → tags, WebP, organize
│   ├── scan-images.md                  # Scan product folders → update data.js images[]
│   ├── gen-qr.md                       # Generate QR codes for invitations
│   ├── gen-landing.md                  # Generate landing pages
│   ├── convert-webp.md                 # Convert PNG/JPG to WebP
│   └── sort-music.md                   # Organize music files by category
├── skills/                             # 3 custom skills
│   ├── gen-wedding/
│   │   └── SKILL.md                    # Wedding invitation generation (90KB detailed guide)
│   ├── gen-wedding-pro/
│   │   └── SKILL.md                    # Premium wedding design (18KB with learning feedback)
│   └── catalog-assets/
│       └── SKILL.md                    # Asset cataloging workflow (9KB)
├── agent-memory/
│   └── debugger/                       # Agent memory folder
├── settings.local.json                 # Local Claude settings
└── .DS_Store
```

**Command Files Overview**:
- `gen-wedding.md` (90KB) — comprehensive guide with asset catalog, style presets, section decorations
- `gen-wedding-pro.md` (18KB) — premium workflow: research → design system → UI design → screenshots → data
- `catalog-assets.md` (9KB) — batch process icons/backgrounds/photo sets with vision analysis & WebP conversion
- `scan-images.md` (3KB) — scan product folders and update images[] in data.js
- `gen-qr.md` (5KB) — generate QR codes (single + per-guest) with preview HTML
- `gen-landing.md` (22KB) — landing page generation
- `convert-webp.md` (1KB) — WebP conversion wrapper
- `sort-music.md` (5KB) — organize music by mood/category

---

## 3. GLOBAL `~/.CLAUDE/` DIRECTORY STRUCTURE

```
~/.claude/
├── agents/                             # 14 pre-built agents
│   ├── brainstormer.md
│   ├── code-reviewer.md
│   ├── code-simplifier.md
│   ├── debugger.md
│   ├── docs-manager.md
│   ├── fullstack-developer.md
│   ├── git-manager.md
│   ├── journal-writer.md
│   ├── mcp-manager.md
│   ├── planner.md
│   ├── project-manager.md
│   ├── researcher.md
│   ├── tester.md
│   └── ui-ux-designer.md
├── commands/                           # 2 global custom commands
│   ├── build-from-spec.md              # Build from design spec
│   └── clone-ui.md                     # Clone UI from reference site
├── skills/                             # 78 installed skills (Anthropic official)
│   ├── Common: ask, research, plan, problem-solving, debug, fix, code-review, simplify
│   ├── Frontend: frontend-development, frontend-design, ui-styling, ui-ux-pro-max, react-best-practices
│   ├── Backend: backend-development, databases, payment-integration, shopify, better-auth
│   ├── DevOps: devops, docker, testing, mcp-management, devops, chrome-devtools
│   ├── Media: media-processing, ai-artist, ai-multimodal, markdown-novel-viewer, remotion
│   ├── Web: web-frameworks, web-testing, web-design-guidelines, tanstack, threejs, shader
│   ├── Docs: docs, mintlify, docs-seeker
│   ├── Git: git, watzup, team, worktree
│   ├── Tools: bootstrap, cook, kanban, plans-kanban, project-management, journal, mermaidjs-v11
│   └── Emerging: scout, sequential-thinking, ck-help, find-skills, context-engineering, gkg
├── chrome-devtools/
│   └── tmp/wedding-screenshots.mjs     # Puppeteer script for wedding card screenshots
├── rules/                              # Coding rules & conventions
├── hooks/                              # Pre/post-commit hooks
├── scripts/                            # Global utility scripts
├── output-styles/                      # Output formatting styles
├── projects/                           # Project metadata
├── settings.json                       # Global Claude settings
└── history.jsonl                       # Session history
```

**Key Points**:
- 78 official Anthropic skills installed globally
- 14 pre-built agents for specialized tasks
- Chrome DevOps utilities for screenshot automation
- Global commands for UI cloning & spec-based building

---

## 4. SCRIPTS FOLDER (`/scripts/`)

```
scripts/
├── convert-webp.js                     # Convert PNG/JPG → WebP with quality control
│                                        # Usage: node convert-webp.js <input> <output>
└── update-webp-refs.js                 # Update image references in code after WebP conversion
                                        # Finds & replaces PNG/JPG paths with .webp equivalents
```

**Purpose**: Asset pipeline utilities to convert images and maintain references in templates.

---

## 5. PRODUCTS/SHARED/ STRUCTURE

```
products/shared/
├── music/                              # Organized by mood/category
│   ├── wedding/                        # Wedding background music (Beautiful In White, A Thousand Years, Sugar)
│   ├── romantic/                       # Romantic tracks (Only Love, Endless Love, Everyday I Love You)
│   ├── sad-ballad/                     # Ballads (Titanic theme, Until You)
│   └── upbeat-energy/                  # Energetic tracks
├── images/
│   ├── wedding/
│   │   ├── icons/                      # 30+ decorative icons
│   │   ├── backgrounds/
│   │   │   ├── floral-watercolor/     # Wreath, corner, blush anemone patterns
│   │   │   ├── floral-lineart/        # Line art botanical patterns
│   │   │   └── floral-photo/          # Photo-based backgrounds
│   │   ├── {9 photo sets}/            # Individual couple photo collections
│   │   │   ├── korean-studio-white/
│   │   │   ├── korean-studio-gray/
│   │   │   ├── korean-studio-classic-beige/
│   │   │   ├── elegant-black-gold/
│   │   │   ├── modern-romantic/
│   │   │   ├── coral-minimalist/
│   │   │   ├── vit-sang-trong/
│   │   │   ├── viet-green/
│   │   │   └── viet-mem-mai/
│   │   └── (each set contains: hero, envelope, couple, story, gallery, decoration images)
│   └── wedding-elements/               # 31 decorative elements (frames, dividers, flowers)
├── fonts/                              # Typography resources
├── new/                                # Incoming assets (awaiting catalog-assets processing)
│   ├── icon/                           # New icons (grid 3x3 or single)
│   ├── background/                     # New backgrounds
│   └── photo-sets/                     # New couple photo sets
├── animations.css                      # Shared animation definitions
└── wedding-data.js                     # Asset catalog metadata (JSON array with tags, colors, mood)
```

**Asset Catalog Format** (wedding-data.js):
```javascript
{
    id: 'korean-studio-white',
    name: 'Korean Studio White',
    style: 'Studio professional',
    tags: ['elegant', 'classic', 'white', 'studio'],
    colors: ['white', 'beige', 'gold'],
    mood: 'Elegant & professional',
    files: {
        hero: 'couple_hero.webp',
        envelope: 'couple_main.webp',
        couple: ['file1.webp', 'file2.webp'],
        story: ['...'],
        gallery: ['...'],
        decoration: ['...']
    }
}
```

---

## 6. SKILLS CATALOG

### PROJECT-SPECIFIC SKILLS (`.claude/skills/`)

#### 1. **gen-wedding** (SKILL.md - 90KB)
**Purpose**: Generate wedding invitations quickly from templates

**Key Features**:
- Asset catalog system (photoSets, icons, elements, music, stylePresets)
- 7 style presets: elegant-classic, romantic-modern, traditional-vietnamese, cute-chibi, sage-green-vintage, dark-luxury, fresh-green
- Tag-based asset querying system
- Section decoration guide (envelope, hero, divider, love story, calendar, gallery, footer, popup)
- Screenshot automation with Puppeteer (mobile 430x932, desktop 1280x800)
- WebP conversion pipeline
- Data.js integration

**Workflow**: Read catalog → Select style/assets → Gen HTML → Screenshot → Convert WebP → Update data.js

---

#### 2. **gen-wedding-pro** (SKILL.md - 18KB)
**Purpose**: Premium wedding design with award-quality custom designs

**Key Features**:
- Integrates `/gen-wedding` + `/frontend-design` + `/ui-ux-pro-max` skills
- Design system research via ui-ux-pro-max
- Typography pairing (not default fonts)
- Custom color palettes & dark-aware CSS
- Advanced animations (parallax, particles, 3D transforms)
- Section brainstorming (not just envelope)
- Background overlay decoration (wreath, corner patterns)
- Learning feedback system (Bài học từ thiệp #211, #215, #217)

**Key Learnings**:
- Envelope design is critical first impression — invest in brainstorming
- Avoid repeating palette/layout/animations across wedding cards
- Brainstorm EVERY SECTION (not just envelope) for cohesive design
- Complex CSS shapes (gates, pillars) need SVG inline or background images, not just borders
- Photo-based design (design AROUND the couple photo) > template + force photo in

**Workflow**: Research & design system → Asset selection → Brainstorm by section → Implement → Screenshot → Data.js → Self-review

---

#### 3. **catalog-assets** (SKILL.md - 9KB)
**Purpose**: Batch process new assets (icons, backgrounds, photo sets) into catalog

**3 Processing Types**:
1. **Icons**: Grid crop (3x3, 2x3) → transparent background → rename → WebP (q90) → `icons/`
2. **Backgrounds**: Convert → name as `bg-{category}-{descriptor}.webp` → `backgrounds/{category}/`
3. **Photo Sets**: Vision analyze → classify images → WebP (q85) → add photoSet to wedding-data.js

**Tools**: ImageMagick (magick - crop, transparency), cwebp (WebP conversion), Vision (batch image analysis)

**Tag Taxonomy**: Style, Color, Usage, matchPalettes

---

### GLOBAL CUSTOM COMMANDS (`~/.claude/commands/`)

1. **build-from-spec.md**: Generate complete HTML/CSS/JS from design spec
2. **clone-ui.md**: Clone UI/UX from reference site → design spec

---

### KEY OFFICIAL SKILLS (Global)

**Design & Frontend**:
- `frontend-design`: Polished interfaces from designs/screenshots
- `ui-ux-pro-max`: 50 styles, 21 palettes, 50 font pairings, design intelligence
- `react-best-practices`: Vercel performance optimization
- `ui-styling`: shadcn/ui + Tailwind CSS components

**Code Quality**:
- `code-review`: Technical feedback & verification
- `simplify`: Reuse, quality, efficiency analysis
- `fix`: Bug fixing with root cause analysis

**Planning & Execution**:
- `plan`: Implementation plans, technical roadmaps
- `cook`: Activate before implementing features
- `test`: Unit, integration, e2e, UI testing

**Media & Content**:
- `media-processing`: FFmpeg (video/audio), ImageMagick (images)
- `ai-artist`: Image generation via Nano Banana (129 curated prompts)
- `ai-multimodal`: Gemini API for image/audio/video analysis

---

## 7. WEDDING CARD GENERATION WORKFLOW

### High-Level Flow

```
USER REQUEST
    ↓
[gen-wedding-pro]
    ↓
Research & Design System (ui-ux-pro-max)
    ↓
Read wedding-asset-catalog.js
    ↓
Map style keywords → Check style presets OR query by tags
    ↓
Select: photoSet + icons + elements + music
    ↓
Brainstorm envelope & sections (brainstormer agent optional)
    ↓
Implement HTML/CSS/JS (frontend-design)
    ↓
Screenshot via Puppeteer (chrome-devtools)
    - Start Python HTTP server (port 3001)
    - Mobile viewport: 430x932 (iPhone 17)
    - Desktop viewport: 1280x800
    - Scroll to sections & capture
    - PNG → WebP (cwebp -q 85)
    ↓
Update assets/js/data.js
    - images[]: [screen.webp, anh_1.webp, anh_2.webp, anh_3.webp]
    - thumbnail: screen.webp
    ↓
Review & Learn (code-review optional)
    - Responsive check (max-width: 420px)
    - Envelope decoration sufficiency
    - Font pairing accuracy
    - Animation smoothness
    ↓
Update memory with learnings
    - Stored in: /docs/memory/feedback-*.md
```

### Key Integration Points

1. **Asset Catalog** (`wedding-data.js`):
   - photoSets (9 couples photo collections)
   - icons (30 decorative icons)
   - elements (31 wedding elements)
   - music (3 categories)
   - stylePresets (7 pre-designed combinations)

2. **Related Commands**:
   - `/gen-wedding` — Quick template generation
   - `/gen-wedding-pro` — Premium custom design
   - `/catalog-assets` — Add new assets to catalog
   - `/gen-qr` — Create QR codes for invitation
   - `/scan-images` — Update product images[]
   - `/gen-landing` — Landing page counterpart

3. **Output Structure**:
   ```
   products/Invitation/Wedding/gen_{id}_{slug}/
   ├── index.html              # Main invitation
   ├── data.js                 # Customer customization
   ├── code.html OR code/      # Alternative structure
   ├── guests.js               # Guest list (if applicable)
   ├── images/                 # Customer photos (optional)
   ├── qr/                     # Generated QR codes (optional)
   ├── screen.webp             # Mobile preview thumbnail
   ├── anh_1.webp              # Desktop screenshot 1 (hero)
   ├── anh_2.webp              # Desktop screenshot 2 (couple + love story)
   ├── anh_3.webp              # Desktop screenshot 3 (gallery)
   └── (original images before WebP conversion)
   ```

---

## 8. JS FILES ORGANIZATION

### Core Application Files

**Main Codebase** (`/assets/js/`):
- `data.js` (4584 lines) — Master product catalog, API config, helper functions
- `main.js` (12KB) — Shared functionality: dark mode toggle, hamburger menu, slider, scroll animations
- `products.js` (26KB) — Product grid: search, filter, sorting, pagination, rendering
- `product-detail.js` (18KB) — Detail page: render specs, gallery, modal, related products
- `contact.js` (6KB) — Contact form: pricing cards, validation, Google Sheets submission
- `products-admin.js` (1KB) — Admin interface for product management
- `data-loader.js` (1KB) — Data loading utilities

### Shared & Template Files

**Products**:
- `/products/shared/wedding/scripts.js` — Wedding-specific scripts (countdown, wishes API)
- `/products/shared/wedding/wishes-api.js` — Guest wishes/guestbook API
- `/products/shared/wedding/names.js` — Name handling utilities
- `/products/shared/wedding-data.js` — Asset catalog (tags, colors, mood, files mapping)

**Wedding Invitations** (Generated):
- `/products/Invitation/Wedding/gen_{id}_{slug}/customer/data.js` — Customer customization data
- `/products/Invitation/Wedding/gen_{id}_{slug}/guests.js` — Guest list (per-couple invitations)

**Wedding Config**:
- `/wedding/config.js` — Wedding template base configuration

### Utility Scripts

**Assets Pipeline** (`/scripts/`):
- `convert-webp.js` — PNG/JPG → WebP conversion
- `update-webp-refs.js` — Update image references after conversion

---

## 9. DATA.JS STRUCTURE (4584 lines)

**Sections**:
1. **API CONFIG** — Google Sheets API endpoint for forms
2. **PRODUCTS ARRAY** — 220 design templates with metadata:
   - id, name, slug, category, type, tags
   - images[], thumbnail, demoUrl
   - features, status, priority
   - rating, downloads, showInSlider
   - updatedAt, price

3. **CATEGORIES** — Web, Invitation, Google-sheet product groupings
4. **PRICING** — Service packages & pricing tiers
5. **CONSTANTS** — CATEGORIES array, STATUS values
6. **HELPER FUNCTIONS** — find product, get featured, filter by category, etc.

**Example Product Entry**:
```javascript
{
    id: 206,
    name: 'Website bán sản phẩm chăm sóc tóc Luxe Hair Studio',
    slug: 'website-ban-san-pham-cham-soc-toc-luxe-hair-studio',
    category: 'e-commerce',
    type: 'website',
    images: ['./products/Web/E-commerce/done_57_web_desktop_ecommerce_hair care_luxe hair studio/screen.png', ...],
    thumbnail: './products/Web/E-commerce/done_57_web_desktop_ecommerce_hair care_luxe hair studio/screen.png',
    demoUrl: './products/Web/E-commerce/done_57_web_desktop_ecommerce_hair care_luxe hair studio/index.html',
    features: ['Thiết kế luxury gold & dark', 'Grid sản phẩm 4 cột responsive', 'Testimonials + Blog section'],
    status: 'new',
    priority: 0,
    updatedAt: '2026-03-24',
}
```

---

## 10. TECH STACK & CONVENTIONS

**Frontend**:
- HTML/CSS/JS vanilla (no frameworks)
- Font: Inter (body) + Averia Serif Libre (logo)
- Responsive: clamp() + media queries (1024px, 768px, 480px)
- Animations: IntersectionObserver for scroll effects
- Dark mode: CSS Variables (--bg-primary, --text-primary, etc.)
- BEM-like CSS naming

**Design System**:
- **Primary Colors**: Indigo (#6366F1), Purple (#7C3AED), Blue (#3B82F6)
- **Gradients**: Hero text, CTA buttons, showcase backgrounds
- **Typography**: Inter (400-800 weights) + Averia Serif
- **Shadows**: 0 4px 15px rgba(0,0,0,0.05) for cards
- **Border Radius**: 12-24px cards, 30-34px pill buttons, 16px icon boxes

**Image Format**:
- Primary: WebP (quality 85 for photos, 90 for icons)
- Fallback: PNG/JPG
- All wedding assets: `.webp` extension

**Build Tools**:
- Node.js (package.json exists but minimal dependencies)
- ImageMagick (magick) for image processing
- cwebp for WebP conversion
- Puppeteer for screenshots (via chrome-devtools skill)

**Deployment**:
- Static site (HTML/CSS/JS)
- GitHub Pages (CNAME: templexa.com)
- Google Sheets API for form submissions

---

## KEY PAIN POINTS & ORGANIZATION INSIGHTS

### Current Strengths
1. **Well-documented workflow** — Detailed SKILL.md files for each workflow
2. **Asset catalog system** — Centralized metadata (wedding-data.js) with tag taxonomy
3. **Reusable components** — Shared music, images, fonts, elements
4. **Automation-ready** — Clear script structure for image processing & QR generation
5. **Design feedback loop** — Memory files track learnings from each wedding card

### Potential Pain Points
1. **Large data.js (4584 lines)** — Could benefit from splitting into category-specific files or modules
2. **Manual asset cataloging** — Requires batch processing script (`catalog-assets`) after uploading new images
3. **Screenshot automation** — Requires manual Python HTTP server setup before Puppeteer script
4. **Asset path management** — Both relative (shared) and absolute (generated) paths; can cause confusion
5. **Wedding invitation duplication risk** — 40+ gen_* folders; need discipline to avoid repeating layouts
6. **Command documentation in .claude/commands** — Longer commands (90KB gen-wedding.md) might exceed some context limits
7. **No UI for QR generation** — Manual `/gen-qr` command execution; users unfamiliar with CLI might struggle

### Design System Gaps
- No documented component library for reusable wedding elements
- Icon set (30 icons) not cataloged individually with usage examples
- Background overlay patterns (wreath, corner) mentioned in gen-wedding-pro but not indexed
- No live preview tool for wedding-data.js tag combinations

---

## UNRESOLVED QUESTIONS

1. **Asset Management**: How are new couple photo sets validated before adding to wedding-data.js? Vision-only or manual review?
2. **Customer Customization**: What's the workflow for customizing gen_* invitations for specific customers (photos, names, dates)?
3. **QR Integration**: Are QR codes automatically embedded in generated invitations, or generated separately for printing?
4. **Performance**: With 40+ wedding invitations and 220 products, are there any performance optimization concerns for product loading?
5. **Versioning**: How are wedding invitation revisions handled (v1, v2, v3)? Is there a naming scheme?
6. **Mobile Previews**: Besides Puppeteer screenshots, is there a live preview tool for wedding invitations during design?
7. **Accessibility**: Are wedding invitations tested for accessibility (WCAG compliance)?
8. **Analytics**: Is there tracking for product downloads, favorites, or user interactions?
9. **Music Licensing**: What's the license status of music files in products/shared/music/?
10. **Customer Data**: Where are customer customizations (names, dates, guest lists) stored? data.js, database, or per-folder?

---

## RECOMMENDATIONS

**Immediate (Next 1-2 sprints)**:
- Document customer customization workflow (how to modify gen_* for specific couples)
- Create asset validation checklist for wedding-data.js additions
- Build UI wrapper for `/gen-qr` command (reduce CLI dependency)

**Medium-term (1-3 months)**:
- Split data.js into modules (categories/web.js, categories/invitation.js, etc.)
- Create wedding element component library with usage examples
- Automate QR generation as part of `/gen-wedding` workflow

**Long-term (3-6 months)**:
- Build design dashboard to preview style combinations (photoSet + palette + elements)
- Implement live wedding invitation preview (Playwright/Puppeteer server)
- Add version control for wedding invitations (git-based or custom versioning)
- Performance audit for 220+ product catalog loading
