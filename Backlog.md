# Englang Backlog

Last updated: 2026-05-31

## Progress Snapshot

- Overall completion: **~75%**
- Completed: **Core language + tests + examples + docs website + CDN pipeline**
- Remaining: **Polish, packaging, versioning, and production hardening**

---

## Completed

### Language Core

- [x] Lexer implemented
- [x] Parser implemented
- [x] Runtime/interpreter implemented
- [x] Public runtime entry (`runEnglang`) implemented
- [x] Root re-export entry (`index.js`) added

### Language Features

- [x] `start`, `set`, `print`
- [x] expressions with precedence and parentheses
- [x] conditions: `if`, `else if`, `else`
- [x] loops: `while`, `for each`, `repeat`
- [x] `break`
- [x] functions
- [x] input via `ask` handler
- [x] V1/V2/V3 syntax support (current staged support)

### Quality

- [x] automated test suite (`tests/tests.js`)
- [x] multiple runnable example programs
- [x] docs thinking notes (`docs/01..12`)

### Website / Documentation

- [x] Docusaurus website scaffolded
- [x] Introduction, Tutorial, How To Use, CDN Usage, Thinking pages rewritten
- [x] docs routes fixed
- [x] top-bar and navbar UI improved
- [x] theme colors adjusted (deep blue light / whitish sky blue dark)

### Build / Tooling

- [x] CDN build script (`scripts/build-cdn.mjs`)
- [x] generated browser bundle (`cdn/englang.min.js`)
- [x] Husky pre-push hook for CDN build
- [x] git history rewritten with consistent timeline

---

## Remaining (High Priority)

### Packaging and Release

- [ ] publish release tags (v1.0.0+)
- [ ] define release checklist (tests, bundle, docs build)
- [ ] add changelog (`CHANGELOG.md`)
- [ ] add explicit semantic versioning policy

### Runtime API Hardening

- [ ] finalize and freeze runtime return contract
- [ ] standardize all runtime error messages
- [ ] add API usage examples for edge cases

### Website Production Readiness

- [ ] replace placeholder site URL in `website/docusaurus.config.js`
- [ ] configure final deploy target (GitHub Pages/Netlify/Vercel)
- [ ] add SEO metadata (social image, canonical URL)

### Test Expansion

- [ ] add negative tests for syntax errors
- [ ] add regression tests for nested control-flow cases
- [ ] add browser-side smoke tests for CDN bundle

---

## Remaining (Medium Priority)

### Documentation Improvements

- [ ] add FAQ page (common errors, fixes)
- [ ] add migration guide: V1 -> V2 -> V3
- [ ] add contribution guide (`CONTRIBUTING.md`)
- [ ] add architecture diagram (lexer -> parser -> runtime)

### Developer Experience

- [ ] add linting configuration
- [ ] add formatting configuration
- [ ] add CI workflow for tests + website build

### Examples

- [ ] add more practical examples (calculator menu, number games)
- [ ] add browser playground sample in `/examples-web`

---

## Remaining (Low Priority / Future)

- [ ] package distribution beyond direct repo usage
- [ ] optional CLI executable for `.eng` files
- [ ] optional REPL mode
- [ ] performance profiling for larger scripts

---

## Suggested Next Milestones

## Milestone 1: Release Hygiene

- [ ] Add `CHANGELOG.md`
- [ ] Add release checklist
- [ ] Tag first stable release

## Milestone 2: Reliability

- [ ] Expand failure-path tests
- [ ] Standardize runtime errors
- [ ] Add CI automation

## Milestone 3: Adoption

- [ ] Finalize website deployment metadata
- [ ] Add FAQ + migration docs
- [ ] Publish hosted CDN usage instructions with real URL

---

## Notes

- `Agent.md` and `Plan.md` are intentionally excluded from versioned project history.
- Backlog percentages are execution estimates and should be updated after each milestone.
