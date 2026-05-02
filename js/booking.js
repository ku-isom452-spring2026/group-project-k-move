/*
  booking.js
  Handles the booking form:
  - Required field validation (route, time, seat number)
  - Seat number must be a number between 1 and 50
  - Shows inline error messages
  - Displays a success confirmation card when booking is valid
*/

document.addEventListener('DOMContentLoaded', function () {

  const form        = document.querySelector('form');
  const routeSelect = document.getElementById('route');
  const timeInput   = document.getElementById('time');
  const seatInput   = document.getElementById('seat');

  // ── Helper: show an error below a field ───────────────────────
  function showError(input, message) {
    const errorSpan = document.getElementById(input.id + '-error');
    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.style.display = 'block';
    }
    input.classList.add('input-error');
  }

  // ── Helper: clear error for a field ───────────────────────────
  function clearError(input) {
    const errorSpan = document.getElementById(input.id + '-error');
    if (errorSpan) {
      errorSpan.textContent = '';
      errorSpan.style.display = 'none';
    }
    input.classList.remove('input-error');
  }

  // ── Clear errors as the user changes each field ────────────────
  routeSelect.addEventListener('change', function () { clearError(routeSelect); });
  timeInput.addEventListener('change',   function () { clearError(timeInput);   });
  seatInput.addEventListener('input',    function () { clearError(seatInput);   });

  // ── Form submit ────────────────────────────────────────────────
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // Validate: a time must be selected
    if (timeInput.value === '') {
      showError(timeInput, 'Please select a departure time.');
      isValid = false;
    } else {
      clearError(timeInput);
    }

    // Validate: seat number must be filled in and be 1–50
    const seatValue = parseInt(seatInput.value);

    if (seatInput.value.trim() === '') {
      showError(seatInput, 'Seat number is required.');
      isValid = false;
    } else if (isNaN(seatValue) || seatValue < 1 || seatValue > 50) {
      showError(seatInput, 'Seat number must be between 1 and 50.');
      isValid = false;
    } else {
      clearError(seatInput);
    }

    // If valid → show a booking confirmation card
    if (isValid) {
      showConfirmation();
    }
  });

  // ── Show a confirmation card below the form ────────────────────
  function showConfirmation() {
    // Remove any old confirmation card
    const old = document.getElementById('booking-confirm');
    if (old) old.remove();

    const card = document.createElement('div');
    card.id = 'booking-confirm';
    card.className = 'booking-card feedback-success-card';

    // Build the card content using the values from the form
    card.innerHTML =
      '<h2>&#10003; Booking Confirmed!</h2>' +
      '<p><strong>Route:</strong> ' + routeSelect.value + '</p>' +
      '<p><strong>Time:</strong> ' + timeInput.value + '</p>' +
      '<p><strong>Seat:</strong> ' + seatInput.value + '</p>' +
      '<p class="confirm-note">Your booking has been saved. ' +
      '<a href="mybookings.html">View My Bookings</a></p>';

    // Insert the card after the form wrapper
    const wrapper = document.querySelector('.form-wrapper');
    wrapper.parentNode.insertBefore(card, wrapper.nextSibling);

    // Scroll down so the user can see the confirmation
    card.scrollIntoView({ behavior: 'smooth' });

    // Disable the submit button so user can't double-submit
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Booking Confirmed ✓';
  }

});
