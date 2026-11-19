# DecorKaro

Marketing site and AI room visualiser for DecorKaro, an interior design studio in Thane.

Vite + React 18 + TypeScript + Tailwind, deployed on Vercel. Server code lives in `api/` as Vercel Functions.

## AI visualiser

Visitors upload a floor plan or room photo and get a generated design back. Image generation happens server-side; no API key ever reaches the browser.

```
browser ──POST /api/room-planner──▶ Vercel Function ──MCP edit_image──▶ froots bit-graphics ──▶ OpenAI / Gemini
```

- `api/room-planner.ts` validates the request (origin allowlist, 30 requests per IP per hour, size limits), builds the prompt server-side, and returns the image as raw bytes. Detected rooms, provider and model come back in the `x-planner-rooms`, `x-planner-provider` and `x-planner-model` headers.
- `api/_lib/froots.ts` calls the `edit_image` tool on the froots `bit-graphics` MCP server. If the chosen provider fails, it retries once with the fallback provider froots suggests.
- `api/_lib/settings.ts` defines the model catalogue. The default is OpenAI `gpt-image-2.5-sunburst-2026-09-08`; Gemini models are also available.

### Choosing the model

Open `/admin`, sign in with the admin password, then pick a provider and model. The choice is saved to a private Vercel Blob (`settings/room-planner.json`) and takes effect on the next request.

### Environment variables (Vercel)

| Name | Purpose |
| --- | --- |
| `FROOTS_TOKEN` | Bearer token for froots (from Infisical `bitroot-infra`, `FROOTS_TOKENS`) |
| `FROOTS_URL` | Optional; defaults to `https://froots.bitroot.club` |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `BLOB_READ_WRITE_TOKEN` | Set automatically by the connected `decorkaro-settings` Blob store |
| `VITE_FORMSPREE_ID` | Contact form endpoint |

## Development

```bash
npm install
vercel env pull .env.local   # once, to get the server variables
vercel dev --listen 3000     # site and /api functions together
```

`npm run dev` runs only the Vite front end; the visualiser and admin need `vercel dev`.

Checks:

```bash
npx tsc --noEmit                  # app
npx tsc -p tsconfig.api.json      # api functions
npm run build
```

## Design system

Defined in `tailwind.config.js` and `src/index.css`.

- **Colour**: marquina `#1B1E1C` (stone black), limestone `#EEEDE9`, brass `#A07A3F`, walnut `#5A4434`, slate `#6A6F6B`.
- **Type**: Archivo variable. Headings use the wide cut (`.display`, `wdth 125`); body text uses the normal width.
- **Shape**: 2–4px corners, hairline rules, left-aligned layouts, one load animation in the hero.
- **Content**: site copy, packages, projects and contact details live in `src/data/site.ts`.

Project photos are served as `.webp` from `public/images`; the original PNGs are kept alongside.
