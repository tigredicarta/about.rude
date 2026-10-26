---
name: ask-argon
description: >-
  Consult, prompt, and collaborate with Argon (Gemini 4 Argon), the expert Art Director,
  Visual Designer, and Technical Copywriter. Use this skill when the user asks to
  "fallo fare ad argon", "chiedi ad argon", "gira la home ad argon", or wants high-level
  visual reviews, design systems, HTML/CSS templates, and GitHub documentation.
---

# Argon Integration Skill (Gemini 4 Argon Bridge)

This skill documents how to invoke, instruct, and collaborate with **Argon** via the dedicated CLI bridge `/Users/lorenzo/.gemini/antigravity/bin/ask-argon`.

Argon operates as the project's **Art Director, Lead UX/UI Architect, and Technical Copywriter**.

---

## 1. Operating Modes

The bridge script supports two distinct modes that determine what Argon generates:

### A. Design & Template Mode (`--mode design` / `--mode ux` / `--design`)
Use when requesting:
- Architectural visual reviews of web pages (CSS, HTML, layouts).
- Design system tokens (palette, typography scale, borders, elevations).
- Production-ready HTML5/CSS3 templates and interactive components.

In this mode, Argon provides a 4-step structured delivery:
1. UX Analysis & Information Architecture (WCAG AA/AAA contrasts, hierarchy).
2. Design Tokens & Visual Specifications.
3. Complete drop-in HTML/CSS code.
4. Component states (:hover, :focus-visible, :active, empty state).

### B. Documentation & Copywriting Mode (`--mode doc` / `--mode readme`)
Use when requesting:
- GitHub `README.md` and repository presentations.
- Technical documentation, press releases, riders, manifests.

In this mode, template injection is disabled, allowing Argon to produce pure, highly-structured Markdown tailored for GitHub Flavored Markdown (GFM).

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

### Fast Text Prompt
```bash
/Users/lorenzo/.gemini/antigravity/bin/ask-argon \
  --prompt "Analizza la palette e proponi la gerarchia tipografica per il footer" \
  --mode doc
```

---

## 3. Critical Rules & Learned Best Practices

### A. Bridge Stability & Browser Context
- **Fresh Chat Session**: The bridge script automatically opens a "Nuova chat" on Gemini to ensure clean context and avoid re-reading stale conversation outputs.
- **No Binary Media Uploads (`--media`)**: Do NOT pass binary images (`.png`, `.jpg`, `.pdf`) directly via `--media` to Gemini web UI, as Google's safety classifiers trigger generic refusals on raw binaries. Instead, reference image dimensions, paths, and visual roles textually in the prompt.
- **Prompt Size Discipline**: Keep prompt files concise (<10KB). Avoid piping 50KB+ files into the editor; modern browser contenteditable fields can truncate or fail to trigger Quill's input event.

### B. GitHub Flavored Markdown (GFM) Styling Rules
Learned from Argon's GitHub layout architecture:
1. **No Inline CSS**: GitHub's `html-pipeline` sanitizes and strips all `style="..."` attributes. Control layout solely via native HTML attributes (`align="center"`, `width="240"`, `valign="top"`, `width="50%"`).
2. **Badge & Stamp Typography (`<kbd>` and `<samp>`)**: Never use triple backticks (```` ``` ````) for short titles, subheads, or badges in GitHub READMEs. Triple backticks create full-width gray boxes with intrusive copy buttons. Instead, use:
   - `<kbd> TESTO BADGE </kbd>` for bordered fanzine stamp effect.
   - `<samp> TESTO LOCANDINA </samp>` for monospace pills.
3. **No Nested Markdown in HTML**: CommonMark does not process Markdown nested inside block-level HTML tags (`<table>`, `<div>`). Use raw HTML tags inside table cells (`<b>`, `<em>`, `<sub>`, `<pre>`).
4. **Linux Case-Sensitivity**: GitHub runs on Linux. Paths must match disk casing strictly (e.g. `FOTO/RUDE_WC.jpg` vs `assets/rude-logo-rosa.png`).

### C. Fanzine / Risograph CSS System Rules
Learned from Argon's deep architectural critique:
1. **Single Canonical Sheet (`brand.css`)**: Prevent "3-layer CSS wars" (inline styles vs overrides vs resets). Consolidate all tokens, resets, layouts, and component rules into one canonical file.
2. **Risograph Contrast Law**: On Risograph pink (`#FF3D8B`), text must **always** be pure ink black (`#101010`), NEVER white. White on pink yields a 2.98:1 ratio (fails WCAG AA). Ink black on pink yields 6.8:1 (passes AA/AAA).
3. **Physical Shadows**: Use hard, zero-blur offsets (`6px 6px 0px var(--ink-black)`), true to risograph screen printing.
4. **Typographic Rhythm & Orphans**: In fluid responsive layouts, bind critical artist names and phrases with non-breaking spaces (`&nbsp;`) to avoid single-word orphans on new lines.
5. **Responsive Hero Framing**:
   - Desktop (>= 769px): Immersive full-screen poster (`100vh`/`100svh`, `object-fit: cover`).
   - Mobile (<= 768px): Full uncropped photo (`width: 100%`, `height: auto`, `object-fit: contain`, 3:2 aspect ratio) so that all band members are 100% visible from edge to edge.

---

## 4. Workflow Checklist

When collaborating with Argon on a task:
1. Prepare a clear, concise prompt file describing the band/project identity, goals, and strict negative constraints (e.g., zero emojis, zero corporate jargon).
2. Choose the appropriate `--mode` (`design` for UI/CSS, `doc` for Markdown/copy).
3. Launch `ask-argon` via background task with adequate timeout (`WaitMsBeforeAsync: 10000`).
4. Inspect the generated response, review Argon's diagnosis, and apply the drop-in code.
5. Clean up temporary prompt/response files before committing.
