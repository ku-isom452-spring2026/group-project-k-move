/*
  tracking.js
  Handles the Track Your Bus page:
  - Validates that a route is selected before tracking
  - Dynamically updates the route progress stops based on chosen route
  - Updates the bus info section with route-specific details
  - Shows/hides the bus info card dynamically
*/

document.addEventListener('DOMContentLoaded', function () {

  const trackBtn   = document.getElementById('track-btn');
  const routeSelect = document.getElementById('route');
  const busInfoSection = document.getElementById('bus-info');

  // Route data: each route has its own set of stops and a current active stop index
  const routeData = {
    'Campus → Library': {
      stops: ['Campus', 'Parking', 'Bus Stop A', 'Library'],
      activeIndex: 2   // Bus Stop A is currently active (0-based)
    },
    'Dorms → Engineering': {
      stops: ['Dorms', 'Gate 1', 'Main Road', 'Engineering'],
      activeIndex: 1   // Gate 1 is active
    },
    'Science → Main Gate': {
      stops: ['Science', 'Cafeteria', 'Admin', 'Main Gate'],
      activeIndex: 3   // Arrived at Main Gate
    }
  };

  // ── Track button click ─────────────────────────────────────────
  trackBtn.addEventListener('click', function () {

    const selectedRoute = routeSelect.value;

    // Validate: make sure a real route is selected
    if (!selectedRoute || selectedRoute === '') {
      showRouteError('Please choose a route before tracking.');
      return;
    }

    clearRouteError();

    // Get the data for the selected route
    const data = routeData[selectedRoute];

    if (data) {
      updateRouteProgress(data.stops, data.activeIndex);
      updateBusInfo(selectedRoute, data);
    }

    // Show the bus info section (it starts hidden)
    if (busInfoSection) {
      busInfoSection.style.display = 'block';
      busInfoSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // ── Update the route progress dots and lines ───────────────────
  // This rebuilds the .route-container with the correct stops,
  // marking completed, active, and upcoming stops.
  function updateRouteProgress(stops, activeIndex) {
    const container = document.querySelector('.route-container');
    if (!container) return;

    // Clear existing stops
    container.innerHTML = '';

    for (let i = 0; i < stops.length; i++) {
      // Create a stop dot
      const stopDiv = document.createElement('div');
      stopDiv.className = 'stop';

      if (i < activeIndex) {
        stopDiv.classList.add('completed');   // already passed
      } else if (i === activeIndex) {
        stopDiv.classList.add('active');      // bus is here now
      }
      // else: upcoming stop (no extra class)

      const label = document.createElement('span');
      label.textContent = stops[i];
      stopDiv.appendChild(label);
      container.appendChild(stopDiv);

      // Add a connecting line between stops (not after the last one)
      if (i < stops.length - 1) {
        const line = document.createElement('div');
        line.className = 'line';

        if (i < activeIndex - 1) {
          line.classList.add('completed');
        } else if (i === activeIndex - 1) {
          line.classList.add('active');
        }

        container.appendChild(line);
      }
    }
  }

  // ── Update the bus info card with route details ────────────────
  function updateBusInfo(routeName, data) {
    if (!busInfoSection) return;

    const currentStop = data.stops[data.activeIndex];
    const nextIndex   = data.activeIndex + 1;
    const nextStop    = nextIndex < data.stops.length
      ? data.stops[nextIndex]
      : 'End of route';

    busInfoSection.innerHTML =
      '<h2>Bus Info: ' + routeName + '</h2>' +
      '<p><strong>Current Stop:</strong> ' + currentStop + '</p>' +
      '<p><strong>Next Stop:</strong> ' + nextStop + '</p>' +
      '<p><strong>Status:</strong> On time</p>' +
      '<p><strong>Estimated Arrival:</strong> ~3 minutes</p>';
  }

  // ── Error message for route selection ─────────────────────────
  function showRouteError(message) {
    let errorSpan = document.getElementById('route-error');
    if (!errorSpan) {
      errorSpan = document.createElement('span');
      errorSpan.id = 'route-error';
      errorSpan.className = 'error-msg';
      routeSelect.parentNode.insertBefore(errorSpan, routeSelect.nextSibling);
    }
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
    routeSelect.classList.add('input-error');
  }

  function clearRouteError() {
    const errorSpan = document.getElementById('route-error');
    if (errorSpan) {
      errorSpan.textContent = '';
      errorSpan.style.display = 'none';
    }
    routeSelect.classList.remove('input-error');
  }

  // Clear error when user changes route selection
  routeSelect.addEventListener('change', clearRouteError);

});
