# Volt España — redesign preview

Responsive, bilingual Spanish/English website preview built with React and Vite. This is an independent design proposal, not Volt España’s official website or an adopted electoral programme.

## Run and publish

```sh
npm ci
npm run dev -- --port 4173
npm run build:pages
```

GitHub Pages serves the generated `docs/` directory on `main`. Commit `docs/` after rebuilding. Relative asset URLs and hash routes work under the repository subpath, on reload and when sharing deep links. The default route is Spanish; switching language preserves the current page.

## Pages and content

Home, ideas, housing, positive safety, digital administration and transparency, participation, events, about Volt, and preview information. All pages are available in both languages. Copy and public destinations are maintained in `src/content.js`.

The campaign structure has three themes:

1. Housing, mobility and infrastructure — including the Vienna housing reference.
2. Positive safety — prevention, cared-for public space, emergency readiness and support.
3. Digital public administration and transparency — simpler services, human assistance and understandable public information.

The participation journey moves from discovering a proposal to taking action, staying informed, volunteering, joining and finding member support. Signatures, subscriptions, applications and donations link to the official services. This frontend has no forms, tracking, cookies or personal-data storage.

Campaign proposals under development are labelled as such. Public references:

- [Vivienda Made in Austria](https://voltespana.org/politicas/renacimiento-economico/vivienda-made-in-austria)
- [Digitalización Made in Estonia](https://voltespana.org/politicas/smart-state/digitalizacion-made-in-estonia)
- [European housing initiative supported by Volt España](https://voltespana.org/noticias/volt-impulsa-en-espana-una-campana-por-un-fondo-europeo-de-220000-millones-para-vivienda-publica-y-asequible)
- [Official event announcement](https://voltespana.org/eventos/asamblea-general-ordinaria-2026-11-madrid)

The November 2026 assembly automatically changes to “Past event” after its end date. Future events require editorial updates. No internal documents, transcripts, personal membership data or private Drive links are included.

## Visual assets

- `public/assets/volt-logo.svg`: existing logo from the official Volt España website; the Volt brand remains its owners’ property.
- `public/assets/housing-collage.png`: generated illustration for this preview; not a photograph documenting a specific Volt project.
- Self-hosted Anton, Inter and Barlow Condensed fonts via Fontsource; their font packages include licence information.
- Phosphor icons, MIT licence.

The selected design uses deep purple, lime highlights, lilac and warm ivory, oversized editorial typography and a photographic housing collage. Accessible links, keyboard focus, a mobile menu, reduced-motion support and native expandable FAQs are included. Search indexing is disabled for the preview.

The starter’s optional Sites build files remain intact, but this project is deployed using GitHub Pages. All 18 language/route combinations were browser-checked at 320px, with additional visual checks at 390px, 768px and 1190px. Navigation, language switching, FAQs, menu/Escape handling and official action destinations were checked. The local `design-qa.md` report and screenshot evidence are not committed.
