import { useEffect, useState } from 'react';

// Responses are cached for the session so switching tabs doesn't refetch.
const cache = new Map();

export function useApi(path) {
  const [state, setState] = useState(() =>
    cache.has(path) ? { data: cache.get(path), error: null } : { data: null, error: null }
  );

  useEffect(() => {
    if (cache.has(path)) return;
    let cancelled = false;
    fetch(`/api${path}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server responded ${res.status}`);
        return res.json();
      })
      .then((data) => {
        cache.set(path, data);
        if (!cancelled) setState({ data, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ data: null, error });
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return state;
}

export function money(cents) {
  const dollars = cents / 100;
  return `$${dollars.toLocaleString('en-US', { maximumFractionDigits: dollars % 1 ? 2 : 0 })}`;
}

export function telHref(phone) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
