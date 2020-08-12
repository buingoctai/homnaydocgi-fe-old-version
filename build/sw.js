function receivePushNotification(event) {
  console.log('[Service Worker] Push Received.');
  // const { title, body } = event.data.json();
  // const { title, text, tag, url } = event.data.json();
  var data = JSON.parse(event.data.text());

  const options = {
    data: data['url'],
    body: data['text'],
    vibrate: [200, 100, 200],
    tag: data['tag']
  };
  event.waitUntil(self.registration.showNotification(data['title'], options));
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
