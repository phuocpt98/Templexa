# Templexa Project Restructuring — Brainstorm Report

**Date:** 2026-03-28
**Status:** Agreed proposal — pending implementation plan

---

## Problem Statement

Templexa has grown organically to 220+ templates with a heavy focus on wedding card generation. The tooling (commands, skills, shared assets, data files) has accumulated technical debt:

- **gen-wedding.md**: 1932 lines / 90KB — single largest file, context bloat for every invocation
- **Duplication**: gen-wedding exists as both command AND skill, with overlapping but diverging content
- **data.js**: 4584 lines monolith (products + categories + pricing + helpers all in one)
- **Scripts scattered**: `scripts/`, `products/shared/`, root-level
- **Memory fragmented**: `docs/memory/` (5 files) vs `.claude/projects/.../memory/` (MEMORY.md + 7 feedback files)
- **No quality gates**: wedding gen is a single pass — no structured review between design and implementation
- **Asset catalog mismatch**: SKILL.md references `wedding-asset-catalog.js` but actual file is `wedding-data.js`

---

## 1. `.claude/` Directory Restructuring

### Current State (problematic)

```
.claude/
├── commands/
│   ├── gen-wedding.md          ← 1932 lines (90KB!) — THE problem
│   ├── gen-wedding-pro.md      ← 373 lines (19KB)
│   ├── gen-landing.md          ← 556 lines (23KB)
│   ├── gen-qr.md               ← 167 lines
│   ├── catalog-assets.md       ← 266 lines
│   ├── convert-webp.md         ← 35 lines
│   ├── scan-images.md          ← 89 lines
│   └── sort-music.md           ← 142 lines
├── skills/
│   ├── gen-wedding/SKILL.md    ← 124 lines — DUPLICATES command
│   ├── gen-wedding-pro/SKILL.md← 224 lines — DUPLICATES command
│   └── catalog-assets/SKILL.md ← ~200 lines — DUPLICATES command
└── agent-memory/debugger/
```

### Proposed State

```
.claude/
├── commands/
│   ├── gen-wedding.md           ← SLIM: ~200 lines (orchestrator only)
│   ├── gen-wedding-pro.md       ← SLIM: ~150 lines (orchestrator only)
│   ├── gen-landing.md           ← keep as-is (manageable)
│   ├── gen-qr.md                ← keep as-is
│   ├── catalog-assets.md        ← keep as-is
│   ├── convert-webp.md          ← keep as-is
│   ├── scan-images.md           ← keep as-is
│   └── sort-music.md            ← keep as-is
├── skills/
│   └── gen-wedding/
│       ├── SKILL.md             ← DELETE (merged into refs/)
│   └── gen-wedding-pro/
│       ├── SKILL.md             ← DELETE (merged into refs/)
│   └── catalog-assets/
│       ├── SKILL.md             ← DELETE (merged into refs/)
├── refs/                        ← NEW: reference docs, loaded on-demand
│   ├── wedding-sections.md      ← Extracted: all section specs, HTML snippets, CSS patterns
│   ├── wedding-design-rules.md  ← Extracted: design style rules, font combos, color palettes
│   ├── wedding-constraints.md   ← Extracted: ràng buộc, ảnh rules, font rules, responsive rules
│   ├── wedding-process-b.md     ← Extracted: "Quy trình B: Gen theo khách"
│   ├── wedding-screenshot.md    ← Extracted: Puppeteer screenshot workflow
│   └── wedding-lessons.md       ← Extracted: bài học từ thiệp #211, #215, #217 + feedback
└── agent-memory/
```

### Key Decisions

**A. Break gen-wedding.md (1932 lines) into orchestrator + reference files**

The command file becomes a ~200-line orchestrator that:
1. Parses arguments
2. References `refs/wedding-sections.md` when building HTML
3. References `refs/wedding-design-rules.md` for styling decisions
4. References `refs/wedding-constraints.md` for validation
5. Follows the step-by-step workflow (Bước 1-10) but without inline code examples

The bulk content moves to `refs/` — only loaded when the agent needs that specific reference.

**Splitting strategy for gen-wedding.md:**

| Current section (lines) | Destination | Approx lines |
|--------------------------|-------------|-------------|
| Bước 1: Parse (42-115) | stays in command | 70 |
| Bước 1b: Song song (86-115) | stays in command | 30 |
| Bước 2-4: Thư viện + ID + Nhạc (116-165) | stays in command | 50 |
| Bước 5: HTML sections (167-900) | `refs/wedding-sections.md` | 730 |
| Bước 5: Envelope + Effects + Palettes + Fonts (251-540) | `refs/wedding-design-rules.md` | 290 |
| Bước 5b: prompt.txt (901-1109) | stays in command (shortened) | 50 |
| Bước 5c: Guest list (1110-1216) | `refs/wedding-process-b.md` | 100 |
| Bước 6-6b: Screenshots (1217-1314) | `refs/wedding-screenshot.md` | 100 |
| Bước 7-10: data.js + report (1315-1441) | stays in command | 120 |
| Bảng giá + Group Animations (1442-1537) | `refs/wedding-sections.md` | 95 |
| Phong cách thiết kế (1538-1665) | `refs/wedding-design-rules.md` | 130 |
| Ràng buộc (1667-1757) | `refs/wedding-constraints.md` | 90 |
| Quy trình B (1760-1932) | `refs/wedding-process-b.md` | 170 |

**Result**: command ~200 lines + 5 ref files (~300 lines each avg)

**B. Eliminate skill/command duplication**

Skills (`SKILL.md`) are summaries of commands — they serve NO purpose when the command exists. Delete all three SKILL.md files. The `refs/` directory replaces them as the knowledge base.

**C. gen-wedding-pro.md stays separate but slimmer**

gen-wedding-pro is already reasonable at 373 lines. It references gen-wedding heavily. After the split, it becomes:
- ~150-line orchestrator referencing same `refs/` files
- Adds PRO-specific: ui-ux-pro-max integration, brainstorm-per-section workflow, lesson logging

---

## 2. JS File & Library Organization

### Current State

```
assets/js/data.js              ← 4584 lines (PRODUCTS + CATEGORIES + TYPES + PRICING + helpers)
products/shared/
├── wedding-data.js            ← 1220 lines (asset catalog)
├── animations.css             ← 551 lines (shared CSS)
├── wedding/
│   ├── styles.css             ← 3946 lines
│   ├── scripts.js             ← 1642 lines
│   ├── wishes-api.js          ← 69 lines
│   ├── names.js               ← 95 lines
│   └── README.md              ← 1506 lines
scripts/
├── convert-webp.js            ← build utility
└── update-webp-refs.js        ← build utility
```

### Proposed: DO NOT SPLIT data.js

**Rationale against splitting:**
- data.js is loaded by the browser as a single `<script>` tag
- No module bundler (vanilla JS project)
- Splitting means multiple `<script>` tags and load-order dependencies
- PRODUCTS array is the bulk (4358 lines) — you can't meaningfully split a single array
- CATEGORIES, TYPES, PRICING are only ~230 lines combined
- The helpers at the bottom depend on PRODUCTS being in scope

**Verdict: Keep data.js as-is.** The 4584 lines are almost entirely DATA (product entries), not logic. Data files are large by nature — this is not the same problem as a 4584-line logic file.

### Proposed: Consolidate scripts/

```
scripts/                           ← Build/dev utilities (NOT shipped to browser)
├── convert-webp.js                ← already here
├── update-webp-refs.js            ← already here
└── (future build scripts go here)
```

No other changes needed. The root has no stray JS files. `products/shared/` is the right place for wedding runtime libraries since wedding HTML files reference them via relative paths (`../../../shared/`).

### Proposed: Rename wedding-data.js for consistency

```
products/shared/wedding-data.js → products/shared/wedding-asset-catalog.js
```

Reason: SKILL.md already references `wedding-asset-catalog.js`. The name is more descriptive. One rename + update refs in commands/skills.

### Wedding shared/ structure — keep as-is

The current structure is well-organized:
```
products/shared/
├── wedding-asset-catalog.js     ← renamed from wedding-data.js
├── animations.css               ← shared scroll animations
├── wedding/
│   ├── styles.css               ← wedding CSS components
│   ├── scripts.js               ← wedding JS components
│   ├── wishes-api.js            ← API layer
│   ├── names.js                 ← name randomizer
│   └── README.md                ← HTML snippets reference
├── images/wedding/              ← photo sets, icons, elements, backgrounds
├── fonts/                       ← custom fonts
└── music/                       ← BGM by genre
```

This is already good. The relative path convention (`../../../shared/`) works. No restructuring needed.

---

## 3. Wedding Generation Workflow with BMAD Principles

### Current Workflow (implicit, linear)

```
User request → Parse → Read library → Choose assets → Gen HTML → Screenshot → Add to data.js → Done
```

Problems:
- No design review before implementation
- No uniqueness check against recent cards
- No quality gate before screenshots
- Lessons learned buried in SKILL.md (read once, then forgotten)

### Proposed: 4-Phase BMAD-lite Workflow

**Phase 1: ANALYSIS (automated, ~2 min)**
```
Inputs:  User request ($ARGUMENTS)
Actions:
  1. Parse requirements (style, names, date, type)
  2. Read last 3 wedding cards from data.js → extract palettes, envelope styles, animation types used
  3. Read wedding-asset-catalog.js → match style preset or query tags
  4. Read refs/wedding-lessons.md → load accumulated lessons
Output:  Analysis brief (internal, not a file)
Gate:    Must have ≥2 differentiation points from last 3 cards
```

**Phase 2: DESIGN (for PRO: brainstorm; for standard: auto-select)**
```
Inputs:  Analysis brief
Actions:
  - Standard (/gen-wedding): Auto-select palette + fonts + envelope + effects from catalog
  - PRO (/gen-wedding-pro): Brainstorm per-section with user, present 3 style options
Output:  Design decisions (palette, fonts, envelope style, section list, effects, photo set)
Gate:    Design decisions logged; PRO requires user approval
```

**Phase 3: IMPLEMENTATION (gen HTML)**
```
Inputs:  Design decisions + library files
Actions:
  1. Create folder
  2. Gen code.html using refs/wedding-sections.md patterns
  3. Apply design rules from refs/wedding-design-rules.md
  4. Validate constraints from refs/wedding-constraints.md
Output:  code.html + prompt.txt
Gate:    Self-check: responsive mobile, envelope decoration, font support, relative paths
```

**Phase 4: DELIVERY (screenshots + data)**
```
Inputs:  Validated code.html
Actions:
  1. User review (for PRO) OR auto-proceed (for standard)
  2. Screenshot via Puppeteer
  3. Convert to WebP
  4. Add entry to data.js
  5. Log lessons to refs/wedding-lessons.md (if PRO or if feedback received)
Output:  Complete product entry
Gate:    Screenshot quality check (fonts loaded, layout correct)
```

### Quality Gates Summary

| Gate | Check | Fail action |
|------|-------|-------------|
| Uniqueness | ≥2 differences from last 3 cards | Force different palette/envelope/effect |
| Design | PRO: user approves | Revise options |
| Validation | Mobile responsive, fonts OK, paths correct | Fix before screenshot |
| Screenshot | Fonts rendered, layout not broken | Re-screenshot with longer wait |

### Story File Template (for PRO brainstorm)

Not needed as a formal file. The brainstorm happens in conversation. The design decisions are captured implicitly in the code.html. Adding story files for a solo dev workflow adds overhead without value.

**YAGNI verdict: Skip formal story files.** The command's step-by-step workflow IS the story.

---

## 4. Asset Management

### Current Issues
- `wedding-data.js` (1220 lines) called `wedding-data.js` but skills reference `wedding-asset-catalog.js`
- `products/shared/new/` exists with just `icon` — unclear purpose
- No pipeline for adding new assets to catalog

### Proposed

**A. Rename for consistency** (as noted in section 2):
```
wedding-data.js → wedding-asset-catalog.js
```

**B. Clean up `products/shared/new/`:**
This appears to be an inbox/staging folder. Either:
- Use it intentionally: new assets go here, `catalog-assets` command processes them into catalog
- Or delete it if unused

**C. Asset pipeline (already exists, just formalize):**
```
1. Add new images to products/shared/images/wedding/{set-name}/
2. Run /catalog-assets → updates wedding-asset-catalog.js with tags/metadata
3. Assets now available via catalog queries (findPhotoSets, findIcons, etc.)
```

This pipeline already works via the `catalog-assets` command. No changes needed — just ensure the rename is reflected.

---

## 5. Memory & Knowledge Base

### Current State (fragmented)

**Location A: `docs/memory/` (5 files, 121 lines total)**
```
MEMORY.md                        ← 34 lines — project-level memory
feedback-asset-processing.md     ← 24 lines
feedback-envelope-iteration.md   ← 18 lines
feedback-wedding-design-depth.md ← 21 lines
feedback-wedding-ui-design.md    ← 24 lines
```

**Location B: `~/.claude/projects/.../memory/` (global)**
```
MEMORY.md                        ← project overview + conventions + feedback links
feedback_music_relative_path.md
feedback_wedding_design_style.md
feedback_envelope_decoration.md
feedback_product_folder_path.md
feedback_wedding_self_improvement.md
feedback_project_scope_skills.md
feedback_wedding_pro_lessons.md
feedback_screenshot_rules.md
```

**Location C: Inside SKILL.md (gen-wedding-pro)**
```
Lines 138-171: Lessons from #211, #215, #217
Lines 132-136: Anti-repetition rules
```

### Proposed: Consolidate to 2 locations

**Keep `docs/memory/` as the canonical project memory** (committed to git, available across machines):
```
docs/memory/
├── MEMORY.md                    ← Project-level memory (keep as-is)
├── feedback-*.md                ← Individual feedback files (keep as-is)
└── wedding-lessons.md           ← NEW: consolidated lessons from all wedding cards
```

**Keep `~/.claude/projects/.../memory/` for Claude-specific session memory** — this is auto-managed by Claude, don't fight it.

**Move lessons from SKILL.md to `.claude/refs/wedding-lessons.md`:**
```
.claude/refs/wedding-lessons.md
├── Anti-repetition rules
├── Lesson: #211 (Blush Romantic)
├── Lesson: #215 (Double Happiness)
├── Lesson: #217 (Garden Gate)
└── (appended after each PRO gen)
```

**Key principle**: Feedback about HOW to build wedding cards → `.claude/refs/` (used by commands). Feedback about project conventions → `docs/memory/` (used by all agents).

### Wedding Design Pattern Library

Instead of a formal pattern library (YAGNI), rely on:
1. `refs/wedding-design-rules.md` — the rules
2. `refs/wedding-lessons.md` — what worked, what didn't
3. `products/shared/wedding/README.md` — HTML/CSS snippets (already 1506 lines)

These three files together ARE the pattern library. No new system needed.

---

## 6. Implementation Priority & Effort

| # | Task | Effort | Impact | Priority |
|---|------|--------|--------|----------|
| 1 | Split gen-wedding.md into command + refs/ | 3h | HIGH — saves context on every wedding gen | P0 |
| 2 | Delete SKILL.md duplicates (3 files) | 5min | MED — eliminates confusion | P0 |
| 3 | Rename wedding-data.js → wedding-asset-catalog.js | 15min | LOW — consistency | P1 |
| 4 | Add BMAD quality gates to gen-wedding command | 1h | HIGH — prevents repetition | P1 |
| 5 | Create refs/wedding-lessons.md from SKILL.md content | 30min | MED — knowledge preservation | P1 |
| 6 | Clean up products/shared/new/ | 5min | LOW — housekeeping | P2 |

**Total estimated effort: ~5 hours**

Tasks NOT proposed (YAGNI):
- Splitting data.js — no value, adds complexity
- Formal story files — overhead for solo dev
- Moving scripts/ — already in right place
- New /lib or /utils folder — not needed
- Restructuring products/shared/ — already well-organized

---

## 7. Before/After Summary

### Before
```
gen-wedding.md: 1932 lines, loaded entirely every invocation
3 SKILL.md files duplicating commands
wedding-data.js name mismatch with references
Lessons buried in SKILL.md
No uniqueness check between wedding cards
No quality gates
```

### After
```
gen-wedding.md: ~200 lines orchestrator
5 ref files in .claude/refs/ (~300 lines each, loaded on-demand)
0 duplicate SKILL.md files
wedding-asset-catalog.js (consistent naming)
wedding-lessons.md (growing knowledge base)
4-phase BMAD-lite workflow with quality gates
Uniqueness check: ≥2 differences from last 3 cards
```

---

## Unresolved Questions

1. **`products/shared/new/icon`** — what is this? Should it be cleaned up or is it an active staging area?
2. **gen-landing.md (556 lines)** — should this also get the refs/ treatment, or is it manageable as-is?
3. **The global memory in `~/.claude/projects/`** — some feedback files there overlap with `docs/memory/`. Should overlapping ones be deduplicated, or is redundancy acceptable since they serve different Claude contexts?
4. **wedding/README.md (1506 lines)** — this is already a large reference file. Should it also be split, or does it function well as a single lookup document?

