// service-worker.js

let domain = '/'; // fallback domain, will be set from client

// Install
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(self.clients.claim());
});

// Push event (triggered by server)
// Push event (triggered by server)
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push Received.');
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
    icon: 'https://picsum.photos/192',
    badge: 'https://picsum.photos/96',
    data: domain, // used for click navigation
  };

  event.waitUntil(
    (async () => {
      // Show the system notification
      await self.registration.showNotification(title, options);

      // Notify all open clients so inbox state updates
      const clientsList = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      clientsList.forEach(client => {
        client.postMessage({
          type: 'NEW_INBOX_ITEM',
          payload: data
        });
      });
    })()
  );
});


// Custom message listener (triggered from client)
self.addEventListener('message', (event) => {
  if (!event.data) return;

  // Set domain dynamically
  if (event.data.type === 'SET_DOMAIN') {
    domain = event.data.payload;
    console.log('Service Worker: Domain set to', domain);
  }

  // Show notification manually for testing
  if (event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body } = event.data.payload;
    self.registration.showNotification(title, {
      body,
      icon: 'https://picsum.photos/192',
      badge: 'https://picsum.photos/96',
      data: domain,
    });
  }
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received:', event.notification.data);
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === event.notification.data && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data || '/');
      }
    })
  );
});
