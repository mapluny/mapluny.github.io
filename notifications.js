// Create notification container
const notificationContainer = document.createElement('div');
notificationContainer.id = 'notificationContainer';
notificationContainer.style.position = 'fixed';
notificationContainer.style.bottom = '20px';
notificationContainer.style.right = '20px';
document.body.appendChild(notificationContainer);

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerText = message;

  notification.addEventListener('click', () => {
    removeNotification(notification);
  });

  notificationContainer.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      removeNotification(notification);
    }, 500);
  }, 3000);
}

function removeNotification(notification) {
  notification.style.opacity = '0';
  setTimeout(() => {
    notificationContainer.removeChild(notification);
  }, 500);
}
