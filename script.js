// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('nav ul');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll header effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Skill animation on scroll
const skillBars = document.querySelectorAll('.skill-level');
const skillSection = document.querySelector('.skills');

function showSkills() {
    // Check if skillSection exists to avoid errors on pages without it
    if (!skillSection) return;

    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;

    if (sectionPos < screenPos) {
        skillBars.forEach(skill => {
            // Ensure dataset.width is defined before using it
            if (skill.dataset.width) {
                skill.style.width = skill.dataset.width;
            }
        });
    }
}

// Initial check for skills
window.addEventListener('load', () => {
    setTimeout(() => {
        showSkills();
    }, 500);
});

window.addEventListener('scroll', showSkills);

// Portfolio filter
const filterBtns = document.querySelectorAll('.portfolio-filter button');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(filterBtn => {
            filterBtn.classList.remove('active');
        });

        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'flex'; // Use flex to maintain vertical stacking
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed header height
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button functionality
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

// Typing effect in hero section
const heroTitle = document.querySelector('.hero h1');
// Ensure heroTitle exists before proceeding
if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    const typingSpeed = 100;

    function typeText(text, element, i = 0) {
        if (i === 0) {
            element.innerHTML = '';
        }

        if (i < text.length) {
            if (text.substring(i, i + 6) === '<span ') { // Check for '<span '
                // If we're starting a span tag, add it all at once
                const endIndex = text.indexOf('>', i) + 1;
                element.innerHTML += text.substring(i, endIndex);
                i = endIndex;
            } else if (text.substring(i, i + 7) === '</span>') { // Check for '</span>'
                // If we're ending a span tag, add it all at once
                element.innerHTML += '</span>';
                i += 7;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }

            setTimeout(() => typeText(text, element, i), typingSpeed);
        }
    }

    // Start typing effect when page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            typeText(originalText, heroTitle);
        }, 500);
    });
}


// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.25
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });

    // Portfolio item expansion functionality
    const toggleButtons = document.querySelectorAll('.toggle-details-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const portfolioItem = button.closest('.portfolio-item');
            if (portfolioItem) {
                portfolioItem.classList.toggle('expanded');
                if (portfolioItem.classList.contains('expanded')) {
                    button.textContent = 'Ver menos';
                } else {
                    button.textContent = 'Ver más';
                }
            }
        });
    });
});
