document.addEventListener('DOMContentLoaded', () => {

    const mainHeader = document.getElementById('main-header');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navAnchors = document.querySelectorAll('.nav-links a');

    // Mobile Navigation Toggle
    if (burger && nav) {
        // Check if burger is visible before adding event listener (optional, as CSS hides it)
        // const isBurgerVisible = window.getComputedStyle(burger).display !== 'none';
        // if (isBurgerVisible) {
            burger.addEventListener('click', () => {
                nav.classList.toggle('nav-active'); // This class would be for the slide-out menu
                navLinks.forEach((link, index) => {
                    if (link.style.animation) {
                        link.style.animation = '';
                    } else {
                        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    }
                });
                burger.classList.toggle('toggle');
            });
        // }
    }

    // Close mobile nav when a link is clicked (still useful if nav-links were a dropdown)
    navAnchors.forEach(anchor => {
        // If you were implementing a dropdown that should close on link click
        // and if .nav-links had a class like 'dropdown-active' to show it:
        // if (nav.classList.contains('dropdown-active')) {
        //     nav.classList.remove('dropdown-active');
        // }

        // For the old slide-out panel that is now always visible on mobile (due to CSS):
        // This part of the JS might not be strictly necessary for the new mobile nav style,
        // but doesn't harm.
        if (nav.classList.contains('nav-active')) { // 'nav-active' was for the slide-out
            nav.classList.remove('nav-active');
            if(burger) burger.classList.remove('toggle'); // Check if burger exists
            navLinks.forEach(link => link.style.animation = '');
        }
    });

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = mainHeader ? mainHeader.offsetHeight : 70;
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = pageYOffset + headerHeight + 50; // Adjusted point to check against section top

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) { // More direct check
                current = section.getAttribute('id');
            }
        });

        // If scrolled to the very bottom, the last section should be active
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) { // 2px buffer
            current = sections[sections.length - 1].getAttribute('id');
        }


        navAnchors.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });

        const homeLink = document.querySelector('.nav-links a[href="#home"]');
        if (homeLink) {
             // If no section is current (e.g., scrolled to very top before any section), make 'home' active.
            if (current === '' && pageYOffset < sections[0].offsetTop / 2) {
                 navAnchors.forEach(a => a.classList.remove('active'));
                 homeLink.classList.add('active');
            } else if (current === 'home') { // Ensure home is active if it's the current section
                if(!homeLink.classList.contains('active')) {
                    navAnchors.forEach(a => a.classList.remove('active'));
                    homeLink.classList.add('active');
                }
            }
        }
    });

    // Set Current Year in Footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});