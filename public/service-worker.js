
// service-worker.js

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  // Skip waiting to activate the new service worker immediately.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  // Take control of all clients as soon as the service worker is activated.
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  console.log('Service Worker: Push Received.');
  console.log(`Service Worker: Push had this data: "${event.data.text()}"`);

  let data;
  try {
    data = event.data.json();
  } catch (e) {
    data = {
      title: 'New Notification',
      body: event.data.text(),
    };
  }
  
  const title = data.title || 'Push Notification';
  const options = {
    body: data.body || 'Something new happened!',
    icon: 'https://picsum.photos/192', // Generic icon
    badge: 'https://picsum.photos/96', // Generic badge
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// This is a custom event listener to allow the client page to trigger a notification for testing.
// In a real application, the 'push' event would be triggered by a push service from a server.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body } = event.data.payload;
    console.log('Service Worker: Received message to show notification.');
    self.registration.showNotification(title, {
      body: body,
      icon: 'https://picsum.photos/192',
      badge: 'https://picsum.photos/96',
      data: 'https://localhost:3000',
    });
  }
});


self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received:', event.notification.data);
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data || 'http://localhost:3000'));
});