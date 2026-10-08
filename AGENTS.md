# Prototype Instructions

## Project decisions

- The user selected the first visual direction: deep purple, lime headline highlights, warm housing collage, cream section with three open columns. Preserve this direction when iterating.
- Keep the campaign framework: housing with mobility/infrastructure; positive safety; digital administration and transparency. Broader Volt policies are secondary, not replacement homepage pillars.
- Use the Vienna housing reference within the first theme. Maintain the discover → act → stay informed → participate → welcome → collaborate journey.
- Spanish is the default language; all main pages must also work in English.
- This is a public redesign preview hosted on the user’s GitHub Pages. Never commit private source documents or internal Drive links. Keep draft policy content visibly identified.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
