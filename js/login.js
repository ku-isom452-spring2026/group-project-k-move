/*  login.js — validates the register/login form and saves user to localStorage  */

document.addEventListener('DOMContentLoaded', function () {

  var form = document.getElementById('loginForm');
  if (!form) return;

  /* helpers */
  function show(id, msg) {
    var el = document.getElementById(id);
    if (el) { el.textContent = msg; el.style.display = 'block'; }
    var inp = document.getElementById(id.replace('-error',''));
    if (inp) inp.classList.add('input-error');
  }
  function clear(id) {
    var el = document.getElementById(id);
    if (el) { el.textContent = ''; el.style.display = 'none'; }
    var inp = document.getElementById(id.replace('-error',''));
    if (inp) inp.classList.remove('input-error');
  }

  /* clear on typing */
  var fields = ['fullName','uniID','email','password'];
  for (var i = 0; i < fields.length; i++) {
    (function(f){
      var inp = document.getElementById(f);
      if (inp) inp.addEventListener('input', function(){ clear(f+'-error'); });
    })(fields[i]);
  }

  /* submit */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name  = document.getElementById('fullName').value.trim();
    var id    = document.getElementById('uniID').value.trim();
    var email = document.getElementById('email').value.trim();
    var pass  = document.getElementById('password').value.trim();
    var ok    = true;

    /* Name — required */
    if (name === '') {
      show('fullName-error', 'Please enter your full name.'); ok = false;
    } else { clear('fullName-error'); }

    /* University ID — must start with KU then digits e.g. KU123456 */
    if (id === '') {
      show('uniID-error', 'Please enter your University ID.'); ok = false;
    } else if (!/^KU\d+$/i.test(id)) {
      show('uniID-error', 'ID must start with KU followed by numbers (e.g. KU123456).'); ok = false;
    } else { clear('uniID-error'); }

    /* Email — simple @ check */
    if (email === '') {
      show('email-error', 'Please enter your email.'); ok = false;
    } else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      show('email-error', 'Please enter a valid email address.'); ok = false;
    } else { clear('email-error'); }

    /* Password — at least 6 characters */
    if (pass === '') {
      show('password-error', 'Please enter a password.'); ok = false;
    } else if (pass.length < 6) {
      show('password-error', 'Password must be at least 6 characters.'); ok = false;
    } else { clear('password-error'); }

    if (!ok) return;

    /* Save user info so other pages can read it */
    localStorage.setItem('kuUser', JSON.stringify({ name: name, id: id, email: email }));

    /* Show success then redirect */
    var banner = document.getElementById('form-feedback');
    banner.textContent = 'Login successful! Redirecting…';
    banner.className = 'feedback-msg success';
    banner.style.display = 'block';

    setTimeout(function () { window.location.href = 'index.html'; }, 1500);
  });

});
