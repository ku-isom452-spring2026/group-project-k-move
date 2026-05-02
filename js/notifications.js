/*
  notifications.js
  Handles the Notifications page:
  - Clear all notifications button removes all items from the DOM
  - Each notification has its own dismiss button
  - Shows an empty-state message when all notifications are cleared
*/

document.addEventListener('DOMContentLoaded', function () {

  const clearBtn = document.getElementById('clear-btn');
  const notifList = document.getElementById('notifications-list');

  // ── Clear All button ───────────────────────────────────────────
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {

      const confirmed = confirm('Clear all notifications?');

      if (confirmed) {
        const items = notifList.querySelectorAll('.notification-item');

        // Fade out all items one by one
        items.forEach(function (item, index) {
          setTimeout(function () {
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = '0';
            setTimeout(function () {
              item.remove();
              if (index === items.length - 1) {
                showEmpty();
              }
            }, 300);
          }, index * 80); // stagger the fade-outs
        });

        clearBtn.disabled = true;
        clearBtn.textContent = 'All Cleared ✓';
      }
    });
  }

  // ── Individual dismiss buttons ─────────────────────────────────
  // Event Delegation: listen on the parent list
  if (notifList) {
    notifList.addEventListener('click', function (e) {
      if (e.target.classList.contains('dismiss-btn')) {
        const item = e.target.closest('.notification-item');
        item.style.transition = 'opacity 0.3s ease';
        item.style.opacity = '0';
        setTimeout(function () {
          item.remove();
          checkIfEmpty();
        }, 300);
      }
    });
  }

  // ── Check if list is now empty ─────────────────────────────────
  function checkIfEmpty() {
    const remaining = notifList.querySelectorAll('.notification-item');
    if (remaining.length === 0) {
      showEmpty();
    }
  }

  function showEmpty() {
    const existing = document.getElementById('notif-empty');
    if (!existing) {
      const msg = document.createElement('p');
      msg.id = 'notif-empty';
      msg.textContent = 'No notifications. You are all caught up!';
      msg.className = 'feedback-msg';
      notifList.appendChild(msg);
    }
  }

});
