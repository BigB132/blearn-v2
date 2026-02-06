self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icon.png', // You can add an icon for the notification
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const data = event.notification;
  
  // Determine the URL to open based on notification type/data
  let url = '/homework'; // Default fallback
  
  // Check if the notification has a custom URL
  if (data.data && data.data.url) {
    url = data.data.url;
  }
  
  // For older notifications that might store URL differently
  const notificationData = event.notification.data || {};
  if (notificationData.url) {
    url = notificationData.url;
  }

  event.waitUntil(
    clients.openWindow(url)
  );
});

