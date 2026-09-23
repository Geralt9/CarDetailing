// Each API response, keyed by route name. Shared by the Express server and
// the static export used for GitHub Pages (export-static.js).

// Group child rows (items, prices, hours) under their parent id
function groupBy(rows, key) {
  const map = new Map();
  for (const row of rows) {
    if (!map.has(row[key])) map.set(row[key], []);
    map.get(row[key]).push(row);
  }
  return map;
}

export const queries = {
  business(db) {
    return db.prepare('SELECT name, phone, email, founded, region FROM business WHERE id = 1').get();
  },

  services(db) {
    const services = db.prepare('SELECT * FROM services ORDER BY sort_order').all();
    const items = groupBy(
      db.prepare('SELECT service_id, item FROM service_items ORDER BY sort_order').all(),
      'service_id'
    );
    return services.map((s) => ({
      ...s,
      items: (items.get(s.id) || []).map((i) => i.item),
    }));
  },

  packages(db) {
    const packages = db.prepare('SELECT * FROM packages ORDER BY sort_order').all();
    const prices = groupBy(db.prepare('SELECT * FROM package_prices').all(), 'package_id');
    const items = groupBy(
      db.prepare('SELECT package_id, item FROM package_items ORDER BY sort_order').all(),
      'package_id'
    );
    return packages.map((p) => ({
      ...p,
      featured: Boolean(p.featured),
      prices: Object.fromEntries((prices.get(p.id) || []).map((r) => [r.vehicle_size, r.price_cents])),
      items: (items.get(p.id) || []).map((i) => i.item),
    }));
  },

  addons(db) {
    return db.prepare('SELECT id, name, price_cents, note FROM addons ORDER BY sort_order').all();
  },

  locations(db) {
    const locations = db.prepare('SELECT * FROM locations ORDER BY sort_order').all();
    const hours = groupBy(
      db.prepare('SELECT location_id, days, hours FROM location_hours ORDER BY sort_order').all(),
      'location_id'
    );
    const areas = db.prepare('SELECT town, travel_fee_cents FROM service_areas ORDER BY sort_order').all();
    return {
      locations: locations.map((l) => ({
        ...l,
        hours: (hours.get(l.id) || []).map(({ days, hours: h }) => ({ days, hours: h })),
      })),
      serviceAreas: areas,
    };
  },
};
