/* Sony WH-1000XM6 Scroll-driven Image Sequence Animation
 * Apple-level cinematic scrollytelling experience
 * Ultra-smooth 60fps canvas animation synchronized with scroll
 */

class SonyHeadphonesExperience {
    constructor() {
        this.canvas = document.getElementById('headphonesCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.storySections = document.querySelectorAll('.story-section');
        this.navbar = document.querySelector('.navbar');
        this.scrollProgress = document.querySelector('.scroll-progress');

        // Image sequence properties
        this.totalFrames = 98; // Based on our image sequence
        this.currentFrame = 0;
        this.images = [];
        this.imagesLoaded = 0;
        this.isLoading = true;

        // Scroll tracking
        this.scrollPosition = 0;
        this.maxScroll = 0;
        this.windowHeight = window.innerHeight;
        this.canvasHeight = 0;

        // Performance optimization
        this.rafId = null;
        this.lastScrollTime = 0;
        this.scrollThrottle = 16; // ~60fps

        // Smooth animation
        this.targetFrame = 0;
        this.currentDisplayFrame = 0;
        this.frameAnimationSpeed = 0.15;

        // Initialize
        this.init();
    }

    init() {
        this.setupCanvas();
        this.loadImages();
        this.setupEventListeners();
        this.setupResizeObserver();
        this.updateScrollInfo();
        this.hideLoading();

        // Start animation loop
        this.animate();
    }

    setupCanvas() {
        // Set canvas to full viewport size
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Set canvas background to match page background
        this.canvas.style.backgroundColor = '#050505';
    }

    loadImages() {
        console.log('Loading image sequence...');

        // Create loading bar or indicator
        const loadingBar = document.createElement('div');
        loadingBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 2px;
            background: linear-gradient(90deg, #0050FF, #00D6FF);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(loadingBar);

        // Load all image frames
        for (let i = 1; i <= this.totalFrames; i++) {
            const img = new Image();
            const frameNumber = i.toString().padStart(3, '0');
            img.src = `ezgif-38a8f3d4bd8c4322-jpg/ezgif-frame-${frameNumber}.jpg`;

            img.onload = () => {
                this.imagesLoaded++;
                loadingBar.style.width = `${(this.imagesLoaded / this.totalFrames) * 100}%`;

                if (this.imagesLoaded === this.totalFrames) {
                    console.log('All images loaded!');
                    loadingBar.style.opacity = '0';
                    setTimeout(() => loadingBar.remove(), 300);
                    this.isLoading = false;
                }
            };

            img.onerror = () => {
                console.warn(`Failed to load frame ${frameNumber}`);
                this.imagesLoaded++;
                // Use placeholder or continue anyway
                if (this.imagesLoaded === this.totalFrames) {
                    this.isLoading = false;
                    loadingBar.remove();
                }
            };

            this.images[i - 1] = img; // Store with 0-based index
        }
    }

    setupEventListeners() {
        // Throttled scroll handler
        window.addEventListener('scroll', () => {
            const now = Date.now();
            if (now - this.lastScrollTime > this.scrollThrottle) {
                this.handleScroll();
                this.lastScrollTime = now;
            }
        }, { passive: true });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.updateScrollInfo();
            this.drawCurrentFrame();
            this.closeMobileMenu(); // Close menu on resize
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.querySelector(`[data-scroll-range*="${targetId}"]`);

                if (targetSection) {
                    this.scrollToSection(targetSection);
                }
            });
        });

        // Mobile navigation links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.querySelector(`[data-scroll-range*="${targetId}"]`);

                if (targetSection) {
                    this.scrollToSection(targetSection);
                    this.closeMobileMenu();
                }
            });
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

        if (mobileMenuToggle && mobileMenuOverlay) {
            mobileMenuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });

            // Close menu when clicking on overlay
            mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === mobileMenuOverlay || e.target.classList.contains('mobile-cta-button')) {
                    this.closeMobileMenu();
                }
            });

            // Close menu when clicking outside on mobile
            document.addEventListener('click', (e) => {
                if (this.isMobileMenuOpen() && !e.target.closest('.navbar')) {
                    this.closeMobileMenu();
                }
            });
        }

        // CTA buttons
        document.querySelectorAll('.cta-button, .primary-cta, .mobile-cta-button').forEach(button => {
            button.addEventListener('click', () => {
                this.handleCTAClick();
            });
        });
    }

    toggleMobileMenu() {
        const overlay = document.getElementById('mobileMenuOverlay');
        const toggle = document.getElementById('mobileMenuToggle');

        if (overlay.classList.contains('active')) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const overlay = document.getElementById('mobileMenuOverlay');
        const toggle = document.getElementById('mobileMenuToggle');

        overlay.classList.add('active');
        toggle.innerHTML = '✕';
        toggle.style.fontSize = '1.25rem';
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const overlay = document.getElementById('mobileMenuOverlay');
        const toggle = document.getElementById('mobileMenuToggle');

        overlay.classList.remove('active');
        toggle.innerHTML = '☰';
        toggle.style.fontSize = '1.5rem';
        document.body.style.overflow = '';
    }

    isMobileMenuOpen() {
        const overlay = document.getElementById('mobileMenuOverlay');
        return overlay && overlay.classList.contains('active');
    }

    handleCTAClick() {
        // Scroll to CTA section (last 15%)
        const targetScrollPercent = 85;
        const targetScrollY = (targetScrollPercent / 100) * this.maxScroll;

        window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        this.closeMobileMenu();

        // Add subtle pulse animation to CTA section
        const ctaSection = document.querySelector('.cta-section');
        if (ctaSection) {
            ctaSection.style.animation = 'none';
            setTimeout(() => {
                ctaSection.style.animation = 'pulseCTA 1s ease';
            }, 10);
        }
    }

    setupResizeObserver() {
        // Observe canvas container for size changes
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                this.canvas.width = entry.contentRect.width;
                this.canvas.height = entry.contentRect.height;
                this.updateScrollInfo();
                this.drawCurrentFrame();
            }
        });

        resizeObserver.observe(this.canvas.parentElement);
    }

    updateScrollInfo() {
        this.windowHeight = window.innerHeight;
        this.canvasHeight = this.canvas.parentElement.offsetHeight;
        this.maxScroll = this.canvasHeight - this.windowHeight;

        // Update scroll position
        this.handleScroll();
    }

    handleScroll() {
        this.scrollPosition = window.scrollY;
        this.updateScrollProgress();
        this.updateNavbar();
        this.updateImageFrame();
        this.updateStorySections();
    }

    updateScrollProgress() {
        const scrollPercent = Math.min(this.scrollPosition / this.maxScroll, 1);

        if (this.scrollProgress) {
            // Animate the progress indicator
            this.scrollProgress.style.height = `${scrollPercent * 100}%`;
        }
    }

    updateNavbar() {
        const shouldShowNavbar = this.scrollPosition > 100;

        if (shouldShowNavbar) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    updateImageFrame() {
        // Map scroll position to frame index (0 to totalFrames-1)
        const scrollPercent = Math.min(this.scrollPosition / this.maxScroll, 1);

        // Apply smooth easing for more cinematic feel
        const easedScroll = this.easeInOutCubic(scrollPercent);

        // Calculate target frame based on scroll
        this.targetFrame = Math.floor(easedScroll * (this.totalFrames - 1));

        // Clamp to valid range
        this.targetFrame = Math.max(0, Math.min(this.targetFrame, this.totalFrames - 1));
    }

    updateStorySections() {
        const scrollPercent = (this.scrollPosition / this.maxScroll) * 100;

        this.storySections.forEach(section => {
            const range = section.dataset.scrollRange.split(',').map(Number);
            const [start, end] = range;

            // Calculate opacity based on scroll position within range
            let opacity = 0;

            if (scrollPercent >= start && scrollPercent <= end) {
                // In range - fully visible
                opacity = 1;
            } else if (scrollPercent < start && scrollPercent > start - 5) {
                // Entering range
                opacity = (scrollPercent - (start - 5)) / 5;
            } else if (scrollPercent > end && scrollPercent < end + 5) {
                // Exiting range
                opacity = 1 - ((scrollPercent - end) / 5);
            }

            // Apply opacity and visibility
            section.style.opacity = opacity;
            section.style.visibility = opacity > 0 ? 'visible' : 'hidden';

            // Add/remove active class for animations
            if (opacity > 0.5) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }

            // Apply subtle parallax based on position in range
            const positionInRange = (scrollPercent - start) / (end - start);
            if (positionInRange >= 0 && positionInRange <= 1) {
                const parallaxOffset = (positionInRange - 0.5) * 20;
                section.querySelector('.section-content').style.transform =
                    `translateY(${parallaxOffset}px)`;
            }
        });
    }

    animate() {
        // Smoothly animate to target frame
        const frameDiff = this.targetFrame - this.currentDisplayFrame;
        this.currentDisplayFrame += frameDiff * this.frameAnimationSpeed;

        // Draw the current frame
        if (!this.isLoading) {
            this.drawCurrentFrame();
        }

        // Continue animation loop
        this.rafId = requestAnimationFrame(() => this.animate());
    }

    drawCurrentFrame() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Get the current frame index (rounded)
        const frameIndex = Math.round(this.currentDisplayFrame);

        // Ensure we have a valid image
        if (this.images[frameIndex] && this.images[frameIndex].complete) {
            const img = this.images[frameIndex];

            // Calculate dimensions to fit canvas while preserving aspect ratio
            const canvasRatio = this.canvas.width / this.canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (canvasRatio > imgRatio) {
                // Canvas is wider than image
                drawHeight = this.canvas.height;
                drawWidth = drawHeight * imgRatio;
                offsetX = (this.canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                // Canvas is taller than image
                drawWidth = this.canvas.width;
                drawHeight = drawWidth / imgRatio;
                offsetX = 0;
                offsetY = (this.canvas.height - drawHeight) / 2;
            }

            // Draw the image with subtle blur based on scroll speed
            this.ctx.save();

            // Apply subtle brightness based on frame position
            const brightness = 0.95 + (frameIndex / this.totalFrames) * 0.1;
            this.ctx.filter = `brightness(${brightness})`;

            // Draw the image
            this.ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

            // Add subtle vignette effect
            this.addVignette();

            this.ctx.restore();

            // Update current frame for performance tracking
            this.currentFrame = frameIndex;
        }
    }

    addVignette() {
        // Create subtle vignette effect for cinematic feel
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.canvas.width * 0.3,
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.canvas.width * 0.7
        );

        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    scrollToSection(section) {
        const range = section.dataset.scrollRange.split(',').map(Number);
        const targetScrollPercent = (range[0] + range[1]) / 2;
        const targetScrollY = (targetScrollPercent / 100) * this.maxScroll;

        // Smooth scroll to target position
        window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth'
        });
    }

    hideLoading() {
        // Hide loading state after a brief delay
        setTimeout(() => {
            document.querySelector('.loading')?.classList.add('hidden');
        }, 1000);
    }

    // Easing functions for smooth animations
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    // Cleanup
    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }

        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }
}

// Initialize the experience when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const experience = new SonyHeadphonesExperience();

    // Make available globally for debugging
    window.sonyExperience = experience;

    // Add loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = `
        <div class="loading-text">
            Loading Sony WH‑1000XM6 Experience...
        </div>
    `;
    document.body.appendChild(loadingScreen);

    // Hide loading after images are loaded
    const checkLoading = setInterval(() => {
        if (!experience.isLoading) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
                clearInterval(checkLoading);
            }, 1000);
        }
    }, 100);
});