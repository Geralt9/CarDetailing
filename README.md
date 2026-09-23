# Bluewater Auto Detailing — website proposal

React (Vite) front end, Express API, SQLite database.

## Run it

```bash
npm install     # installs client + server (npm workspaces)
npm run dev     # API on :3001, site on http://localhost:5173
```

The database file (`server/data.sqlite`) is created and seeded automatically on first run.
After editing `server/sql/seed.sql`, rebuild it with:

```bash
npm run db:reset
```

For production: `npm run build` then `npm start`. Express serves the built site and the API from port 3001.

## Adapting it for a client

All business content lives in `server/sql/seed.sql`: name, phone, services, packages and
prices, add-ons, locations, hours and mobile service towns. Things that are still hard-coded:

- `client/src/pages/Home.jsx`: hero headline and the four "how a full detail goes" steps
- `client/src/pages/About.jsx`: story text, owner quote and "How we work" list
- `client/src/components/Header.jsx` / `Logo.jsx`: the wordmark and logo
- `client/public/img/`: photos (from Unsplash). The home page before/after slider fakes the
  "before" with a grime filter. Pass `beforeSrc` to `<BeforeAfter>` once you have the client's
  real before/after photos.

## API

| Route | Returns |
| --- | --- |
| `GET /api/business` | Name, phone, email, founding year, region |
| `GET /api/services` | Services with included items |
| `GET /api/packages` | Packages with prices per vehicle size (`car`, `suv`, `truck`) and items |
| `GET /api/addons` | Add-on list |
| `GET /api/locations` | `{ locations: [...with hours], serviceAreas: [...] }` |
