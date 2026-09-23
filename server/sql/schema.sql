-- Bluewater Auto Detailing schema (SQLite)

DROP TABLE IF EXISTS location_hours;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS service_areas;
DROP TABLE IF EXISTS addons;
DROP TABLE IF EXISTS package_items;
DROP TABLE IF EXISTS package_prices;
DROP TABLE IF EXISTS packages;
DROP TABLE IF EXISTS service_items;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS business;

CREATE TABLE business (
  id          INTEGER PRIMARY KEY CHECK (id = 1),
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT NOT NULL,
  founded     INTEGER NOT NULL,
  region      TEXT NOT NULL
);

CREATE TABLE services (
  id               INTEGER PRIMARY KEY,
  slug             TEXT NOT NULL UNIQUE,
  name             TEXT NOT NULL,
  summary          TEXT NOT NULL,
  details          TEXT NOT NULL,
  duration_label   TEXT NOT NULL,
  from_price_cents INTEGER NOT NULL,
  sort_order       INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE service_items (
  id          INTEGER PRIMARY KEY,
  service_id  INTEGER NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  item        TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE packages (
  id          INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  blurb       TEXT NOT NULL,
  hours_label TEXT NOT NULL,
  featured    INTEGER NOT NULL DEFAULT 0,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE package_prices (
  package_id   INTEGER NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  vehicle_size TEXT NOT NULL CHECK (vehicle_size IN ('car', 'suv', 'truck')),
  price_cents  INTEGER NOT NULL,
  PRIMARY KEY (package_id, vehicle_size)
);

CREATE TABLE package_items (
  id          INTEGER PRIMARY KEY,
  package_id  INTEGER NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  item        TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE addons (
  id          INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  note        TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE locations (
  id          INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  street      TEXT NOT NULL,
  city        TEXT NOT NULL,
  state       TEXT NOT NULL,
  zip         TEXT NOT NULL,
  phone       TEXT NOT NULL,
  notes       TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE location_hours (
  id          INTEGER PRIMARY KEY,
  location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  days        TEXT NOT NULL,
  hours       TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE service_areas (
  id          INTEGER PRIMARY KEY,
  town        TEXT NOT NULL,
  travel_fee_cents INTEGER NOT NULL DEFAULT 0,
  sort_order  INTEGER NOT NULL DEFAULT 0
);
