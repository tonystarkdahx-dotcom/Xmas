 const curtain = document.getElementById('wipe-curtain');
const btn = document.getElementById('action-btn');
const canvas = document.getElementById('snow-canvas');
const starContainer = document.getElementById('star-container');
const ctx = canvas.getContext('2d');

let width, height, snowflakes = [];

// Snowman Data
let snowman = {
    el: null,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: 2.5,
    vy: 1.5
};

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createStars();
    createSnowflakes();
}

function createStars() {
    const existing = document.querySelectorAll('.star');
    existing.forEach(s => s.remove());
    const count = width < 600 ? 80 : 150;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
        star.style.animationDelay = `${Math.random() * 5}s`;
        starContainer.appendChild(star);
    }
}

function createSnowflakes() {
    snowflakes = [];
    const density = width < 600 ? 50 : 120;
    for (let i = 0; i < density; i++) {
        snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 0.5,
            wind: Math.random() * 1 - 0.5
        });
    }
}

function initSnowman() {
    const el = document.createElement('div');
    el.className = 'snowman';
    // Add Hat and Arms to the snowman element
    el.innerHTML = `
        <div class="hat"></div>
        <div class="arm left"></div>
        <div class="arm right"></div>
    `;
    starContainer.appendChild(el);
    snowman.el = el;
}

// MAIN ANIMATION LOOP (Merged Snow & Snowman)
function draw() {
    // 1. Clear Canvas
    ctx.clearRect(0, 0, width, height);
    
    // 2. Draw Snow
    ctx.fillStyle = "white";
    ctx.beginPath();
    snowflakes.forEach(f => {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        
        // Update Snow position
        f.y += f.speed;
        f.x += f.wind;
        if (f.y > height) f.y = -5;
        if (f.x > width) f.x = 0;
        if (f.x < 0) f.x = width;
    });
    ctx.fill();

    // 3. Update Snowman Position
    if (snowman.el) {
        snowman.x += snowman.vx;
        snowman.y += snowman.vy;

        if (snowman.x <= 0 || snowman.x >= width - 50) snowman.vx *= -1;
        if (snowman.y <= 20 || snowman.y >= height - 50) snowman.vy *= -1;

        snowman.el.style.left = `${snowman.x}px`;
        snowman.el.style.top = `${snowman.y}px`;
        snowman.el.style.transform = `rotate(${snowman.vx * 5}deg)`;
    }

    requestAnimationFrame(draw);
}

// Events
window.addEventListener('resize', () => {
    resize();
});

window.addEventListener('load', () => {
    resize();
    initSnowman();
    draw();

    // Curtain Wipe
    setTimeout(() => {
        curtain.style.transform = 'translateY(-100%)';
    }, 800);

    // Button Appearance
    setTimeout(() => {
        btn.style.opacity = '1';
    }, 3500);
});

function open_page() {
    window.location.href = "index2.html?autoplay=true";
}