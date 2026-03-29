# BMAD Methodology Research Report

**Date:** 2026-03-28
**Researcher:** AI Research Agent
**Focus:** BMAD framework for AI agent workflows + application to template/product generation

---

## Executive Summary

BMAD (Breakthrough Method for Agile AI-Driven Development) is an open-source, production-grade framework for orchestrating multi-agent AI systems through structured, phase-based workflows. Core value: replaces ad-hoc "vibe coding" with artifact-driven, versioned development where 12+ specialized agents (Analyst, PM, Architect, Developer, QA, etc.) collaborate via explicit handoffs and quality gates.

**Relevance to Templexa:** BMAD's 4-phase model (Analysis → Planning → Solutioning → Implementation) maps naturally to template/product generation pipelines. Agent specialization enables parallel research (design validation, code generation, docs) before implementation, reducing rework and ensuring consistency.

---

## 1. What is BMAD?

### Core Definition
- **Acronym:** Breakthrough Method for Agile AI-Driven Development (also: "Build More Architect Dreams")
- **Type:** Multi-agent orchestration framework + agile methodology
- **Status:** Open-source, free, no paywalls ([GitHub](https://github.com/bmad-code-org/BMAD-METHOD))
- **Approach:** Mirrors real-world agile teams but with AI efficiency — replaces single general-purpose AI with focused, role-specific agents

### Philosophy
BMAD solves three key problems:
1. **Context collapse** — single agent loses context mid-task. BMAD: agents hand off via explicit artifacts (brief → PRD → architecture → stories).
2. **Audit trail gap** — "vibe coding" leaves no traceable evidence. BMAD: all decisions + code versioned in git, supports compliance (SOC 2, HIPAA).
3. **Consistency** — multiple manual handoffs introduce drift. BMAD: structured templates + workflow definitions enforce consistency.

---

## 2. BMAD Phases & Workflow Structure

### Four-Phase Model

| Phase | Purpose | Primary Agents | Output Artifacts |
|-------|---------|---|---|
| **1. Analysis** | Explore problem space, validate ideas | Analyst, Product Analyst | Brief, user research, gap analysis |
| **2. Planning** | Define what to build, for whom, why | PM, Product Owner, Scrum Master | PRD, user stories, success metrics |
| **3. Solutioning** | Architect how to build it | Architect, Designer, Tech Lead | Architecture doc, design specs, tech choices, story breakdown |
| **4. Implementation** | Build, test, deploy | Developer, QA, DevOps | Code, tests, deployment scripts |

**Key:** Each phase produces docs that become **required context** for the next phase. PRD informs architecture constraints. Architecture tells developer which patterns to follow. This eliminates "why did we build this way?" guesswork.

### Workflow Orchestration Pattern

```
Workflow := YAML blueprint with:
  - Agent assignments per step
  - Dependencies (step A blocks B until complete)
  - Quality gates (artifact must pass criteria)
  - Template references (PRD template, story template)
  - Context passing (artifact from step X → input for step Y)
```

Example: `greenfield-fullstack` workflow:
1. Analyst creates Brief → validates assumptions
2. PM creates PRD (Brief is prerequisite) → validates product vision
3. Architect creates Architecture (PRD is prerequisite) → validates tech fit
4. SM breaks into stories → assigns to developers
5. Developers implement in parallel → each story is self-contained

---

## 3. Key BMAD Principles

### A. Artifact-Driven Development
- Everything is explicit: requirements, architecture, decisions, code.
- All artifacts under version control → durable history.
- No implicit knowledge in AI's "head" — team can review why decisions were made.

### B. Specialized Agent Roles
BMAD includes 12+ agents:

| Agent | Role | Key Responsibility |
|-------|------|---|
| **Analyst** | Explore space | Validate problem, gather research |
| **PM** | Define product | Write PRD, user stories |
| **Architect** | Design system | Tech stack, API design, data models |
| **Scrum Master** | Plan delivery | Break epics into tasks, estimate |
| **Developer** | Build | Code implementation, per story |
| **QA** | Test | Test strategy, test plans, bug reports |
| **UX Designer** | Design UI | Wireframes, interaction patterns |
| **DevOps/Infra** | Deploy | Infrastructure, CI/CD, monitoring |
| **Orchestrator** | Coordinate | Manage task dependencies, queue, quality gates |

### C. Context Persistence Through Templates

BMAD solves context collapse via **story files**. Key insight:
- Traditional dev: hand off to dev → "build this feature"
- BMAD: hand off **self-contained story file** with ALL context

Example story file structure:
```
# Story: User Sign Up

## Context
- Why: Reduce churn by 10%, per PRD section 3.2
- Architecture decision: JWT + Redis session, per arch doc line 45
- User persona: Growth-focused SaaS customers

## Acceptance Criteria
1. Email validation
2. Rate limit sign-ups to 10/min
3. Notify analytics of signup event

## Design Reference
[Link to design spec with wireframes]

## Code Reference
[Link to similar patterns in codebase]

## Dependency Notes
- Requires email service (SendGrid) configured
- Requires analytics event tracker setup (from infra team)
```

Developer reads story once → has everything needed. No Slack threads, no tribal knowledge.

### D. Planning ↔ Execution Separation

BMAD = **Planning layer** (Analyst → PM → Architect → SM generate specs + stories)
Wiggum = **Execution layer** (bash loop feeds stories one-by-one to dev agent)

Benefit: plan once, execute repeatedly. Stories are reusable across versions/platforms.

### E. Quality Gates

Workflow transitions happen only after **explicit validation**:

```
┌─ Analyst generates brief
│  ├─ Gate: Does brief answer "who, what, why?"
│  └─ If yes → hand to PM
│     └─ PM generates PRD
│        ├─ Gate: Are acceptance criteria testable?
│        └─ If yes → hand to Architect
```

Prevents garbage in → garbage out.

---

## 4. BMAD Directory Structure (.claude/)

Standard layout for Claude Code + BMAD:

```
.claude/
├── settings.json                      # Claude Code configuration
├── CLAUDE.md                          # Project instructions
├── skills/                            # Custom or BMAD-provided skills
│   ├── SKILL.md                       # Skill definition + trigger rules
│   ├── .venv/bin/python3              # Python environment (if used)
│   └── [skill_implementation]/
├── agents/                            # Custom agent definitions
│   ├── [agent-name].md                # Agent persona + system prompt
│   └── [agent-name]-tools.json        # Tools available to agent
├── bmad/                              # BMAD framework
│   ├── config.yaml                    # BMAD configuration
│   ├── workflow.yaml                  # Workflow definitions
│   ├── agent-overrides/               # Custom agent tweaks
│   └── custom/                        # User-defined agents
├── commands/                          # Repeatable CLI commands
│   └── bmad/                          # BMAD-specific commands
├── rules/                             # Development rules
│   ├── primary-workflow.md
│   ├── development-rules.md
│   └── orchestration-protocol.md
└── [project-memory]/                  # Agent memory (persistent)
    └── MEMORY.md                      # Memory index
```

**Key for teams:** Skills are project-scoped (in git) not global. Each skill has frontmatter controlling when Claude auto-invokes it:

```yaml
---
name: wedding-design-generator
trigger: ["generate wedding", "create invitation"]
when: user_says_any_of_these_things
model: claude-opus
---

# Skill: Wedding Design Generator
[Implementation details...]
```

---

## 5. BMAD Application to Template/Product Generation

### Mapping Templexa Workflow to BMAD

**Current Templexa process:** User says "create wedding invitation #220" → developer (or AI) generates HTML/CSS/images → manual QA.

**BMAD equivalent:**

#### Phase 1: Analysis
- **Agent:** Design Analyst
- **Task:** Review design trends, similar templates, user personas ("brides 25–35 budget $200–500")
- **Output:** Design brief (what makes this invitation unique?)

#### Phase 2: Planning
- **Agent:** Product Manager
- **Task:** Define requirements (mobile + desktop, dark mode, customization options, accessibility)
- **Output:** PRD with acceptance criteria

#### Phase 3: Solutioning
- **Agent:** Template Architect + Designer
- **Task:** Choose layout structure (card-based? scroll? modal-based?), color palette, animation approach
- **Output:** Architecture doc + design specs (figma/wireframe links)

#### Phase 4: Implementation
- **Agents:** HTML Developer, CSS Developer, QA
- **Task:** Generate code per story files (each "story" is a feature: "hero section", "gallery", "form", etc.)
- **Output:** Code, tests, screenshots

### Concrete Example: Wedding Invitation #221

**Story file for "Hero Section":**

```markdown
# Story: Wedding Invitation #221 — Hero Section

## Context
- Design style: Romantic, organic (per design brief #221-design)
- Brand colors: Dusty rose (#C5A6A6), gold (#D4AF37)
- Font: Averia Serif Libre (headers), Playfair Display (title)
- Mobile viewport: 390×844px

## Acceptance Criteria
1. Full viewport hero (100vh on desktop, 85vh on mobile)
2. Background: couple photo with subtle overlay
3. Badge: "Mr. & Mrs." purple gradient
4. Heading: Couple names, gradient text (rose → gold)
5. Description: Wedding date + location
6. CTA: "RSVP Now" button (gradient, shadow)
7. Dark mode: Overlay opacity +20%, text lightened
8. No inline styles — use CSS variables & classes

## Design Reference
[Figma: https://figma.com/...]
[Reference template #179 (organic/romantic style)]

## Code Reference
- Similar pattern: `index.html` hero section
- Gradient generator: `assets/js/data.js` gradients object
- Animation: Use IntersectionObserver fade-in from `main.js`

## Implementation Steps
1. Create `<section class="hero hero-221">` wrapper
2. Add background image with `background-image: url(...)`
3. Apply `::before` overlay with CSS var `--overlay-gradient`
4. Structure: badge + h1 (gradient text) + p (location) + button
5. Test responsive: 1440px, 768px, 390px viewports
6. Verify dark mode: inspect `[data-theme="dark"]` overrides
7. Lighthouse score ≥ 85 performance

## Success Criteria
- Screenshot matches design spec within 5% pixel-level variation
- Mobile: 3-second load, 60fps scroll
- Dark mode verified on 2+ browsers
- Accessibility: 4:1 contrast ratio, semantic HTML
```

**Benefit:** Developer reads story → knows exactly what to build, why, and has context. Can implement in isolation. QA reads same story → knows what to test.

---

## 6. BMAD Best Practices for `.claude/` Organization

### 1. **Skills are Project-Scoped**
- Store custom skills in `.claude/skills/` (not globally)
- Include in git — portable across machines
- Each skill has SKILL.md with frontmatter + implementation

### 2. **Agents are Versioned**
- Define custom agents in `.claude/agents/` as Markdown files
- Include system prompt, model preference, tool access
- Discoverable by orchestrator on startup

### 3. **Workflows are Explicit**
- Define phases + agent assignments in `.claude/bmad/workflow.yaml`
- Each workflow references templates (PRD template, story template, etc.)
- Template-driven reduces decisions by agents

### 4. **Memory Separates Concerns**
- `.claude/[project-memory]/MEMORY.md` indexes persistent knowledge
- Memory updated after each major phase
- Keeps context tight (under 200 lines per memory file)

### 5. **Rules Enforce Consistency**
- `.claude/rules/` contains project-specific policies
- Primary workflow, development rules, orchestration protocol
- Agents read rules at startup — no exceptions

### 6. **Commands Enable Repeatability**
- `.claude/commands/` stores repeatable workflows (e.g., "run all tests")
- Callable by agents via CLI
- Eliminates "how did we do this last time?"

---

## 7. Unresolved Questions & Gaps

1. **Model Routing:** How does BMAD decide which Claude model (Haiku vs Opus) each agent uses? Token efficiency vs quality tradeoff?

2. **Real-time Coordination:** When agents run in parallel (e.g., Architect + Designer both need to finalize), how are conflicts resolved? Who has final say?

3. **Template Customization:** BMAD ships with general templates (PRD, story). For specialized domains (wedding invitations), how deep should custom templates go?

4. **Cost Management:** Running 12+ agents per project—what's typical token spend? Any cost optimization patterns?

5. **Evaluation Metrics:** Beyond "artifact passes gate," how does BMAD measure quality? Test coverage? User satisfaction? Design adherence?

6. **Skill Composition:** Can custom skills call other skills, or are they flat? Dependency graph management?

7. **Handoff Robustness:** If an agent fails mid-workflow (API error), does BMAD resume from checkpoint or restart?

---

## 8. Key Resources

- **Official Docs:** [BMAD Method](https://docs.bmad-method.org/)
- **GitHub:** [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)
- **Claude Code Skills:** [aj-geddes/claude-code-bmad-skills](https://github.com/aj-geddes/claude-code-bmad-skills)
- **Community Guides:** [Medium: "Mastering the BMAD Method"](https://medium.com/@courtlinholt/mastering-the-bmad-method-a-revolutionary-approach-to-agile-ai-driven-development-for-modern-e7be588b8d94)

---

## Recommendations for Templexa

1. **Adopt Phase Model:** Use BMAD's 4-phase structure for template generation. Each template project becomes a "story" with explicit design brief → PRD → architecture → implementation.

2. **Specialize Agents:** Create custom `.claude/agents/` for Templexa domain:
   - `wedding-design-specialist.md` — validates aesthetic/romantic trends
   - `template-architect.md` — optimizes code structure for reuse
   - `accessibility-auditor.md` — ensures WCAG 2.1 AA

3. **Template Library:** Build reusable BMAD templates in `.claude/bmad/`:
   - `wedding-design-brief-template.md`
   - `template-story-template.md` (pre-populated with mobile breakpoints, dark mode checklist)

4. **Workflow Automation:** Define `.claude/bmad/workflow.yaml` with:
   - `create-wedding-invitation` workflow (6–8 steps, quality gates)
   - Auto-trigger design-brief generation when user uploads reference images

5. **Memory for Design Patterns:** Maintain `.claude/templexa-memory/wedding-design-patterns.md` with:
   - Successful layouts (card-based, scroll-based, modal-based)
   - Color palette rules (dusty vs vibrant)
   - Animation patterns (fade-in, slide, parallax)
   - Anti-patterns to avoid (too many animations, low contrast, etc.)

---

**Report Status:** Complete. Ready for implementation planning phase.
