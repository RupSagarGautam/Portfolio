// Simple test to check if script is loading
console.log('=== SCRIPT LOADING TEST ===');
console.log('Script.js is loading...');

// Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== DOM CONTENT LOADED ===');
    
    const modal = document.getElementById('resumeModal');
    const downloadBtn = document.querySelector('a[href="docs/Rupsagar Gautam Resume.pdf"]');
    const closeBtn = document.querySelector('.close-modal');
    const closeModalBtn = document.querySelector('.close-btn');

    // Open modal when clicking download resume button
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    // Close modal when clicking the X button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking the Close button
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
});

// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Typed.js initialization
var typed = new Typed('#element', {
    strings: ['Web Developer.', 'Graphic Designer.', 'Video Editor.', 'Photographer.'],
    typeSpeed: 50,
});



// Enhanced Navigation active state management with IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== NAVIGATION SETUP START ===');
    
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    console.log('=== NAVIGATION DEBUG START ===');
    console.log('Sections found:', sections.length);
    sections.forEach(section => {
        console.log('Section ID:', section.getAttribute('id'));
    });

    console.log('Navigation links found:', navLinks.length);
    navLinks.forEach((link, index) => {
        console.log(`Link ${index + 1}:`, link.textContent, 'href:', link.getAttribute('href'));
    });

    // Function to apply active styles directly with debugging
    function applyActiveStyles(link) {
        console.log('Applying active styles to:', link.textContent);
        link.style.backgroundColor = '#1e2167';
        link.style.color = 'white';
        link.style.padding = '8px 16px';
        link.style.borderRadius = '40px';
        link.style.fontWeight = '600';
        link.style.fontSize = '13px';
        link.style.transform = 'scale(1.1)';
        link.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
        link.style.border = '2px solid #64ffda';
        link.style.textDecoration = 'none';
        link.style.transition = 'all 0.3s ease';
        
        // Verify styles were applied
        setTimeout(() => {
            const computedStyle = window.getComputedStyle(link);
            console.log('Applied styles verification for', link.textContent + ':');
            console.log('  - backgroundColor:', computedStyle.backgroundColor);
            console.log('  - color:', computedStyle.color);
            console.log('  - border:', computedStyle.border);
        }, 50);
    }

    // Function to remove active styles
    function removeActiveStyles(link) {
        link.style.backgroundColor = '';
        link.style.color = '';
        link.style.padding = '';
        link.style.borderRadius = '';
        link.style.fontWeight = '';
        link.style.fontSize = '';
        link.style.transform = '';
        link.style.boxShadow = '';
        link.style.border = '';
        link.style.textDecoration = '';
        link.style.transition = '';
    }

    // Function to update active navigation
    function updateActiveNav(currentSectionId) {
        console.log('=== UPDATING ACTIVE NAV ===');
        console.log('Target section:', currentSectionId);
        
        navLinks.forEach((link, index) => {
            console.log(`Processing link ${index + 1}:`, link.textContent);
            console.log('  - href:', link.getAttribute('href'));
            console.log('  - current section:', currentSectionId);
            
            // Remove active class and styles
            link.classList.remove("active");
            removeActiveStyles(link);
            
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                console.log('  - MATCH FOUND! Applying active state to:', link.textContent);
                link.classList.add("active");
                // Apply inline styles as fallback
                applyActiveStyles(link);
                console.log(`Active class added to: ${link.textContent} (${currentSectionId})`);
            } else {
                console.log('  - No match for this link');
            }
        });
    }

    // Add smooth scrolling to navigation links
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            console.log(`=== CLICK EVENT ===`);
            console.log(`Clicked link ${index + 1}:`, link.textContent);
            console.log('Target ID:', targetId);
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                console.log('Target section found, updating active state');
                // Immediately update active state for clicked link
                updateActiveNav(targetId);
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.log('Target section NOT found!');
            }
        });
    });

    // Method 1: IntersectionObserver (more efficient)
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -80% 0px', // Adjusted for better detection
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentSectionId = entry.target.getAttribute('id');
                    console.log('Section intersecting:', currentSectionId);
                    updateActiveNav(currentSectionId);
                }
            });
        }, observerOptions);

        // Observe all sections
        sections.forEach(section => {
            observer.observe(section);
            console.log('Observing section:', section.getAttribute('id'));
        });
    } else {
        // Fallback: Scroll event listener (for older browsers)
        window.addEventListener("scroll", () => {
            let current = "";
            const scrollPosition = window.scrollY + 100; // Adjusted offset for header

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionBottom = sectionTop + sectionHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    current = section.getAttribute("id");
                }
            });

            if (current) {
                updateActiveNav(current);
            }
        });
    }

    // Set initial active state based on current scroll position
    function setInitialActiveState() {
        const scrollPosition = window.scrollY + 100;
        let currentSection = 'home'; // Default to home

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute("id");
            }
        });

        updateActiveNav(currentSection);
    }

    // Set initial active state
    setInitialActiveState();

    // Handle direct URL hash navigation
    window.addEventListener('load', () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            updateActiveNav(hash);
        } else {
            setInitialActiveState();
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            updateActiveNav(hash);
        } else {
            setInitialActiveState();
        }
    });

    // Test function to manually trigger active state (for debugging)
    window.testActiveState = function(sectionId) {
        console.log('=== MANUAL TEST ===');
        console.log('Testing active state for:', sectionId);
        updateActiveNav(sectionId);
    };

    // Test function to check if CSS is loaded properly
    window.testCSS = function() {
        console.log('=== CSS TEST ===');
        const testLink = document.querySelector('.nav-links a[href="#contact"]');
        if (testLink) {
            console.log('Found contact link:', testLink.textContent);
            testLink.classList.add('active');
            applyActiveStyles(testLink);
            console.log('CSS test: Added active class to contact link');
            
            // Check computed styles immediately
            setTimeout(() => {
                const computedStyle = window.getComputedStyle(testLink);
                console.log('CSS test - Background color:', computedStyle.backgroundColor);
                console.log('CSS test - Color:', computedStyle.color);
                console.log('CSS test - Border:', computedStyle.border);
                console.log('CSS test - Classes:', testLink.className);
            }, 50);
            
            setTimeout(() => {
                testLink.classList.remove('active');
                removeActiveStyles(testLink);
                console.log('CSS test: Removed active class from contact link');
            }, 3000);
        } else {
            console.log('Contact link NOT found!');
        }
    };

    // Comprehensive debug function
    window.debugActiveState = function() {
        console.log('=== COMPREHENSIVE DEBUG ===');
        
        // Check all navigation links
        navLinks.forEach((link, index) => {
            console.log(`Link ${index + 1}:`, link.textContent);
            console.log('  - href:', link.getAttribute('href'));
            console.log('  - classes:', link.className);
            console.log('  - has active class:', link.classList.contains('active'));
            
            const computedStyle = window.getComputedStyle(link);
            console.log('  - background-color:', computedStyle.backgroundColor);
            console.log('  - color:', computedStyle.color);
            console.log('  - border:', computedStyle.border);
        });
        
        // Check CSS rules
        console.log('=== CSS RULES CHECK ===');
        const styleSheets = document.styleSheets;
        for (let i = 0; i < styleSheets.length; i++) {
            try {
                const rules = styleSheets[i].cssRules || styleSheets[i].rules;
                for (let j = 0; j < rules.length; j++) {
                    const rule = rules[j];
                    if (rule.selectorText && rule.selectorText.includes('.active')) {
                        console.log('Found active rule:', rule.selectorText);
                        console.log('  - styles:', rule.style.cssText);
                    }
                }
            } catch (e) {
                console.log('Cannot access stylesheet:', e);
            }
        }
    };

    // Force active state with inline styles
    window.forceActiveState = function(sectionId) {
        console.log('=== FORCE ACTIVE STATE ===');
        console.log('Forcing active state for:', sectionId);
        navLinks.forEach((link, index) => {
            console.log(`Processing link ${index + 1}:`, link.textContent);
            removeActiveStyles(link);
            link.classList.remove("active");
            
            if (link.getAttribute("href") === `#${sectionId}`) {
                console.log(`FORCING active state for: ${link.textContent}`);
                link.classList.add("active");
                applyActiveStyles(link);
            }
        });
    };

    // Direct style application test
    window.testDirectStyles = function() {
        console.log('=== DIRECT STYLES TEST ===');
        const contactLink = document.querySelector('.nav-links a[href="#contact"]');
        if (contactLink) {
            console.log('Found contact link, applying direct styles');
            contactLink.style.backgroundColor = '#1e2167';
            contactLink.style.color = 'white';
            contactLink.style.border = '2px solid #64ffda';
            contactLink.style.padding = '8px 16px';
            contactLink.style.borderRadius = '40px';
            contactLink.style.transform = 'scale(1.1)';
            contactLink.style.fontWeight = '600';
            contactLink.style.fontSize = '13px';
            contactLink.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
            contactLink.style.textDecoration = 'none';
            contactLink.style.transition = 'all 0.3s ease';
            console.log('Direct styles applied to contact link');
        } else {
            console.log('Contact link NOT found for direct styles test');
        }
    };

    console.log('=== NAVIGATION DEBUG END ===');
});
