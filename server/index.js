import express from 'express';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDb } from './db.js';

const here = dirname(fileURLToPath(import.meta.url));
const db = openDb();
const app = express();
const PORT = process.env.PORT || 3001;

// Group child rows (items, prices, hours) under their parent id
function groupBy(rows, key) {
  const map = new Map();
  for (const row of rows) {
    if (!map.has(row[key])) map.set(row[key], []);
    map.get(row[key]).push(row);
  }
  return map;
}

app.get('/api/business', (req, res) => {
  res.json(db.prepare('SELECT name, phone, email, founded, region FROM business WHERE id = 1').get());
});

app.get('/api/services', (req, res) => {
  const services = db.prepare('SELECT * FROM services ORDER BY sort_order').all();
  const items = groupBy(
    db.prepare('SELECT service_id, item FROM service_items ORDER BY sort_order').all(),
    'service_id'
  );
  res.json(services.map((s) => ({
    ...s,
    items: (items.get(s.id) || []).map((i) => i.item),
  })));
});

app.get('/api/packages', (req, res) => {
  const packages = db.prepare('SELECT * FROM packages ORDER BY sort_order').all();
  const prices = groupBy(db.prepare('SELECT * FROM package_prices').all(), 'package_id');
  const items = groupBy(
    db.prepare('SELECT package_id, item FROM package_items ORDER BY sort_order').all(),
    'package_id'
  );
  res.json(packages.map((p) => ({
    ...p,
    featured: Boolean(p.featured),
    prices: Object.fromEntries((prices.get(p.id) || []).map((r) => [r.vehicle_size, r.price_cents])),
    items: (items.get(p.id) || []).map((i) => i.item),
  })));
});

app.get('/api/addons', (req, res) => {
  res.json(db.prepare('SELECT id, name, price_cents, note FROM addons ORDER BY sort_order').all());
});

app.get('/api/locations', (req, res) => {
  const locations = db.prepare('SELECT * FROM locations ORDER BY sort_order').all();
  const hours = groupBy(
    db.prepare('SELECT location_id, days, hours FROM location_hours ORDER BY sort_order').all(),
    'location_id'
  );
  const areas = db.prepare('SELECT town, travel_fee_cents FROM service_areas ORDER BY sort_order').all();
  res.json({
    locations: locations.map((l) => ({
      ...l,
      hours: (hours.get(l.id) || []).map(({ days, hours: h }) => ({ days, hours: h })),
    })),
    serviceAreas: areas,
  });
});

app.use('/api', (req, res) => res.status(404).json({ error: `No API route for ${req.path}` }));

// In production, serve the built React app
const clientDist = join(here, '..', 'client', 'dist');
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => res.sendFile(join(clientDist, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
