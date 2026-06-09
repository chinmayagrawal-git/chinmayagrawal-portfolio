# Chinmay Agrawal — Portfolio Repo

IIT Ropar BTech (Civil, 2024). PGP in Startup Leadership, Mesa School of Business (2026, merit scholarship, top 2 of 142). Currently targeting Founder's Office, BizOps, and AI Generalist roles at Series A–C startups.

This isn't a career pivot from engineering — Civil was a degree, not a direction. The interesting problems were always in how businesses run. The last two years have been spent closing that gap: scaling a category P&L, building AI workflows that actually shipped, and learning to own problems end to end.

Live portfolio: [chinmayagrawal-portfolio.netlify.app](https://chinmayagrawal-portfolio.netlify.app)

---

## What's In This Repo

- `portfolio/` — the Next.js 14 portfolio site (deployed to Netlify via this repo's `main` branch)
- `Claude_Code_Setup.md` — the configured AI development environment I work in
- Job hunting pipeline infrastructure — coming soon (see below)

---

## The Work

At Wishlink, the mandate was to rebuild customer support using AI. No playbook. I shipped three systems: a QC pipeline that scores support conversations against a 100-point rubric and sends Slack DMs directly to agents, a creator support chatbot rebuilt from near-zero to 49% self-resolution in its first week, and a creator analytics product — static JSON served per-creator, built and shipped in 8 working days — currently running as a live A/B experiment across 4K+ creators.

Before that: scaled a product category from ₹1Cr to ₹2.5Cr monthly GMV at a Series A EdTech startup, led a team of 15, owned the P&L.

Full context on each project is on the portfolio.

---

## Claude Code Setup

This isn't just "I use Claude." It's a configured, production-grade AI development environment.

### Always-On

| What | Where | Effect |
|---|---|---|
| Karpathy Guidelines | `~/.claude/CLAUDE.md` | Think before coding, simplicity first, surgical changes, goal-driven execution — shapes every response |
| Ruflo hooks | `.claude/settings.json` (project-level) | Pre/post edit hooks, session save/restore, auto-memory sync |
| xysq | Plugin + MCP | Persistent memory vault across sessions |

### MCP Servers

| Server | Scope | Tools |
|---|---|---|
| xysq | Global | `memory_retain`, `memory_recall`, `memory_reflect`, `memory_list`, `organise_*`, `skill_sync` |
| claude-flow (Ruflo) | Project-only | 200+ tools — swarm, agents, memory, neural, GitHub, workflows |

### Skills Library

Invocable on demand via `/skill-name`. A sample:

**Planning & shipping** — `plan-eng-review`, `plan-ceo-review`, `autoplan`, `spec`, `ship`, `canary`, `retro`

**QA & browser** — `qa`, `qa-only`, `browse`, `scrape`, `webapp-testing`, `investigate`

**UI & design** — `ui-ux-pro-max` (67 styles, 161 palettes, 57 font pairings), `frontend-design`, `design-system`, `brand`, `slides`

**Writing** — `stop-slop` (strips AI writing patterns), `doc-coauthoring`, `internal-comms`

**Dev tooling** — `graphify`, `mcp-builder`, `health`, `code-review`, `security-review`, `context-save`

~150 additional Ruflo skills (`sparc:*`, `swarm:*`, `hive-mind:*`, `agents:*`, `hooks:*`, `memory:*`) are hidden from Claude's context but callable directly — keeping token overhead low without losing capability.

### Agents

184 conversational agents installed via agency-agents into `~/.claude/agents/`. Covers engineering, design, marketing, sales, product, QA, finance, legal, game dev, spatial computing, and more. Referenced by role in conversation.

### Token Optimizations

- `UserPromptSubmit` routing hook removed (was firing on every message)
- `claude-flow` MCP cleared from global scope (project-only when needed)
- ~150 Ruflo skills hidden from Claude context via `skillOverrides`

Full breakdown in [`Claude_Code_Setup.md`](./Claude_Code_Setup.md).

---

## What's Coming

**Hermes + Conductor** — an orchestration-based job hunting pipeline currently in build. Multi-agent, automated, opinionated. More when it ships.

This repo will continue to evolve as the setup does.

---

## Contact

[chinmay_agrawal@pg26.mesaschool.co](mailto:chinmay_agrawal@pg26.mesaschool.co) · [LinkedIn](https://www.linkedin.com/in/chinmay-agrawal-ca02/) · [Portfolio](https://chinmayagrawal-portfolio.netlify.app)
