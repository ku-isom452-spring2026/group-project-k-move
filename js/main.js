/*  main.js — runs on every page  */

document.addEventListener('DOMContentLoaded', function () {

  /* ── 1. HAMBURGER MENU ─────────────────────────── */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  /* ── 2. DROPDOWN SUBMENUS ──────────────────────── */
  // Any <li class="has-sub"> with a <ul class="submenu"> gets toggle on click
  var dropdowns = document.querySelectorAll('.has-sub');
  for (var i = 0; i < dropdowns.length; i++) {
    (function(li) {
      var link = li.querySelector('a');
      link.addEventListener('click', function (e) {
        e.preventDefault();                    // don't follow the href
        li.classList.toggle('open');           // show/hide the submenu
      });
    })(dropdowns[i]);
  }

  /* ── 3. HIGHLIGHT ACTIVE PAGE IN NAV ──────────── */
  var page = window.location.pathname.split('/').pop();
  var allLinks = document.querySelectorAll('nav ul li a');
  for (var j = 0; j < allLinks.length; j++) {
    if (allLinks[j].getAttribute('href') === page) {
      allLinks[j].classList.add('active');
    }
  }

  /* ── 4. SHOW "Hello {name}" IN HEADER ─────────── */
  var user = JSON.parse(localStorage.getItem('kuUser') || 'null');
  var greet = document.getElementById('greeting');
  if (greet && user && user.name) {
    greet.textContent = 'Hello, ' + user.name;
  }

});
