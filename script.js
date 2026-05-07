document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Fade-in on Scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Make hero section visible immediately
    document.querySelector('.hero').classList.add('visible');


    // 2. Particle System for Canvas Background
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particlesArray = [];

    // Resize canvas
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    resizeCanvas();

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5; // Size between 0.5 and 2.5
            this.speedX = Math.random() * 1 - 0.5; // Speed X between -0.5 and 0.5
            this.speedY = Math.random() * 1 - 0.5; // Speed Y between -0.5 and 0.5
            
            // Random bright colorful particles for the bright theme
            const colors = ['rgba(250, 112, 154, 0.5)', 'rgba(79, 172, 254, 0.5)', 'rgba(255, 255, 255, 0.8)'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add a soft glow to particles
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        }
    }

    // Initialize particles
    function initParticles() {
        particlesArray = [];
        // Number of particles depends on screen size
        const numberOfParticles = Math.floor((width * height) / 15000);
        
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            // Connect particles that are close
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    // Opacity based on distance
                    const opacity = 1 - (distance / 100);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
});
