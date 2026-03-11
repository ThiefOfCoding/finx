const card = document.getElementById("profileCard");
const particlesContainer = document.getElementById("particles");
const magnetics = document.querySelectorAll(".magnetic");
const loaderScreen = document.getElementById("loaderScreen");
const loaderFill = document.getElementById("loaderFill");
const introFlash = document.getElementById("introFlash");
const mainReveal = document.getElementById("mainReveal");

const cursorDot = document.getElementById("cursorDot");
const cursorRing = document.getElementById("cursorRing");
const hoverTargets = document.querySelectorAll("a, button, .cursor-hover, iframe");

/* -----------------------------
   Disable right click / drag
------------------------------ */
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

document.addEventListener("dragstart", (e) => {
  e.preventDefault();
});

document.addEventListener("selectstart", (e) => {
  e.preventDefault();
});

/* -----------------------------
   Loading screen + intro
------------------------------ */
let progress = 0;
const loadingInterval = setInterval(() => {
  progress += Math.random() * 18;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadingInterval);

    setTimeout(() => {
      loaderScreen.classList.add("hide");
      introFlash.classList.add("show");
      mainReveal.classList.add("show");
    }, 250);
  }

  loaderFill.style.width = `${progress}%`;
}, 120);

/* -----------------------------
   3D tilt for main card
------------------------------ */
card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateY = ((x - centerX) / centerX) * 5;
  const rotateX = ((centerY - y) / centerY) * 5;

  card.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave", () => {
  card.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
});

/* -----------------------------
   Magnetic hover effect
------------------------------ */
magnetics.forEach((item) => {
  const strength = Number(item.dataset.strength || 12);

  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const moveX = ((relX - rect.width / 2) / rect.width) * strength;
    const moveY = ((relY - rect.height / 2) / rect.height) * strength;

    item.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translate(0px, 0px)";
  });
});

/* -----------------------------
   Ambient particles
------------------------------ */
function createParticle() {
  const particle = document.createElement("span");
  particle.className = "particle";

  const size = Math.random() * 4 + 2;
  const startX = Math.random() * window.innerWidth;
  const duration = Math.random() * 12 + 10;
  const delay = Math.random() * 5;

  const colors = [
    "rgba(255,255,255,0.75)",
    "rgba(31,224,255,0.65)",
    "rgba(255,66,198,0.55)",
    "rgba(255,212,0,0.45)"
  ];

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${startX}px`;
  particle.style.bottom = `-20px`;
  particle.style.background = colors[Math.floor(Math.random() * colors.length)];
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `${delay}s`;

  particlesContainer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, (duration + delay) * 1000);
}

for (let i = 0; i < 28; i++) {
  setTimeout(createParticle, i * 250);
}

setInterval(createParticle, 650);

/* -----------------------------
   Custom cursor
------------------------------ */
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

hoverTargets.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorRing.classList.add("active");
  });

  el.addEventListener("mouseleave", () => {
    cursorRing.classList.remove("active");
  });
});

/* -----------------------------
   Prevent some image saving shortcuts
------------------------------ */
document.addEventListener("keydown", (e) => {
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && e.key.toUpperCase() === "U") ||
    (e.ctrlKey && e.key.toUpperCase() === "S")
  ) {
    e.preventDefault();
  }
});
