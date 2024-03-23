export async function registerServiceWorker() {
  const registration = await navigator.serviceWorker.register('/serviceworker.global.js', { updateViaCache: 'none' });

  // Wait until the service worker becomes active
  await new Promise<void>((resolve, reject) => {
    if (registration.active && registration.active.state === 'activated') {
      resolve();
      return;
    }
    const serviceWorker = registration.installing || registration.waiting || registration.active;
    if (!serviceWorker) {
      reject(new Error('Service Worker registration failed'));
      return;
    }
    const onStateChange = () => {
      if (serviceWorker.state === 'activated') {
        resolve();
      }
    };
    serviceWorker.addEventListener('statechange', onStateChange);
  });
}
