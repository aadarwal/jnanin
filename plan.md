# Tong Physics Knowledge Repository Plan

## Purpose

Build a concrete, dense, running physics knowledge document from David Tong's lecture notes. The final result should feel like an expert exam sheet or personal formula repository: equations, definitions, assumptions, regimes of validity, symbol meanings, and essential conceptual links, with nearly all pedagogical prose removed.

The reader already understands the physics. Do not teach from first principles. Do not reproduce Tong's narrative. Extract the mathematical and conceptual skeleton and rewrite it into a compact personal reference.

## Source Corpus

The local source PDFs are in `tong/`:

| File | Tong notes | Pages |
| --- | --- | ---: |
| `tong/vc.pdf` | Vector Calculus | 137 |
| `tong/dynrel.pdf` | Dynamics and Relativity | 166 |
| `tong/clas.pdf` | Classical Dynamics | 139 |
| `tong/electro.pdf` | Electromagnetism | 236 |
| `tong/qm.pdf` | Quantum Mechanics | 133 |
| `tong/topicsinqm.pdf` | Topics in Quantum Mechanics | 251 |
| `tong/statphys.pdf` | Statistical Physics | 191 |
| `tong/solidstate.pdf` | Solid State Physics | 131 |
| `tong/fluids.pdf` | Fluid Mechanics | 245 |

Recommended build order:

1. `vc.pdf`
2. `dynrel.pdf`
3. `clas.pdf`
4. `electro.pdf`
5. `qm.pdf`
6. `topicsinqm.pdf`
7. `statphys.pdf`
8. `solidstate.pdf`
9. `fluids.pdf`

This order builds mathematical and physical dependencies before specialized topics.

## Target Artifact

Create or extend a single running LaTeX knowledge base, with one major part per PDF and compact subsections following Tong's section structure where useful.

Suggested structure:

```text
knowledge/
  main.tex
  preamble.tex
  sections/
    01_vector_calculus.tex
    02_dynamics_relativity.tex
    03_classical_dynamics.tex
    04_electromagnetism.tex
    05_quantum_mechanics.tex
    06_topics_quantum_mechanics.tex
    07_statistical_physics.tex
    08_solid_state_physics.tex
    09_fluid_mechanics.tex
```

If working as a long-running agent assigned to one PDF, only edit the corresponding section file unless explicitly asked otherwise.

## Taste And Density

The document should be extremely concise and equation-forward.

Write for an expert version of the user:

- Prefer formulas over prose.
- Prefer aligned equation blocks over paragraphs.
- Prefer symbol dictionaries over explanatory sentences.
- Prefer "definition / result / condition / consequence" over "motivation / derivation / intuition."
- Keep derivations only when the intermediate steps encode reusable structure.
- Use prose only to state what an equation means, what assumptions it needs, or when two formulas are equivalent.
- Remove historical comments, jokes, motivational text, examples that do not introduce reusable formulas, and textbook-style exposition.
- Do not include long quotes or copied paragraphs from Tong. Synthesize in original wording.

The desired reading experience is: "I can scan a page and immediately recover the content of an entire lecture."

## Style Reference

Match the style of the existing Optics and Photonics LaTeX work in `/Users/aadarwal/Desktop/opticsandphotonics`.

Observed style to preserve:

- `article` class, compact and clean.
- `geometry`, `amsmath`, `amssymb`, `bm`, `mathtools`, `hyperref`, `fancyhdr`, `lastpage`, and `tikz` where needed.
- Crisp headers and rules.
- Dense equation blocks with occasional boxed final results.
- Numbered blocks or compact subsection headings.
- Minimal but precise prose.
- `\noindent` for direct starts.
- `\vspace` and horizontal rules used sparingly to separate major units.
- TikZ only when a diagram materially compresses a definition, geometry, or physical setup.

Do not make the document visually decorative. The aesthetic is technical, organized, and high signal.

## LaTeX Conventions

Use notation that is compact and consistent across the repository.

General conventions:

- Vectors: `\mathbf{x}` for ordinary vectors, `\bm{\sigma}` for bold Greek/symbolic objects.
- Operators: `\nabla`, `\partial_\mu`, `D_\mu`, `\hat H`, `\hat p`, etc.
- Differentials: use `\,d^n x`, `\,dt`, `\,dV`.
- Definitions: use `\equiv`.
- Important final results: use `\boxed{\; ... \;}`.
- Multi-line relations: use `align*`, `aligned`, or `gather*`.
- Symbol lists: short inline clauses after the equation, or compact displayed arrays.
- Units and dimensions: include only when they clarify scaling or validity.

Avoid:

- Long paragraphs between equations.
- Overexplaining algebra.
- Repeating the same definition across many places unless local context requires it.
- Unnecessary theorem environments.
- Overly large diagrams.
- Decorative color palettes.

## Content Selection

For each Tong section, capture:

1. Core definitions.
2. Central equations.
3. Boundary or initial conditions.
4. Conservation laws.
5. Transformation laws and symmetry statements.
6. Variational principles and resulting Euler-Lagrange equations.
7. Canonical examples only when they define a reusable template.
8. Limiting cases and approximations.
9. Dimensionless parameters and scaling laws.
10. Relations between equivalent formulations.

Usually omit:

- Warm-up prose.
- Long derivations whose only purpose is pedagogy.
- Lengthy examples with no reusable final formula.
- Verbal intuition that is already obvious from the equation.
- Book recommendations and administrative material.
- Exercises.

When unsure, include the result if it is something the user might want on an exam sheet.

## Per-Section Format

Use a compact repeated pattern:

```latex
\subsection*{Topic Name}

\noindent\textbf{Definitions.}
\[
...
\]
where ...

\noindent\textbf{Core identities.}
\[
...
\]

\noindent\textbf{Dynamics / theorem / result.}
\[
\boxed{\; ... \;}
\]
Assumptions: ...
```

For very dense topics, use compact labels:

```latex
\noindent\textbf{Hamiltonian flow.}\quad
\[
\dot q_i = \frac{\partial H}{\partial p_i},
\qquad
\dot p_i = -\frac{\partial H}{\partial q_i},
\qquad
\dot f = \{f,H\} + \frac{\partial f}{\partial t}.
\]
```

Prefer this over explanatory paragraphs.

## Symbol Discipline

Every dense block must be locally intelligible.

For each cluster of equations:

- Define all nonstandard symbols.
- State index conventions if used.
- State metric signature if relevant.
- State Fourier transform convention if relevant.
- State whether units are SI, natural units, Gaussian units, etc.
- State assumptions such as small angle, nonrelativistic, inviscid, incompressible, equilibrium, weak field, adiabatic, or thermodynamic limit.

Do not bury symbol definitions in prose. Keep them close to the equation.

## Treatment Of Derivations

Keep derivations only if they are structurally useful.

Good derivation:

```latex
\[
S[q] = \int_{t_1}^{t_2} L(q,\dot q,t)\,dt,
\qquad
\delta S = 0
\quad\Longrightarrow\quad
\boxed{\frac{d}{dt}\frac{\partial L}{\partial \dot q_i}
- \frac{\partial L}{\partial q_i} = 0}.
\]
```

Bad derivation:

- Several paragraphs explaining why stationary action is plausible.
- Step-by-step algebra that an expert can reconstruct instantly.
- Repetition of definitions already stated elsewhere.

Use derivations as compression, not instruction.

## Diagrams

Use diagrams only when they replace many words:

- Coordinate systems.
- Geometry of a boundary value problem.
- Phase portraits.
- Light cones / spacetime diagrams.
- Brillouin zones or reciprocal lattice geometry.
- Control volumes.
- Thermodynamic cycles.

Keep diagrams small, clean, and labeled by symbols used in the equations. If a diagram is not mathematically useful, omit it.

## Cross-References

At the end of a compact block, include a light source marker only when useful for auditability:

```latex
\hfill{\footnotesize Tong EM \S 2.1}
```

Do not clutter every equation with citations. Use source markers at subsection or cluster level.

When a result appears in multiple PDFs, include the most natural version in the first relevant section and cross-reference it later instead of duplicating large blocks.

## Quality Bar

Before handing off work, verify:

- The section compiles.
- Equations are syntactically valid LaTeX.
- No source PDF prose has been copied wholesale.
- All important symbols in each block are defined.
- The density is high: no paragraph should exist unless it earns its space.
- Boxed equations are genuinely central results, not every equation.
- Notation is consistent with nearby sections.
- The result is useful as a fast expert review sheet.

## Agent Workflow

For an agent assigned to one PDF:

1. Identify the PDF title and section outline.
2. Create a short extraction map: PDF sections -> planned LaTeX subsections.
3. Process the PDF sequentially.
4. For each section, extract core equations and compress the surrounding meaning into definitions, assumptions, and consequences.
5. Write directly into the assigned `.tex` section file.
6. Compile the full document or at least the assigned section.
7. Record any unresolved notation conflicts or missing context in a short handoff note.

Do not attempt to perfect the whole repository while assigned to one PDF. Preserve local consistency and leave clearly marked coordination issues for the integrator.

## Handoff Note Format

At the end of an agent run, report:

```text
PDF handled:
Section file edited:
Sections completed:
Sections skipped or partial:
Notation choices:
Compile status:
Open issues:
```

Keep the handoff factual and brief.

## Integration Rules

The integrator should enforce:

- Shared preamble.
- Shared notation macros.
- Consistent section naming.
- No duplicate derivations across PDFs.
- Clean compile of `knowledge/main.tex`.
- A final document that remains dense enough to be exam-useful.

If there is a conflict between Tong's local notation and repository-wide notation, prefer repository-wide notation and add a one-line translation only when needed.

## Working Definition Of Done

A PDF is "done" when its assigned section file gives an expert reader the core mathematical content of the notes without needing Tong's explanatory prose. The output should not be a summary essay. It should be a compact operational map of the subject: definitions, equations, regimes, and consequences.

