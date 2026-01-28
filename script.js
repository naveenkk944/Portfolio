console.log('=== Script Starting ===');

// Project expand/collapse functionality
window.toggleProjectDetails = function(header) {
    console.log('Toggle called on header:', header);
    
    try {
        const projectCard = header.closest('.project-card-collapsed');
        console.log('Found project card:', projectCard ? 'YES' : 'NO');
        
        if (!projectCard) {
            console.error('Project card not found');
            return false;
        }
        
        // Get the project-list (parent of project-card-collapsed)
        const projectList = projectCard.closest('.project-list');
        console.log('Found project list:', projectList ? 'YES' : 'NO');
        
        // Close all other expanded projects in the same list
        if (projectList) {
            const allProjects = projectList.querySelectorAll('.project-card-collapsed');
            console.log('Projects in list:', allProjects.length);
            allProjects.forEach(project => {
                if (project !== projectCard && project.classList.contains('expanded')) {
                    project.classList.remove('expanded');
                }
            });
        }
        
        // Toggle current project
        projectCard.classList.toggle('expanded');
        const isNowExpanded = projectCard.classList.contains('expanded');
        console.log('Toggled! Now expanded:', isNowExpanded);
        
    } catch (error) {
        console.error('Error in toggleProjectDetails:', error);
    }
    
    return false;
};

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        console.log('Found hamburger and nav menu');
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Smooth scroll and menu close on anchor click
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        console.log('Found contact form');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! Your message has been sent. I will get back to you soon!');
            this.reset();
        });
    }
    
    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.project-card, .skill-category, .about-highlights, .contact-info').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// Add active state to nav links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add some parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPos = window.scrollY;
        hero.style.backgroundPosition = `0 ${scrollPos * 0.5}px`;
    }
});

console.log('=== Script Loaded Successfully ===');
