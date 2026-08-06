// Premium Portfolio — scroll reveals, nav state, progress bar
const nav = document.getElementById('siteNav');
const progress = document.getElementById('progressBar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section[id]');
const reveals = document.querySelectorAll('.reveal');

// Stagger reveal delays for grids
document.querySelectorAll('.toolkit-card, .award-card, .mini-card, .featured-card').forEach((el, i) => {
    el.style.setProperty('--rd', `${(i % 3) * 0.08}s`);
});

// Intersection Observer for reveal-on-scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

reveals.forEach((el) => revealObserver.observe(el));

// Nav background + scroll progress + active link
function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 40);

    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${(y / height) * 100}%`;

    let current = 'home';
    sections.forEach((sec) => {
        if (y >= sec.offsetTop - window.innerHeight * 0.4) {
            current = sec.id;
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

console.log('Hello, I am Apoorva — premium portfolio initialized.');
