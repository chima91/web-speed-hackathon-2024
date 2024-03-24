import { createMiddleware } from 'hono/factory';

export const cacheControlMiddleware = createMiddleware(async (c, next) => {
  await next();

  if (new URL(c.req.url).pathname.startsWith('/assets/')) {
    c.res.headers.set('Cache-Control', 'public, max-age=31536000');
    return;
  }
  c.res.headers.set('Cache-Control', 'private, no-store');
});
