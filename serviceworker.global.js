'use strict';

self.addEventListener('install', (event) => {
  event.waitUntil(console.log('test'));
});
