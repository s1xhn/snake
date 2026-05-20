const routes = [];
let currentPage = null;

export function register(hash, handler) {
  routes.push({ hash, pattern: hashToPattern(hash), handler });
}

function hashToPattern(hash) {
  const parts = hash.split('/');
  return parts.map(p => p.startsWith(':') ? '([^/]+)' : p).join('\\/');
}

function match(hash) {
  for (const r of routes) {
    const re = new RegExp(`^${r.pattern}$`);
    const m = hash.match(re);
    if (m) return { handler: r.handler, params: m.slice(1) };
  }
  return null;
}

export function navigate(hash) {
  window.location.hash = hash;
}

export function start() {
  window.addEventListener('hashchange', handleRoute);
  if (!window.location.hash) window.location.hash = '#/dashboard';
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || '/dashboard';
  const result = match(hash);
  if (result) {
    if (currentPage && currentPage.destroy) currentPage.destroy();
    currentPage = result.handler(...result.params);
  } else {
    navigate('/dashboard');
  }
}
