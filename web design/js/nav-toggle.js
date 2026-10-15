document.addEventListener('DOMContentLoaded', function () {
  var nav = document.querySelector('.main-nav');
  var hamburger = document.querySelector('.hamburger');

  if (!nav || !hamburger) return;

  hamburger.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});
