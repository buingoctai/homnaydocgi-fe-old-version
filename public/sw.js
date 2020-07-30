function receivePushNotification(event) {
  console.log('[Service Worker] Push Received.');
  // const { title, body } = event.data.json();
  // const { tag, url, title, text } = event.data.json();
  const options = {
    data: 'url',
    body: 'text',
    vibrate: [200, 100, 200],
    tag: 'tag'
  };
  event.waitUntil(self.registration.showNotification('title', options));
}

function openPushNotification(event) {
  console.log(
    "[Service Worker] Notification click Received.",
    event.notification.data
  );

  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
}

self.addEventListener("push", receivePushNotification);
self.addEventListener("notificationclick", openPushNotification);
