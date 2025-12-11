// Banner Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Banner Slider
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const bannerDots = document.querySelectorAll('.dot');
    const bannerPrevBtn = document.querySelector('.banner-prev');
    const bannerNextBtn = document.querySelector('.banner-next');
    let currentBannerSlide = 0;
    let bannerInterval;

    // Function to show a specific banner slide
    function showBannerSlide(n) {
        // Hide all slides
        bannerSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        bannerDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Calculate current slide index
        currentBannerSlide = (n + bannerSlides.length) % bannerSlides.length;
        
        // Show current slide and activate corresponding dot
        bannerSlides[currentBannerSlide].classList.add('active');
        bannerDots[currentBannerSlide].classList.add('active');
    }

    // Next banner slide function
    function nextBannerSlide() {
        showBannerSlide(currentBannerSlide + 1);
    }

    // Previous banner slide function
    function prevBannerSlide() {
        showBannerSlide(currentBannerSlide - 1);
    }

    // Start auto-sliding
    function startBannerAutoSlide() {
        bannerInterval = setInterval(nextBannerSlide, 5000); // Change slide every 5 seconds
    }

    // Stop auto-sliding
    function stopBannerAutoSlide() {
        clearInterval(bannerInterval);
    }

    // Event listeners for dots
    bannerDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopBannerAutoSlide();
            showBannerSlide(index);
            startBannerAutoSlide();
        });
    });

    // Event listeners for arrows
    if (bannerPrevBtn) {
        bannerPrevBtn.addEventListener('click', () => {
            stopBannerAutoSlide();
            prevBannerSlide();
            startBannerAutoSlide();
        });
    }

    if (bannerNextBtn) {
        bannerNextBtn.addEventListener('click', () => {
            stopBannerAutoSlide();
            nextBannerSlide();
            startBannerAutoSlide();
        });
    }

    // Pause auto-slide on hover
    const banner = document.querySelector('.hero-banner');
    if (banner) {
        banner.addEventListener('mouseenter', stopBannerAutoSlide);
        banner.addEventListener('mouseleave', startBannerAutoSlide);
    }

    // Initialize banner
    if (bannerSlides.length > 0) {
        showBannerSlide(0);
        startBannerAutoSlide();
    }

    // Featured Programs Slider
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    let currentSlide = 0;

    if (sliderTrack && slides.length > 0) {
        function updateSlider() {
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function nextSliderSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }

        function prevSliderSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        }

        if (sliderPrev) {
            sliderPrev.addEventListener('click', prevSliderSlide);
        }

        if (sliderNext) {
            sliderNext.addEventListener('click', nextSliderSlide);
        }

        // Auto-advance featured programs slider
        setInterval(nextSliderSlide, 7000);
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Change icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Language toggle functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = 'en'; // Default language

    function setActiveLanguage(lang) {
        // Update button states
        langButtons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update all multilingual content
        document.querySelectorAll('[data-en]').forEach(element => {
            if (element.dataset[lang]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = element.dataset[lang];
                } else if (element.tagName === 'IMG') {
                    element.alt = element.dataset[lang];
                } else {
                    element.innerHTML = element.dataset[lang];
                }
            }
        });

        // Update page title if available
        const pageTitle = document.querySelector('title');
        if (pageTitle && pageTitle.dataset && pageTitle.dataset[lang]) {
            pageTitle.textContent = pageTitle.dataset[lang];
        }
    }

    // Add click events to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setActiveLanguage(lang);
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Here you would typically send the email to your server
            // For now, just show a simple alert
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
});