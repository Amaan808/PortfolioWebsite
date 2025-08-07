// Cyberpunk 2077 Portfolio JavaScript

class CyberpunkPortfolio {
    constructor() {
        this.initializeComponents();
        this.setupEventListeners();
        this.startAnimations();
        this.updateSystemTime();
    }

    initializeComponents() {
        // Initialize loading screen
        this.loadingScreen = document.getElementById('loadingScreen');
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('navMenu');
        this.navToggle = document.getElementById('navToggle');
        
        // Initialize sections
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-menu a');
        
        // Initialize form
        this.contactForm = document.querySelector('.neural-form');
        
        // Initialize pixel character (commented out since we're using photo now)
        // this.characterCanvas = document.getElementById('characterCanvas');
        
        // State management
        this.isLoading = true;
        this.currentSection = 'home';
        this.particles = [];
        
        // Start loading sequence
        this.startLoadingSequence();
    }

    startLoadingSequence() {
        const loadingProgress = document.querySelector('.loading-progress');
        const loadingText = document.querySelector('.loading-text');
        
        const loadingMessages = [
            'BOOTING UP THE MATRIX...',
            'LINKING TO CYBERSPACE...',
            'DEPLOYING AI MODULES...',
            'SYNCHRONIZING NEURAL NETWORKS...',
            'SYSTEM READY – WELCOME TO AMAAN.EXE'
        ];
        
        let messageIndex = 0;
        let progress = 0;
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;
            
            loadingProgress.style.width = `${progress}%`;
            
            // Change loading message
            if (messageIndex < loadingMessages.length - 1 && progress > (messageIndex + 1) * 20) {
                messageIndex++;
                loadingText.textContent = loadingMessages[messageIndex];
                this.glitchText(loadingText);
            }
            
            // Complete loading
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    this.completeLoading();
                }, 1000);
            }
        }, 150);
    }

    completeLoading() {
        this.loadingScreen.classList.add('hidden');
        this.isLoading = false;
        
        // Start main animations
        setTimeout(() => {
            this.animateHeroEntry();
            this.initializeParticles();
            // this.createPixelCharacter(); // Commented out since we're using photo now
        }, 500);
    }

    animateHeroEntry() {
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const heroActions = document.querySelector('.hero-buttons');
        const characterFrame = document.querySelector('.character-frame');
        
        // Array of titles to cycle through
        const titles = [
            'INNOVATOR',
            'HIGHLY CREATIVE',
            'FULL STACK',
            'DEVELOPER',
            'AI DEVELOPER',
            'ENGINEER',
            'PROBLEM SOLVER',
            'TECH ENTHUSIAST'
        ];
        
        // Animate elements with staggered delays
        setTimeout(() => {
            if (characterFrame) {
                characterFrame.style.opacity = '0';
                characterFrame.style.transform = 'translateX(-50px)';
                characterFrame.style.transition = 'all 0.8s ease';
                setTimeout(() => {
                    characterFrame.style.opacity = '1';
                    characterFrame.style.transform = 'translateX(0)';
                }, 100);
            }
        }, 200);
        
        // Start the rotating title effect
        setTimeout(() => {
            const typewriterText = heroTitle.querySelector('.title-main .typewriter-text');
            this.startRotatingTitles(typewriterText, titles);
        }, 800);
        
        setTimeout(() => {
            heroDescription.style.opacity = '0';
            heroDescription.style.transform = 'translateY(20px)';
            heroDescription.style.transition = 'all 0.8s ease';
            setTimeout(() => {
                heroDescription.style.opacity = '1';
                heroDescription.style.transform = 'translateY(0)';
            }, 100);
        }, 1200);
        
        setTimeout(() => {
            heroActions.style.opacity = '0';
            heroActions.style.transform = 'translateY(20px)';
            heroActions.style.transition = 'all 0.8s ease';
            setTimeout(() => {
                heroActions.style.opacity = '1';
                heroActions.style.transform = 'translateY(0)';
            }, 100);
        }, 1600);
    }

    startRotatingTitles(element, titles) {
        let currentIndex = 0;
        
        const cycleTitle = () => {
            const currentTitle = titles[currentIndex];
            
            // Type out the current title
            this.typewriterEffect(element, currentTitle, () => {
                // Wait for 2 seconds after typing is complete
                setTimeout(() => {
                    // Clear the text with a fade effect
                    this.clearTextWithFade(element, () => {
                        // Move to next title
                        currentIndex = (currentIndex + 1) % titles.length;
                        // Start the next cycle
                        cycleTitle();
                    });
                }, 2000);
            });
        };
        
        // Start the cycle
        cycleTitle();
    }

    typewriterEffect(element, text, onComplete) {
        element.textContent = '';
        let i = 0;
        const speed = 100;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                
                // Add glitch effect occasionally
                if (Math.random() < 0.1) {
                    this.glitchText(element);
                }
            } else {
                clearInterval(typeInterval);
                if (onComplete) onComplete();
            }
        }, speed);
    }

    clearTextWithFade(element, onComplete) {
        const originalText = element.textContent;
        const fadeOutDuration = 500; // 0.5 seconds
        const steps = 10;
        const stepDuration = fadeOutDuration / steps;
        let currentStep = 0;
        
        const fadeInterval = setInterval(() => {
            currentStep++;
            const remainingChars = Math.floor(originalText.length * (1 - currentStep / steps));
            element.textContent = originalText.substring(0, remainingChars);
            
            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                element.textContent = '';
                if (onComplete) onComplete();
            }
        }, stepDuration);
    }

    glitchText(element) {
        const originalText = element.textContent;
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        let glitchText = '';
        
        // Create glitch version
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.3) {
                glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitchText += originalText[i];
            }
        }
        
        // Apply glitch briefly
        element.textContent = glitchText;
        element.style.color = '#FF073A';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.color = '';
        }, 50);
    }

    createPixelCharacter() {
        if (!this.characterCanvas) return;
        
        const ctx = this.characterCanvas.getContext('2d');
        const pixelSize = 8;
        const width = this.characterCanvas.width;
        const height = this.characterCanvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        ctx.imageSmoothingEnabled = false;
        
        // Cyberpunk color palette
        const colors = {
            background: '#0A0A0A',
            skin: '#D4A574',
            hair: '#2A2A2A',
            jacket: '#FFD700',
            jacketDark: '#B8A000',
            shirt: '#1A1A1A',
            cybereye: '#00FFFF',
            implant: '#FF00FF',
            outline: '#FFFFFF',
            shadow: '#000000',
            neural: '#00FF00',
            visor: '#FF073A'
        };
        
        // Character pixel map (25x31 grid for 200x250 canvas)
        const characterMap = [
            // Row 0-4: Hair/Head top
            '0000000111111110000000000',
            '0000011111111111100000000',
            '0001111111111111111000000',
            '0011111111111111111100000',
            '0111111111111111111110000',
            // Row 5-9: Face/Forehead
            '0111122222222222211110000',
            '1111222222222222221111000',
            '1112222222222222222111000',
            '1122222222222222222211000',
            '1122222242222242222211000',
            // Row 10-14: Eyes and cybernetic implants
            '1122222444444444222211000',
            '1122224455555544422211000',
            '1122224455C55544422211000', // C = cybereye
            '1122224455555544422211000',
            '1122222444444444222211000',
            // Row 15-19: Nose and mouth area
            '1122222222222222222211000',
            '1122222222322222222211000',
            '1122222223332222222211000',
            '1122222222222222222211000',
            '1122222223333222222211000',
            // Row 20-24: Jaw and neck
            '0112222222222222222110000',
            '0111222222222222221110000',
            '0011122222222222211100000',
            '0001112222222221111000000',
            '0000011122222111100000000',
            // Row 25-31: Body/Jacket
            '0000000666666660000000000',
            '0000006666666666000000000',
            '0000066666666666600000000',
            '0000666777777776660000000',
            '0006667777777777666000000',
            '0066677777I77777766600000', // I = implant
            '0666777777777777777660000'
        ];
        
        // Draw character
        for (let y = 0; y < characterMap.length; y++) {
            for (let x = 0; x < characterMap[y].length; x++) {
                const char = characterMap[y][x];
                let color = colors.background;
                
                switch (char) {
                    case '1':
                        color = colors.hair;
                        break;
                    case '2':
                        color = colors.skin;
                        break;
                    case '3':
                        color = colors.outline;
                        break;
                    case '4':
                        color = colors.shadow;
                        break;
                    case '5':
                        color = colors.cybereye;
                        break;
                    case '6':
                        color = colors.jacket;
                        break;
                    case '7':
                        color = colors.shirt;
                        break;
                    case 'C':
                        color = colors.cybereye;
                        break;
                    case 'I':
                        color = colors.implant;
                        break;
                    default:
                        continue;
                }
                
                ctx.fillStyle = color;
                ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            }
        }
        
        // Add cybernetic enhancements
        this.addCyberneticEffects(ctx, pixelSize);
        
        // Add glowing effects
        this.addGlowEffects(ctx, pixelSize);
        
        // Start character animations
        this.animateCharacter(ctx, pixelSize);
    }

    addCyberneticEffects(ctx, pixelSize) {
        // Neural interface on temple
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(2 * pixelSize, 10 * pixelSize, pixelSize, pixelSize);
        ctx.fillRect(1 * pixelSize, 11 * pixelSize, pixelSize, pixelSize);
        ctx.fillRect(2 * pixelSize, 12 * pixelSize, pixelSize, pixelSize);
        
        // Data ports on neck
        ctx.fillStyle = '#FF00FF';
        ctx.fillRect(8 * pixelSize, 23 * pixelSize, pixelSize, pixelSize);
        ctx.fillRect(10 * pixelSize, 23 * pixelSize, pixelSize, pixelSize);
        ctx.fillRect(12 * pixelSize, 23 * pixelSize, pixelSize, pixelSize);
        
        // Cybernetic eye enhancement
        ctx.fillStyle = '#00FFFF';
        ctx.fillRect(11 * pixelSize, 11 * pixelSize, pixelSize * 2, pixelSize);
        ctx.fillRect(12 * pixelSize, 10 * pixelSize, pixelSize, pixelSize);
        ctx.fillRect(12 * pixelSize, 13 * pixelSize, pixelSize, pixelSize);
    }

    addGlowEffects(ctx, pixelSize) {
        // Create glow effect for cybernetic parts
        const glowColor = 'rgba(0, 255, 255, 0.3)';
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 4;
        
        // Re-draw glowing elements
        ctx.fillStyle = '#00FFFF';
        ctx.fillRect(11 * pixelSize, 12 * pixelSize, pixelSize * 2, pixelSize);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
    }

    animateCharacter(ctx, pixelSize) {
        let frame = 0;
        const animationSpeed = 2000; // 2 seconds per cycle
        
        const animate = () => {
            // Cybernetic eye pulse
            const pulse = Math.sin(Date.now() / 500) * 0.5 + 0.5;
            const eyeIntensity = Math.floor(pulse * 255);
            
            // Redraw cybernetic eye with pulsing effect
            ctx.fillStyle = `rgb(0, ${eyeIntensity}, 255)`;
            ctx.fillRect(11 * pixelSize, 12 * pixelSize, pixelSize * 2, pixelSize);
            
            // Neural interface blink
            if (Math.random() < 0.02) {
                ctx.fillStyle = Math.random() < 0.5 ? '#00FF00' : '#FF0000';
                ctx.fillRect(2 * pixelSize, 10 * pixelSize, pixelSize, pixelSize);
                
                setTimeout(() => {
                    ctx.fillStyle = '#00FF00';
                    ctx.fillRect(2 * pixelSize, 10 * pixelSize, pixelSize, pixelSize);
                }, 100);
            }
            
            // Data port activity
            if (Math.random() < 0.05) {
                const ports = [8, 10, 12];
                const activePort = ports[Math.floor(Math.random() * ports.length)];
                
                ctx.fillStyle = '#FFFF00';
                ctx.fillRect(activePort * pixelSize, 23 * pixelSize, pixelSize, pixelSize);
                
                setTimeout(() => {
                    ctx.fillStyle = '#FF00FF';
                    ctx.fillRect(activePort * pixelSize, 23 * pixelSize, pixelSize, pixelSize);
                }, 150);
            }
            
            frame++;
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    initializeParticles() {
        this.createFloatingParticles();
        this.animateParticles();
    }

    createFloatingParticles() {
        const particleContainer = document.querySelector('.hologram-particles');
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: ${this.getRandomColor()};
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.3};
                box-shadow: 0 0 ${Math.random() * 10 + 5}px currentColor;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
            `;
            
            this.particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 4 + 2
            });
            
            particleContainer.appendChild(particle);
        }
    }

    getRandomColor() {
        const colors = ['#FFD700', '#00FFFF', '#FF00FF', '#FF073A'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animateParticles() {
        const animate = () => {
            this.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Bounce off edges
                if (particle.x < 0 || particle.x > window.innerWidth) {
                    particle.vx *= -1;
                }
                if (particle.y < 0 || particle.y > window.innerHeight) {
                    particle.vy *= -1;
                }
                
                // Update position
                particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
                
                // Random color change
                if (Math.random() < 0.01) {
                    particle.element.style.background = this.getRandomColor();
                }
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    setupEventListeners() {
        // Navigation toggle for mobile
        this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.navToggle.classList.toggle('active');
        });

        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.navigateToSection(targetSection);
                
                // Close mobile menu
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
            });
        });

        // Scroll spy for active navigation
        window.addEventListener('scroll', () => {
            this.updateActiveNavigation();
            this.handleScrollEffects();
        });

        // Contact form submission
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                this.handleFormSubmission(e);
            });
        }

        // Button hover effects
        this.setupButtonEffects();

        // Skill bars animation on scroll
        this.setupSkillBarAnimations();

        // Project cards hover effects
        this.setupProjectCardEffects();

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    navigateToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = targetSection.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            this.currentSection = sectionId;
            this.updateActiveNavigation();
        }
    }

    updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
                
                this.currentSection = sectionId;
            }
        });
    }

    handleScrollEffects() {
        const scrollY = window.scrollY;
        
        // Parallax background effects
        const cityGrid = document.querySelector('.city-grid');
        if (cityGrid) {
            cityGrid.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
        
        // Navbar background opacity
        const opacity = Math.min(scrollY / 100, 0.95);
        this.navbar.style.background = `rgba(0, 0, 0, ${opacity})`;
        
        // Reveal animations for sections
        this.sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible && !section.classList.contains('revealed')) {
                section.classList.add('revealed');
                this.animateSectionReveal(section);
            }
        });
    }

    animateSectionReveal(section) {
        const cards = section.querySelectorAll('.about-card, .skill-category, .project-card, .contact-card, .form-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 150);
        });
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.createButtonParticles(button);
            });
            
            button.addEventListener('click', (e) => {
                this.createClickEffect(e, button);
            });
        });
    }

    createButtonParticles(button) {
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #FFD700;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: particle-float 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    createClickEffect(e, button) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: rgba(255, 215, 0, 0.6);
            border-radius: 50%;
            left: ${x - 5}px;
            top: ${y - 5}px;
            animation: ripple-effect 0.6s ease-out forwards;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupSkillBarAnimations() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const progress = skillBar.style.getPropertyValue('--progress');
                    
                    skillBar.style.width = '0%';
                    skillBar.style.transition = 'width 2s ease-out';
                    
                    setTimeout(() => {
                        skillBar.style.width = progress;
                    }, 200);
                    
                    observer.unobserve(skillBar);
                }
            });
        }, observerOptions);
        
        skillBars.forEach(bar => observer.observe(bar));
    }

    setupProjectCardEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const overlay = card.querySelector('.project-overlay');
                this.createHologramEffect(overlay);
            });
            
            card.addEventListener('mouseleave', () => {
                const overlay = card.querySelector('.project-overlay');
                this.stopHologramEffect(overlay);
            });
        });
    }

    createHologramEffect(element) {
        if (!element) return;
        
        const scanLine = document.createElement('div');
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00FFFF, transparent);
            animation: scan-line 2s linear infinite;
        `;
        
        element.appendChild(scanLine);
        element.hologramScanLine = scanLine;
    }

    stopHologramEffect(element) {
        if (element && element.hologramScanLine) {
            element.hologramScanLine.remove();
            element.hologramScanLine = null;
        }
    }

    handleFormSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const submitButton = e.target.querySelector('button[type="submit"]');
        
        // Simulate form submission
        submitButton.textContent = 'TRANSMITTING...';
        submitButton.disabled = true;
        
        // Add glitch effect to form
        const formInputs = e.target.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.style.borderColor = '#FFD700';
            input.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
        });
        
        setTimeout(() => {
            // Success animation
            submitButton.textContent = 'TRANSMISSION COMPLETE';
            submitButton.style.background = '#00FFFF';
            submitButton.style.color = '#000000';
            
            // Reset form
            setTimeout(() => {
                e.target.reset();
                submitButton.textContent = 'TRANSMIT DATA';
                submitButton.disabled = false;
                submitButton.style.background = '';
                submitButton.style.color = '';
                
                formInputs.forEach(input => {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                });
            }, 2000);
        }, 2000);
    }

    handleResize() {
        // Update particle positions
        this.particles.forEach(particle => {
            if (particle.x > window.innerWidth) particle.x = window.innerWidth;
            if (particle.y > window.innerHeight) particle.y = window.innerHeight;
        });
    }

    handleKeyboardNavigation(e) {
        // Arrow key navigation between sections
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            
            const sectionIds = ['home', 'about', 'skills', 'projects', 'contact'];
            const currentIndex = sectionIds.indexOf(this.currentSection);
            
            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % sectionIds.length;
            } else {
                nextIndex = (currentIndex - 1 + sectionIds.length) % sectionIds.length;
            }
            
            this.navigateToSection(sectionIds[nextIndex]);
        }
        
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            this.navMenu.classList.remove('active');
            this.navToggle.classList.remove('active');
        }
    }

    updateSystemTime() {
        const systemTime = document.getElementById('systemTime');
        
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            
            if (systemTime) {
                systemTime.textContent = `SYSTEM TIME: ${timeString}`;
            }
        };
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    startAnimations() {
        // Add CSS animations dynamically
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes particle-float {
                0% {
                    transform: translateY(0px) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-50px) scale(0);
                    opacity: 0;
                }
            }
            
            @keyframes ripple-effect {
                0% {
                    transform: scale(1);
                    opacity: 1;
                }
                100% {
                    transform: scale(20);
                    opacity: 0;
                }
            }
            
            @keyframes scan-line {
                0% {
                    transform: translateY(0);
                }
                100% {
                    transform: translateY(200px);
                }
            }
            
            .revealed {
                animation: section-reveal 0.8s ease-out;
            }
            
            @keyframes section-reveal {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        
        document.head.appendChild(styleSheet);
    }
}

// Enhanced scroll effects and interactions
class EnhancedEffects {
    constructor() {
        this.setupAdvancedEffects();
    }

    setupAdvancedEffects() {
        this.createMatrixRain();
        this.setupDataStreamEffects();
        this.initializeGlitchEffects();
    }

    createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#FFD700';
            ctx.font = `${fontSize}px monospace`;
            
            drops.forEach((drop, index) => {
                const char = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(char, index * fontSize, drop * fontSize);
                
                if (drop * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[index] = 0;
                }
                drops[index]++;
            });
        };
        
        setInterval(draw, 50);
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    setupDataStreamEffects() {
        const dataStream = document.createElement('div');
        dataStream.style.cssText = `
            position: fixed;
            top: 0;
            right: 20px;
            width: 200px;
            height: 100vh;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        document.body.appendChild(dataStream);
        
        const createDataLine = () => {
            const line = document.createElement('div');
            const dataTypes = ['NEURAL_LINK', 'CYBER_WARE', 'DATA_STREAM', 'NET_RUNNER', 'NIGHT_CITY'];
            const randomData = dataTypes[Math.floor(Math.random() * dataTypes.length)];
            
            line.textContent = `${randomData}_${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`;
            line.style.cssText = `
                position: absolute;
                right: 0;
                color: #00FFFF;
                font-family: 'Orbitron', monospace;
                font-size: 10px;
                opacity: 0.3;
                white-space: nowrap;
                transform: translateY(-20px);
                animation: data-flow 3s linear infinite;
            `;
            
            dataStream.appendChild(line);
            
            setTimeout(() => {
                line.remove();
            }, 3000);
        };
        
        setInterval(createDataLine, 500);
        
        // Add CSS for data flow animation
        const dataStyles = document.createElement('style');
        dataStyles.textContent = `
            @keyframes data-flow {
                0% {
                    transform: translateY(-20px);
                    opacity: 0;
                }
                10% {
                    opacity: 0.3;
                }
                90% {
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(100vh);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(dataStyles);
    }

    initializeGlitchEffects() {
        const elements = document.querySelectorAll('.section-title, .hero-title .title-main');
        
        elements.forEach(element => {
            setInterval(() => {
                if (Math.random() < 0.1) {
                    this.createGlitchEffect(element);
                }
            }, 5000);
        });
    }

    createGlitchEffect(element) {
        const original = {
            transform: element.style.transform,
            textShadow: element.style.textShadow,
            color: element.style.color
        };
        
        const glitchFrames = [
            {
                transform: 'translate(-2px, 0)',
                textShadow: '2px 0 #FF073A, -2px 0 #00FFFF',
                color: '#FFD700'
            },
            {
                transform: 'translate(2px, 0)',
                textShadow: '-2px 0 #FF073A, 2px 0 #00FFFF',
                color: '#FF00FF'
            },
            {
                transform: 'translate(-1px, 0)',
                textShadow: '1px 0 #FF073A, -1px 0 #00FFFF',
                color: '#00FFFF'
            }
        ];
        
        let frameIndex = 0;
        const glitchInterval = setInterval(() => {
            const frame = glitchFrames[frameIndex];
            Object.assign(element.style, frame);
            
            frameIndex++;
            if (frameIndex >= glitchFrames.length) {
                clearInterval(glitchInterval);
                Object.assign(element.style, original);
            }
        }, 50);
    }
}

// Add scroll function for hero buttons
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CyberpunkPortfolio();
    new EnhancedEffects();
    
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class after portfolio initialization
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 4000);
});

// Performance optimization
window.addEventListener('load', () => {
    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[src]');
    criticalImages.forEach(img => {
        const preloadImg = new Image();
        preloadImg.src = img.src;
    });
    
    // Initialize lazy loading for non-critical elements
    if ('IntersectionObserver' in window) {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('lazy-loaded');
                    lazyObserver.unobserve(element);
                }
            });
        });
        
        lazyElements.forEach(element => lazyObserver.observe(element));
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CyberpunkPortfolio, EnhancedEffects };
}
