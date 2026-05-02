/*  profile.js
    Reads the user info saved by login.js from localStorage
    and shows it on the profile page.
*/
document.addEventListener('DOMContentLoaded', function () {

  var user = JSON.parse(localStorage.getItem('kuUser') || 'null');

  if (user) {
    var n = document.getElementById('prof-name');
    var i = document.getElementById('prof-id');
    var e = document.getElementById('prof-email');
    if (n) n.textContent = user.name  || '—';
    if (i) i.textContent = user.id    || '—';
    if (e) e.textContent = user.email || '—';
  }

});
