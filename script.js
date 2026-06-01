/* ==========================================
   FUTURISTIC PORTFOLIO — INTERACTIONS
   Smooth, purposeful, polished
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initMobileMenu();
    initScrollReveal();
    initParallaxGlow();
    initHoverTilt();
    initCertFilter();
});

/* ---- Nav: hide/show on scroll direction ---- */
function initNavScroll() {
    const nav = document.getElementById('nav');
    let lastY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const y = window.scrollY;
                if (y > 300 && y > lastY) {
                    nav.style.top = '-80px';       // hide on scroll down
                } else {
                    nav.style.top = '16px';        // show on scroll up
                }
                lastY = y;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ---- Mobile menu ---- */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    toggle.addEventListener('click', () => {
        links.classList.toggle('active');
    });

    links.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => links.classList.remove('active'));
    });
}

/* ---- Scroll reveal with stagger ---- */
function initScrollReveal() {
    const selectors = [
        '.hero-badge', '.hero-title', '.hero-desc', '.hero-actions',
        '.metric-card',
        '.float-card', '.about-text h2', '.about-text p',
        '.skill-group', '.platforms-strip',
        '.tl-item', '.edu-card',
        '.pcard',
        '.highlight-card', '.cert-chip',
        '.contact-heading', '.contact-desc'
    ];

    const elements = document.querySelectorAll(selectors.join(','));
    elements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        // Group by parent section for stagger
        const groups = new Map();

        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const parent = entry.target.closest('.section, .hero');
            const key = parent ? parent.id || 'root' : 'root';
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(entry.target);
        });

        groups.forEach(targets => {
            targets.forEach((el, i) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, i * 80);
            });
        });

        entries.forEach(entry => {
            if (entry.isIntersecting) observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ---- Parallax glow orbs ---- */
function initParallaxGlow() {
    const glow1 = document.querySelector('.glow-1');
    const glow2 = document.querySelector('.glow-2');
    if (!glow1 || !glow2) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const y = window.scrollY;
                glow1.style.transform = `translate(${Math.sin(y * 0.002) * 30}px, ${y * 0.03}px)`;
                glow2.style.transform = `translate(${Math.cos(y * 0.002) * 20}px, ${y * -0.02}px)`;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ---- Subtle tilt on floating cards ---- */
function initHoverTilt() {
    if (!window.matchMedia('(hover: hover)').matches) return;

    const cards = document.querySelectorAll('.float-card, .pcard, .metric-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `
                translateY(-6px)
                perspective(600px)
                rotateX(${y * -4}deg)
                rotateY(${x * 4}deg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ---- Certification category filter ---- */
function initCertFilter() {
    const tabs = document.querySelectorAll('.cert-tab');
    const chips = document.querySelectorAll('.cert-chip[data-cat]');
    if (!tabs.length || !chips.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;

            chips.forEach((chip, i) => {
                if (filter === 'all' || chip.dataset.cat === filter) {
                    chip.classList.remove('hidden');
                    // Stagger animation
                    chip.style.opacity = '0';
                    chip.style.transform = 'translateY(8px)';
                    setTimeout(() => {
                        chip.style.opacity = '1';
                        chip.style.transform = 'translateY(0)';
                    }, i * 20);
                } else {
                    chip.classList.add('hidden');
                }
            });
        });
    });
}
