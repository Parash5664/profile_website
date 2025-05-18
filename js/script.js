document.addEventListener('DOMContentLoaded', () => {

    const mainHeader = document.getElementById('main-header');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navAnchors = document.querySelectorAll('.nav-links a');

    // Mobile Navigation Toggle
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            burger.classList.toggle('toggle');
        });
    }

    // Close mobile nav when a link is clicked
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => link.style.animation = '');
            }
        });
    });

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = mainHeader ? mainHeader.offsetHeight : 70;
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - headerHeight - 50)) {
                current = section.getAttribute('id');
            }
        });
        navAnchors.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });
        const homeLink = document.querySelector('.nav-links a[href="#home"]');
        if (homeLink) {
            if (current === 'home' || (current === '' && pageYOffset < sections[0].offsetTop + sections[0].clientHeight / 2 - headerHeight)) {
                if (!homeLink.classList.contains('active')) {
                    navAnchors.forEach(a => a.classList.remove('active'));
                    homeLink.classList.add('active');
                }
            } else if (current !== 'home' && current !== '' && homeLink.classList.contains('active')) {
                 let anotherSectionIsActive = false;
                 navAnchors.forEach(a => {
                     if (a !== homeLink && a.classList.contains('active')) {
                         anotherSectionIsActive = true;
                     }
                 });
                 if (anotherSectionIsActive) { homeLink.classList.remove('active'); }
            }
            if (current === '' && pageYOffset < 100) {
                navAnchors.forEach(a => a.classList.remove('active'));
                if(homeLink) homeLink.classList.add('active');
            }
        }
    });

    // Set Current Year in Footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});