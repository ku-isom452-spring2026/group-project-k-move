/*
  mybookings.js
  Handles the My Bookings page:
  - "Cancel Booking" button asks for confirmation before removing
  - Removes the card from the DOM with animation
  - Shows an empty-state message if all bookings are cancelled
*/

document.addEventListener('DOMContentLoaded', function () {

  const dashboard = document.querySelector('.dashboard');

  // Using Event Delegation: one click listener on the parent
  dashboard.addEventListener('click', function (e) {

    const target = e.target;

    // Only react to clicks on Cancel Booking links
    if (target.tagName === 'A' && target.textContent.trim() === 'Cancel Booking') {

      e.preventDefault(); // stop the link from navigating

      // Ask the user to confirm before cancelling
      const confirmed = confirm('Are you sure you want to cancel this booking?');

      if (confirmed) {
        // Find the parent card and fade it out
        const card = target.closest('.booking-card');

        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';

        setTimeout(function () {
          card.remove();
          checkIfEmpty();
        }, 400);
      }
    }
  });

  // ── Show a message if no bookings remain ───────────────────────
  function checkIfEmpty() {
    const remaining = dashboard.querySelectorAll('.booking-card');

    // The last card says "No More Bookings" — count only real booking cards
    const realBookings = Array.from(remaining).filter(function (card) {
      return card.querySelector('a.btn') &&
             card.querySelector('a.btn').textContent.trim() === 'Cancel Booking';
    });

    if (realBookings.length === 0) {
      // Update the "No More Bookings" card text to be more informative
      const lastCard = dashboard.querySelector('.booking-card');
      if (lastCard) {
        lastCard.querySelector('h2').textContent = 'No Active Bookings';
        lastCard.querySelector('p').textContent =
          'All your bookings have been cancelled.';
      }
    }
  }

});
