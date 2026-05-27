# TUIs

A living evaluation of TUI frameworks and approaches. The main artifact is `index.html` — open it in a browser:

```bash
open index.html
```

## How to extend

The whole site is one self-contained HTML file with no build step. To add a new framework or refine an existing take, edit `index.html` directly:

- **New framework**: add an entry under "The three contenders" (the `.grid-3` cards), then a detailed section under "Contenders" with the same shape as Bubble Tea / Ratatui / Textual (Mental model → code snippet → Strengths → Weaknesses). Add rows to the comparison tables.
- **New axis of comparison**: add an `<h3>` under "Axes of comparison" with a new table.
- **New decision rule**: add a `.rule-block` under "Decision guide".
- **Investigated an open question**: move it out of "Open questions" into the relevant section. Note it in the changelog.

Every entry in "Open questions" is a stub waiting for a real evaluation.
