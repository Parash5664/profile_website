document.addEventListener('DOMContentLoaded', () => {

    const mainHeader = document.getElementById('main-header');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navAnchors = document.querySelectorAll('nav .nav-links a'); // More specific selector for nav anchors

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
        anchor.addEventListener('click', (e) => {
            // Check if the link is an internal page link (starts with /#)
            // Or if it's a link to a separate blog page (contains 'blog/')
            const href = anchor.getAttribute('href');
            const isInternalPageLink = href && href.startsWith('/#');
            const isSamePageSectionLink = href && href.startsWith('#') && !href.startsWith('/#'); // for links like #about on index.html
            const isBlogPageLink = href && href.includes('blog/');


            if (nav.classList.contains('nav-active')) {
                // For internal page links or same-page section links, close the nav
                // For links to separate blog pages, the page will reload, so the nav will naturally be closed.
                // We primarily want to close it for smooth scrolling on the same page.
                if (isInternalPageLink || isSamePageSectionLink || !isBlogPageLink) {
                    nav.classList.remove('nav-active');
                    if(burger) burger.classList.remove('toggle');
                    navLinks.forEach(link => link.style.animation = '');
                }
            }
        });
    });

    // Active Nav Link on Scroll (Only for the main index.html page)
    // Check if we are on the main page by looking for a specific element, e.g., the hero section
    const heroSection = document.getElementById('home');
    if (heroSection) { // This logic should only run on index.html
        const sections = document.querySelectorAll('main section[id]'); // Target sections within main
        const headerHeight = mainHeader ? mainHeader.offsetHeight : 70;

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = pageYOffset + headerHeight + Math.max(100, window.innerHeight * 0.2); // Check a bit lower

            sections.forEach(section => {
                // Ensure section is visible enough
                if (section.offsetTop < scrollPosition && (section.offsetTop + section.offsetHeight) > (pageYOffset + headerHeight)) {
                     current = section.getAttribute('id');
                }
            });
             // If scrolled to the very bottom, the last section should be active
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
                current = sections[sections.length - 1].getAttribute('id');
            }
             // If at the very top, before any section is 'current'
            if (pageYOffset < sections[0].offsetTop - headerHeight) {
                current = 'home';
            }


            navAnchors.forEach(a => {
                a.classList.remove('active');
                // Match href like '/#section' or '#section' (if on index.html)
                const linkHref = a.getAttribute('href');
                if ((linkHref === `/#${current}`) || (linkHref === `#${current}`)) {
                    a.classList.add('active');
                }
            });
        });
    }


    // Set Current Year in Footer
    // This can run on all pages if the element ID is consistent
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});