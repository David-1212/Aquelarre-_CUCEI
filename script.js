// ============================================
// AQUELARRE CUCEI 2026 - Main Script
// ============================================

(function() {
    'use strict';

// ===== LOGO EN EL HERO =====
    function initLogo3D() {
        const fallback = document.getElementById('logo3d-fallback');
        if (!fallback) return;
        fallback.style.display = 'block';
    }

// ===== BACKGROUND PARTICLES =====
    function initParticles() {
        const container = document.getElementById('particles-container');
        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 20;
            const hueRoll = Math.random();
            const hue = hueRoll < 0.4 ? '278' : (hueRoll < 0.7 ? '160' : '42');

            particle.style.cssText = `
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                background: hsl(${hue}, 70%, 60%);
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
                box-shadow: 0 0 ${size * 3}px hsl(${hue}, 70%, 60%);
            `;
            container.appendChild(particle);
        }
    }

    // ===== CURSOR GLOW =====
    function initCursorGlow() {
        const glow = document.createElement('div');
        glow.classList.add('cursor-glow');
        document.body.appendChild(glow);

        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateGlow() {
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;
            glow.style.left = glowX + 'px';
            glow.style.top = glowY + 'px';
            requestAnimationFrame(updateGlow);
        }
        updateGlow();
    }

// ===== SCROLL REVEAL =====
    function initScrollReveal() {
        const elements = [
            '.stat', '.register-info', '.reserve-panel', '.reserve-step',
            '.representation-card', '.about-intro', '.gallery-item',
            '.conv-card', '.social-card', '.royal-card', '.day-col', '.element-mini'
        ];
        const revealElements = document.querySelectorAll(elements.join(','));
        revealElements.forEach(el => el.classList.add('reveal'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    entry.target.style.transitionDelay = delay + 'ms';
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    }

    // ===== STAGGER DELAY FOR CARDS =====
    function initStagger() {
        document.querySelectorAll('.reserve-steps').forEach(grid => {
            Array.from(grid.children).forEach((child, i) => {
                child.dataset.delay = i * 150;
            });
        });
        document.querySelectorAll('.gallery-grid').forEach(grid => {
            Array.from(grid.children).forEach((child, i) => {
                child.dataset.delay = (i % 3) * 100;
            });
        });
        document.querySelectorAll('.conv-grid, .social-grid').forEach(grid => {
            Array.from(grid.children).forEach((child, i) => {
                child.dataset.delay = (i % 3) * 100;
            });
        });
    }

    // ===== COUNTDOWN =====
    function initCountdown() {
        const target = new Date('2026-10-29T20:00:00').getTime();
        const daysEl = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minsEl = document.getElementById('cd-mins');
        const secsEl = document.getElementById('cd-secs');
        if (!daysEl) return;

        function tick() {
            const now = Date.now();
            const diff = Math.max(0, target - now);
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            daysEl.textContent = d;
            hoursEl.textContent = h;
            minsEl.textContent = m;
            secsEl.textContent = s;
        }

        tick();
        setInterval(tick, 1000);
    }

    // ===== COUNTER ANIMATION =====
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 60;
        const duration = 2000;
        const stepTime = duration / 60;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, stepTime);
    }

    // ===== NAVBAR SCROLL EFFECT =====
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(20, 30, 56, 0.95)';
                navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.background = 'rgba(20, 30, 56, 0.85)';
                navbar.style.boxShadow = 'none';
            }
            lastScroll = currentScroll;
        });
    }

// ===== TYPEWRITER EFFECT =====
    function initTypewriter() {
        const el = document.getElementById('typewriter');
        if (!el) return;
        const text = el.textContent.trim();
        el.textContent = '';
        el.classList.add('typing');
        let i = 0;
        function type() {
            if (i <= text.length) {
                el.textContent = text.slice(0, i);
                i++;
                setTimeout(type, 55 + Math.random() * 40);
            }
        }
        setTimeout(type, 400);
    }

    // ===== 3D TILT EFFECT =====
    function initTilt() {
        const cards = document.querySelectorAll('.representation-card, .gallery-item');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ===== ALCHEMICAL WHEEL (elements) =====
    function initAlchemyWheel() {
        const medallions = document.querySelectorAll('.medallion');
        const title = document.getElementById('ring-title');
        const sub = document.getElementById('ring-sub');
        const desc = document.getElementById('ring-desc');
        const rune = document.getElementById('ring-rune');
        if (!medallions.length || !title) return;

        const runes = {
            fire: '&#x2623;',
            air: '&#x2641;',
            water: '&#x2651;',
            earth: '&#x2642;'
        };

        medallions.forEach(med => {
            med.addEventListener('mouseenter', () => {
                activateMedallion(med);
            });
            med.addEventListener('click', () => {
                activateMedallion(med);
            });
        });

        function activateMedallion(med) {
            medallions.forEach(m => m.classList.remove('active'));
            med.classList.add('active');
            title.textContent = med.dataset.title;
            sub.textContent = med.dataset.sub;
            desc.textContent = med.dataset.desc;
            rune.innerHTML = runes[med.dataset.hue] || '&#x2623;';
            title.style.color = getHueColor(med.dataset.hue);
        }

        function getHueColor(hue) {
            const map = { fire: '#d0781f', air: '#7ab8e8', water: '#4d9fd6', earth: '#8a9a4c' };
            return map[hue] || '#BE97DF';
        }
    }

    // ===== SMOOTH ANCHOR SCROLL =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ===== BACKGROUND AUDIO =====
    function initBackgroundAudio() {
        const audio = document.getElementById('bg-audio');
        if (!audio) return;

        const toggle = document.getElementById('audio-toggle');
        const icon = toggle ? toggle.querySelector('.audio-toggle-icon') : null;

        audio.volume = 0.22;

        function setState(on) {
            audio.volume = on ? 0.22 : 0;
            if (toggle) {
                toggle.classList.toggle('muted', !on);
                toggle.setAttribute('aria-label', on ? 'Silenciar sonido' : 'Activar sonido');
                toggle.title = on ? 'Silenciar sonido' : 'Activar sonido';
                if (icon) icon.innerHTML = on ? '&#x1F50A;' : '&#x1F507;';
            }
        }

        function tryPlay() {
            if (!audio.paused) return;
            const p = audio.play();
            if (p !== undefined) {
                p.then(() => setState(true)).catch(() => setState(false));
            }
        }

        function toggleAudio() {
            if (audio.muted || audio.volume === 0) {
                audio.muted = false;
                setState(true);
                tryPlay();
            } else {
                audio.muted = true;
                setState(false);
            }
        }

        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleAudio();
            });
        }

        // First attempt (works if user gesture already happened)
        tryPlay();

        // Retry on any real user gesture (browsers unlock media autoplay on interaction)
        const unlockEvents = ['pointerdown', 'touchstart', 'click', 'keydown'];
        const unlock = () => {
            if (audio.muted) return;
            tryPlay();
            if (!audio.paused) {
                unlockEvents.forEach(ev => document.removeEventListener(ev, unlock));
            }
        };
        unlockEvents.forEach(ev => document.addEventListener(ev, unlock));

        // Clean loop end (mp3 is ~10s)
        audio.addEventListener('timeupdate', () => {
            if (audio.currentTime > 9.5) {
                audio.currentTime = 0;
            }
        });
    }

// ===== TARJETITA REALES (modal) =====
        function initRoyalModal() {
            const cards = document.querySelectorAll('.royal-card');
            if (!cards.length) return;

            const modal = document.getElementById('royal-modal');
            if (!modal) return;

            const nombre = modal.querySelector('.royal-modal-name');
            const tag = modal.querySelector('.royal-modal-tag');
            const elemento = modal.querySelector('.royal-modal-element');
            const info = modal.querySelector('.royal-modal-info');
            const foto = modal.querySelector('.royal-modal-photo img');
            const closeBtn = modal.querySelector('.royal-modal-close');

            const infoTexto = (nombreReal) => {
                return '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur viverra vestibulum lectus, a tempus nulla feugiat ac. Nunc sed magna ac dolor lacinia.</p>' +
                       '<p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>';
            };

            cards.forEach(card => {
                card.addEventListener('click', () => {
                    nombre.textContent = card.dataset.nombre || 'Real Anónimo';
                    tag.textContent = card.dataset.titulo || 'REAL';
                    elemento.textContent = (card.dataset.elemento || '').toUpperCase() + ' · ' + {
                        fuego: 'Transformación',
                        aire: 'Conocimiento',
                        agua: 'Vida',
                        tierra: 'Materia'
                    }[card.dataset.elemento] || '';
                    foto.src = card.dataset.foto || 'assets/royals/cassiopeia-finch.svg';
                    info.innerHTML = infoTexto();
                    modal.classList.add('open');
                    document.body.style.overflow = 'hidden';
                });
            });

            const cerrar = () => {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            };

            closeBtn.addEventListener('click', cerrar);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) cerrar();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('open')) cerrar();
            });
        }

// ===== INIT ALL =====
    document.addEventListener('DOMContentLoaded', () => {
        initLogo3D();
        initParticles();
        initCursorGlow();
        initScrollReveal();
        initStagger();
        initCounters();
        initCountdown();
        initNavbar();
        initTypewriter();
        initTilt();
        initAlchemyWheel();
        initRoyalModal();
        initSmoothScroll();
        initBackgroundAudio();
    });

})();

