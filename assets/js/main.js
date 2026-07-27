// Dark mode: respect system preference, persist choice
(function () {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
  }
})();

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Mobile nav toggle
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Close nav on link click (mobile)
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('#navLinks a').forEach(function (link) {
    link.addEventListener('click', function () {
      document.getElementById('navLinks').classList.remove('open');
    });
  });

  // Mark active nav link
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navLinks a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });

  // Fade-up on scroll
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-block, .info-card, .project-card, .pub-list li').forEach(function (el) {
    observer.observe(el);
  });
});
