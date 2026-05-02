/*
  favorites.js
  Handles the Favorites page:
  - Remove a favorite route (removes card from DOM)
  - "Track" button navigates to tracking page for that route
  - "Book" button navigates to booking page
  - Shows an empty-state message when all favorites are removed
  - Allows adding a new favorite via a form
*/

document.addEventListener('DOMContentLoaded', function () {

  const favoritesList = document.getElementById('favorites-list');

  // ── Handle button clicks inside the favorites list ─────────────
  // Using Event Delegation (Chapter 9): one listener on the parent
  // instead of adding a listener to every single button.
  favoritesList.addEventListener('click', function (e) {

    // Find which button was clicked
    const target = e.target;

    if (target.tagName !== 'BUTTON') return; // ignore clicks on non-buttons

    // Get the parent .favorite-item card
    const card = target.closest('.favorite-item');
    const routeName = card.querySelector('h3').textContent;

    if (target.classList.contains('remove')) {
      // ── REMOVE: fade out and remove the card from the DOM ──────
      card.style.transition = 'opacity 0.4s ease';
      card.style.opacity = '0';

      setTimeout(function () {
        card.remove();
        checkIfEmpty(); // show message if no favorites left
      }, 400);

    } else if (target.textContent === 'Track') {
      // ── TRACK: go to tracking page ─────────────────────────────
      window.location.href = 'tracking.html';

    } else if (target.textContent === 'Book') {
      // ── BOOK: go to booking page ────────────────────────────────
      window.location.href = 'booking.html';
    }
  });

  // ── Check if the list is now empty and show a message ─────────
  function checkIfEmpty() {
    const remaining = favoritesList.querySelectorAll('.favorite-item');

    if (remaining.length === 0) {
      // Create and show an empty-state message
      const emptyMsg = document.createElement('p');
      emptyMsg.id = 'empty-msg';
      emptyMsg.textContent = 'You have no saved routes. Add one below!';
      emptyMsg.className = 'feedback-msg';
      favoritesList.appendChild(emptyMsg);
    }
  }

  // ── "Add Favorite" form ────────────────────────────────────────
  const addForm = document.getElementById('add-favorite-form');
  const addInput = document.getElementById('new-route-name');

  if (addForm && addInput) {
    addForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const newName = addInput.value.trim();

      // Validate: the field must not be empty
      if (newName === '') {
        showAddError('Please enter a route name.');
        return;
      }

      clearAddError();

      // Remove the empty-state message if it's showing
      const emptyMsg = document.getElementById('empty-msg');
      if (emptyMsg) emptyMsg.remove();

      // Build a new favorite card using DOM methods (not innerHTML)
      const newCard = document.createElement('div');
      newCard.className = 'favorite-item';

      const heading = document.createElement('h3');
      heading.textContent = newName;

      const btnRow = document.createElement('div');
      btnRow.className = 'btn-row';

      const trackBtn = document.createElement('button');
      trackBtn.textContent = 'Track';

      const bookBtn = document.createElement('button');
      bookBtn.textContent = 'Book';

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.className = 'remove';

      btnRow.appendChild(trackBtn);
      btnRow.appendChild(bookBtn);
      btnRow.appendChild(removeBtn);

      newCard.appendChild(heading);
      newCard.appendChild(btnRow);

      // Animate the new card appearing
      newCard.style.opacity = '0';
      favoritesList.appendChild(newCard);

      // Trigger fade-in
      setTimeout(function () {
        newCard.style.transition = 'opacity 0.4s ease';
        newCard.style.opacity = '1';
      }, 10);

      // Reset the input field
      addInput.value = '';
    });

    addInput.addEventListener('input', clearAddError);
  }

  // ── Error helpers for the add form ────────────────────────────
  function showAddError(message) {
    let errorSpan = document.getElementById('add-route-error');
    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.id = 'add-route-error';
      errorSpan.className = 'error-msg';
      addInput.parentNode.insertBefore(errorSpan, addInput.nextSibling);
    }
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
    addInput.classList.add('input-error');
  }

  function clearAddError() {
    const errorSpan = document.getElementById('add-route-error');
    if (errorSpan) {
      errorSpan.textContent = '';
      errorSpan.style.display = 'none';
    }
    if (addInput) addInput.classList.remove('input-error');
  }

});
