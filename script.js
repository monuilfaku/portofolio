document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. THEME TOGGLE SYSTEM (DARK / LIGHT MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage for preference, default to light theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeToggleIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        themeToggleIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            // Switch to Light
            document.body.classList.replace('dark-theme', 'light-theme');
            themeToggleIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to Dark
            document.body.classList.replace('light-theme', 'dark-theme');
            themeToggleIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });

    /* ==========================================================================
       2. TYPING ANIMATION (HERO SECTION)
       ========================================================================== */
    const typingSpan = document.querySelector('.typing-text');
    const roles = ['Web Developer', 'System Administrator', 'IT Specialist'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Deleting text
            typingSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deletes faster
        } else {
            // Typing text
            typingSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; // Standard typing pace
        }

        // Handle word completion states
        if (!isDeleting && charIndex === currentRole.length) {
            // Word fully typed, pause before deleting
            isDeleting = true;
            typingSpeed = 2000; 
        } else if (isDeleting && charIndex === 0) {
            // Word fully deleted, move to the next word
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingSpan) {
        setTimeout(typeEffect, 1000); // Start typing after 1s delay
    }

    /* ==========================================================================
       3. MOBILE RESPONSIVE MENU
       ========================================================================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        navbar.classList.toggle('mobile-active');
        if (navbar.classList.contains('mobile-active')) {
            mobileMenuIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            mobileMenuIcon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('mobile-active');
            mobileMenuIcon.classList.replace('fa-xmark', 'fa-bars');
        });
    });

    /* ==========================================================================
       4. SCROLL SPY (ACTIVE LINK HIGHLIGHTER)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Triggers when section occupies middle viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    /* ==========================================================================
       5. FITMATE SCREENSHOTS CAROUSEL
       ========================================================================== */
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
        // Handle boundaries
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        // Update active slide class
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === currentSlide) {
                slide.classList.add('active');
            }
        });

        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === currentSlide) {
                indicator.classList.add('active');
            }
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Auto sliding timer
    function startAutoSlide() {
        carouselInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(carouselInterval);
    }

    // Button click listeners
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    // Dot indicators listeners
    indicators.forEach(indicator => {
        indicator.addEventListener('click', (e) => {
            stopAutoSlide();
            const index = parseInt(e.target.getAttribute('data-index'));
            showSlide(index);
            startAutoSlide();
        });
    });

    // Initialize carousel if slides exist
    if (slides.length > 0) {
        showSlide(0);
        startAutoSlide();
    }

    /* ==========================================================================
       6. CONTACT FORM VALIDATION & SIMULATION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formMessageAlert = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const contactMethod = document.getElementById('contact-method').value;
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            if (!name || !email || !subject || !message) {
                showAlert('Harap isi semua kolom formulir.', 'error');
                return;
            }

            // Lock submit button & show loading state
            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Mengirim... <i class="fas fa-spinner fa-spin"></i>';

            // Simulate form submission process (API delay)
            setTimeout(() => {
                // Reset form state
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                
                // Show success notification and redirect
                showAlert('Pesan siap! Mengarahkan Anda...', 'success');
                
                if (contactMethod === 'whatsapp') {
                    const waText = `Halo Mochamad,\n\nNama: ${name}\nEmail: ${email}\nSubjek: ${subject}\n\nPesan:\n${message}`;
                    const waUrl = `https://wa.me/6285182564946?text=${encodeURIComponent(waText)}`;
                    window.open(waUrl, '_blank');
                } else {
                    const gmailBody = `Nama Pengirim: ${name}\nEmail Pengirim: ${email}\n\nPesan:\n${message}`;
                    const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=mochamad.n.f.k@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(gmailBody)}`;
                    window.open(gmailUrl, '_blank');
                }
                
                // Auto hide message after 7 seconds
                setTimeout(() => {
                    if (formMessageAlert) {
                        formMessageAlert.style.display = 'none';
                        formMessageAlert.className = 'form-message-alert';
                    }
                }, 7000);

            }, 1200);
        });
    }

    function showAlert(msg, type) {
        if (formMessageAlert) {
            formMessageAlert.textContent = msg;
            formMessageAlert.className = 'form-message-alert';
            formMessageAlert.classList.add(type);
        }
    }

    /* ==========================================================================
       7. MOUSE-TRACKING SPOTLIGHT EFFECT FOR GLASS CARDS
       ========================================================================== */
    const glassCards = document.querySelectorAll('.glass');
    
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
