---
name: ask-argon
description: >-
  Consult, prompt, and collaborate with Argon (Gemini 4 Argon), the expert Art Director,
  Visual Designer, and Technical Copywriter. Use this skill when the user asks to
  "fallo fare ad argon", "chiedi ad argon", "gira la home ad argon", or wants high-level
  visual reviews, design systems, HTML/CSS templates, and GitHub documentation.
---

# Argon Integration Skill (Gemini 4 Argon Bridge)

This skill defines the operational protocols, invocation patterns, and design principles for collaborating with **Argon** via the CLI bridge `/Users/lorenzo/.gemini/antigravity/bin/ask-argon`.

Argon acts as an **Art Director, Lead UX/UI Architect, and Technical Copywriter**, providing design governance, aesthetic reviews, production-ready frontend templates, and documentation.

---

## 1. Operating Modes

The bridge supports two execution modes. Choose the mode according to the deliverable:

### A. Design & Template Mode (`--mode design` / `--mode ux` / `--design`)
Use for:
- UX audits and architectural visual reviews of websites or apps.
- Design systems, design tokens (semantic color palettes, typographic scales, spatial grids, shadows/elevations).
- Complete, drop-in HTML5/CSS3 templates and interactive UI components.

**Standard 4-Step Output Structure:**
1. UX Analysis & Information Architecture (cognitive load reduction, hierarchy, WCAG contrast verification).
2. Design Tokens & Visual Specifications (color tokens with hex/hsl and contrast rationale, font pairings, 4/8pt spacing grid).
3. Drop-in Production Code (semantic HTML5, modern CSS Grid/Flexbox, CSS custom properties `:root`, responsive mobile-first).
4. Component States & Micro-interactions (`:hover`, `:focus-visible`, `:active`, disabled, loading/skeleton, empty state).

### B. Documentation & Copywriting Mode (`--mode doc` / `--mode readme`)
Use for:
- GitHub `README.md` and repository landing pages.
- Technical documentation, architecture guides, release manifests, and product copy.

In this mode, UI template injection is bypassed, allowing Argon to output clean, highly-structured Markdown optimized for GitHub Flavored Markdown (GFM).

---

## 2. Command Reference

### Standard Invocation with Prompt File (Recommended)
```bash
/Users/lorenzo/.gemini/antigravity/bin/ask-argon \
  --prompt-file prompt.txt \
  --mode doc \
  --output response.md
```

### UX / Design Review Invocation
```bash
/Users/lorenzo/.gemini/antigravity/bin/ask-argon \
  --prompt-file prompt.txt \
  --mode design \
  --output response.md
```

### Direct Inline Prompt
```bash
/Users/lorenzo/.gemini/antigravity/bin/ask-argon \
  --prompt "Analizza la palette e proponi la gerarchia tipografica per questo componente" \
  --mode design
```

---

## 3. Universal Best Practices & Lessons Learned

### A. Bridge Stability & Web Session Management
1. **Thread Isolation**: The bridge automatically starts a clean conversation ("Nuova chat") to prevent output contamination from previous runs.
2. **No Binary Uploads via CLI (`--media`)**: Do not upload binary files (`.png`, `.jpg`, `.pdf`) directly through the browser automation bridge, as web UI safety classifiers can trigger generic refusals on raw binaries. Always describe media assets, dimensions, and visual roles textually in the prompt.
3. **Prompt Size Discipline**: Keep prompt files concise and self-contained (<10 KB). Avoid passing large multi-file bundles (>50 KB) through browser contenteditable fields, which can cause DOM truncation or fail to trigger editor input events.

### B. CSS & Frontend Architecture
1. **Single Canonical Stylesheet**: Avoid multi-layer CSS conflicts (e.g., inline styles fighting external overrides and resets). All global tokens, resets, layouts, and components should be unified in a single, well-structured stylesheet.
2. **WCAG Contrast Ratios**:
   - Body text: minimum 4.5:1 (WCAG AA) or 7:1 (WCAG AAA).
   - Large headings: minimum 3:1 (WCAG AA).
   - Accents / Highlights: Always verify that text placed over high-chroma or accent backgrounds maintains certified contrast (never assume white text works on bright colors).
3. **Responsive Media Strategy**:
   - Desktop viewports: full-bleed or immersive hero containers (`100vh` / `100svh`, `object-fit: cover`).
   - Mobile viewports: adapt container heights (`height: auto`, `object-fit: contain`) when media content contains critical details across its entire aspect ratio to prevent destructive edge cropping.
4. **Typographic Rhythm & Orphans**: In fluid responsive layouts, bind critical compound names, brand titles, and units with non-breaking spaces (`&nbsp;`) to avoid single-word orphans on line wraps.

### C. GitHub Flavored Markdown (GFM) Standards
1. **No Inline CSS**: GitHub's `html-pipeline` sanitizes and strips all `style="..."` attributes. Control grid layouts and image sizing exclusively with native HTML attributes (`align="center"`, `width="240"`, `valign="top"`, `width="50%"`).
2. **Badge & Stamp Elements (`<kbd>` and `<samp>`)**: Never use triple backticks (```` ``` ````) for short tags, pills, or single-line labels. Triple backticks generate wide, full-width gray blocks with automatic copy buttons that disrupt layout flow. Use:
   - `<kbd> TEXT </kbd>` for bordered badge/stamp effects.
   - `<samp> TEXT </samp>` for monospace inline tags.
3. **No Nested Markdown inside Block HTML**: CommonMark does not reliably parse Markdown syntax inside block-level HTML tags (`<table>`, `<div>`). Use standard HTML tags (`<b>`, `<em>`, `<sub>`, `<ul>`, `<ol>`) within table cells.
4. **Filesystem Case-Sensitivity**: GitHub hosts documentation on Linux filesystems. Always ensure file paths match the exact case of the repository on disk.

---

## 4. Execution Workflow

1. **Formulate the Prompt**: Define the project identity, target audience, aesthetic tone, and strict negative constraints (e.g., zero emojis, no promotional buzzwords).
2. **Select the Mode**: Use `--mode design` for UI code and audits; use `--mode doc` for documentation and Markdown.
3. **Execute and Monitor**: Run `ask-argon` as a background task with appropriate wait time.
4. **Review & Integrate**: Apply the generated solution, verify the output in the target environment (browser, GitHub preview), and clean up temporary prompt/response files before committing.
