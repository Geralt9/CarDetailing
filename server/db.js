import Database from 'better-sqlite3';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DB_PATH || join(here, 'data.sqlite');

function runSqlFile(db, name) {
  db.exec(readFileSync(join(here, 'sql', name), 'utf8'));
}

export function openDb({ reset = false } = {}) {
  const isNew = !existsSync(dbPath);
  const db = new Database(dbPath);
  db.pragma('foreign_keys = ON');

  if (isNew || reset) {
    db.transaction(() => {
      runSqlFile(db, 'schema.sql');
      runSqlFile(db, 'seed.sql');
    })();
  }
  return db;
}

// `node db.js --reset` rebuilds the database from schema.sql + seed.sql
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const db = openDb({ reset: process.argv.includes('--reset') });
  console.log(`Database ready at ${dbPath}`);
  db.close();
}
