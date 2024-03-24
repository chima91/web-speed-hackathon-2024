import { createMiddleware } from 'hono/factory';

export const cacheControlMiddleware = createMiddleware(async (c, next) => {
  await next();
  c.res.headers.set('Cache-Control', 'private, no-store');
});
