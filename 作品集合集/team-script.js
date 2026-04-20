// Team page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections
    document.querySelectorAll('.culture-card, .landmark-card, .cuisine-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.team-hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }

    // Interactive hover effects for cuisine items
    const cuisineItems = document.querySelectorAll('.cuisine-item');
    cuisineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(15px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add theme-specific color changes on scroll
    const themeColors = {
        'fuzhou-theme': '#2E8B57',
        'xiamen-theme': '#40E0D0',
        'quanzhou-theme': '#DAA520',
        'ningde-theme': '#8B4513',
        'longyan-theme': '#DC143C',
        'zhangzhou-theme': '#FF69B4',
        'sanming-theme': '#4169E1',
        'nanping-theme': '#32CD32'
    };

    const bodyClass = document.body.className;
    const themeColor = themeColors[bodyClass] || '#00d4ff';

    // Dynamic color adjustments based on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const opacity = Math.min(scrolled / 500, 0.3);

        document.documentElement.style.setProperty('--scroll-opacity', opacity);
    });

    // Create additional floating elements for each theme
    createThemeElements(bodyClass);
});

function createThemeElements(themeClass) {
    const container = document.querySelector('.hero-decoration');
    if (!container) return;

    const elements = container.querySelectorAll('.element');
    elements.forEach((element, index) => {
        // Add random floating animation
        const duration = 3 + Math.random() * 2;
        const delay = index * 0.5;

        element.style.animation = `element-float ${duration}s ease-in-out ${delay}s infinite`;

        // Add mouse interaction
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.opacity = '1';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '0.7';
        });
    });
}