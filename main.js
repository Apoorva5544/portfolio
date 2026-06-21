const track = document.getElementById('horizontal-track');
const navItems = document.querySelectorAll('.nav-item');
const panes = document.querySelectorAll('.pane');

// Sync navigation active state with scroll position using Intersection Observer feel
function updateActiveNav() {
    let current = "";
    panes.forEach((pane) => {
        const paneLeft = pane.offsetLeft;
        if (track.scrollLeft >= paneLeft - track.offsetWidth / 2) {
            current = pane.getAttribute("id");
        }
    });

    navItems.forEach((item) => {
        item.classList.remove("active");
        if (item.getAttribute("href").includes(current)) {
            item.classList.add("active");
        }
    });
}

track.addEventListener('scroll', updateActiveNav);

// Click to scroll to pane
navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href').substring(1);
        const targetPane = document.getElementById(targetId);
        track.scrollTo({
            left: targetPane.offsetLeft,
            behavior: 'smooth'
        });
    });
});

// Precise wheel to horizontal scroll
track.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
    }
}, { passive: false });

// Keyboard arrow support
window.addEventListener('keydown', (e) => {
    const paneWidth = track.firstElementChild.offsetWidth;
    if (e.key === 'ArrowRight') {
        track.scrollBy({ left: paneWidth, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
        track.scrollBy({ left: -paneWidth, behavior: 'smooth' });
    }
});

console.log('Premium Hand-crafted Portfolio Initialized');
