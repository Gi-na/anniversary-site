/**
Author: Georgina Ayebiahwe
Program: Eric&Gina's Anniversary
Date: Feb 18, 2026.
 **/


// Surprise reveal + confetti + lightbox
const btn = document.getElementById("surpriseBtn");
const area = document.getElementById("surpriseArea");

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");

// Resize confetti canvas
function resizeCanvas(){
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Confetti logic
let confettiPieces = [];
let animating = false;

function random(min, max){
return Math.random() * (max - min) + min;
}

function createConfettiBurst(){
confettiPieces = [];
const colors = ["#ffd700", "#caa84a", "#ffffff", "#111111"];

for(let i = 0; i < 180; i++){
confettiPieces.push({
x: window.innerWidth / 2,
y: window.innerHeight / 3,
w: random(6, 14),
h: random(6, 14),
vx: random(-6, 6),
vy: random(-10, -2),
gravity: random(0.12, 0.22),
rot: random(0, Math.PI),
vr: random(-0.2, 0.2),
color: colors[Math.floor(Math.random() * colors.length)],
life: 0
});
}
}

function draw(){
if(!animating) return;

ctx.clearRect(0, 0, canvas.width, canvas.height);

confettiPieces.forEach(p => {
p.vy += p.gravity;
p.x += p.vx;
p.y += p.vy;
p.rot += p.vr;
p.life += 1;

ctx.save();
ctx.translate(p.x, p.y);
ctx.rotate(p.rot);
ctx.fillStyle = p.color;
ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
ctx.restore();
});

confettiPieces = confettiPieces.filter(p => p.life < 170 && p.y < canvas.height + 40);

if(confettiPieces.length > 0){
requestAnimationFrame(draw);
} else {
animating = false;
ctx.clearRect(0, 0, canvas.width, canvas.height);
}
}

// Surprise button click
btn.addEventListener("click", () => {
area.classList.remove("hidden");

createConfettiBurst();
animating = true;
draw();

setTimeout(() => {
area.scrollIntoView({ behavior: "smooth", block: "start" });
}, 250);
});

// Lightbox open
document.querySelectorAll(".clickable").forEach(img => {
img.addEventListener("click", () => {
lightboxImg.src = img.src;
lightbox.classList.remove("hidden");
});
});

// Lightbox close
closeLightbox.addEventListener("click", () => {
lightbox.classList.add("hidden");
lightboxImg.src = "";
});

lightbox.addEventListener("click", (e) => {
if(e.target === lightbox){
lightbox.classList.add("hidden");
lightboxImg.src = "";
}
});

//Background Music
const music = document.getElementById("BackgroundSound");
const videos = document.querySelectorAll("video");

/* Start music on first user interaction */
document.addEventListener("click", function startMusic() {
music.play().catch(() => {});
document.removeEventListener("click", startMusic);
});

/* Pause music when any video plays */
videos.forEach(video => {
video.addEventListener("play", () => {
music.pause();
});

video.addEventListener("pause", () => {
music.play();
});

video.addEventListener("ended", () => {
music.play();
});
});
