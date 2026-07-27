(function () {
  var s = localStorage.getItem('theme');
  if (s === 'dark' || (!s && window.matchMedia('(prefers-color-scheme: dark)').matches))
    document.body.classList.add('dark-mode');
})();

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function () {
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navLinks a').forEach(function (a) {
    if (a.getAttribute('href') === path) a.classList.add('active');
    a.addEventListener('click', function () {
      document.getElementById('navLinks').classList.remove('open');
    });
  });

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('fade-up'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.section, .card, .pub-item').forEach(function (el) { obs.observe(el); });
});
