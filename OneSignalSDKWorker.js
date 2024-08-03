// Import OneSignal SDK
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Initialize OneSignal
OneSignal.init({
  appId: "YOUR_ONESIGNAL_APP_ID",
});

// Handle push events
self.addEventListener('push', function(event) {
  const data = event.data.json();
  
  const options = {
    body: data.contents.en,
    icon: 'path/to/icon.png',
    badge: 'path/to/badge.png',
    data: {
      url: data.url || 'https://flexs-app.glide.page/' // Add URL to data for use on notification click
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.headings ? data.headings.en : 'Notification', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  const url = event.notification.data.url || 'https://flexs-app.glide.page/'; // Fallback to default URL

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
