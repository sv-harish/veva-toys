// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

/* -------------------------------
   Scroll-triggered Section Animations
-------------------------------- */
gsap.utils.toArray("section").forEach((section, i) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    duration: fibonacciEase(i),
    ease: "power3.out",
  });
});

// Fibonacci-based delay easing
function fibonacciEase(index) {
  const fib = [0, 1];
  for (let i = 2; i <= index + 2; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return 0.3 + (fib[index + 1] % 6) * 0.1;
}

/* -------------------------------
   Parallax in Hero Section
-------------------------------- */
gsap.to(".hero-illustration img", {
  x: -100, // adjust the amount of movement
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top top",
    scrub: true
  },
  ease: "power2.out"
});



// gsap.to(".header-blob", {
//   scrollTrigger: {
//     trigger: ".hero-section",
//     start: "top top",
//     scrub: true
//   },
//   x: -40,
//   y: -50,
//   ease: "power1.out"
// });

/* -------------------------------
   3D Holographic Tilt Logic
-------------------------------- */
function fibEase(value) {
  const abs = Math.abs(value);
  const fib = [0, 1, 1, 2, 3, 5, 8, 13];
  const index = Math.min(Math.floor(abs), fib.length - 1);
  const eased = fib[index] / 13;
  return value < 0 ? -eased : eased;
}

document.querySelectorAll(".card-container").forEach((container) => {
  const card = container.querySelector(".card");

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const deltaX = (x - centerX) / 12;
    const deltaY = (y - centerY) / 12;

    // Apply limited fibonacci-style easing
    const rotateX = Math.max(Math.min(-deltaY * 0.8, 10), -10);
    const rotateY = Math.max(Math.min(deltaX * 0.8, 10), -10);

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  container.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});


// Fibonacci easing function (custom for smooth tilt)
function fibEase(input) {
  const absInput = Math.abs(input);
  const fib = [0, 1];
  for (let i = 2; i <= absInput + 2; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  const eased = input > 0
    ? Math.min(input, fib[input] / 10)
    : Math.max(input, -fib[-input] / 10);
  return eased;
}

/* -------------------------------
   Smooth Scroll for Anchor Links
-------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
// Fibonacci zoom on hover
document.querySelectorAll(".card-container").forEach((container) => {
  const fg = container.querySelector(".foreground-img");

  const fibScale = [1, 1.05, 1.08, 1.13, 1.21]; // Fibonacci-based steps

  container.addEventListener("mouseenter", () => {
    fg.style.transition = "transform 0.4s ease";
    fg.style.transform = "translateZ(100px) scale(" + fibScale[3] + ")";
  });

  container.addEventListener("mouseleave", () => {
    fg.style.transform = "translateZ(60px) scale(1)";
  });
});

// gsap.to(".hero-image img", {
//   scrollTrigger: {
//     trigger: ".hero-section",
//     start: "top top",
//     scrub: true
//   },
//   x: -60,
//   ease: "power2.out"
// });

/* -------------------------------
   Scroll-Triggered Cloud Mask Animation
-------------------------------- */
const mask = document.querySelector('.cloud-mask');
const container = document.querySelector('.cloud-mask-container');

gsap.to(container, {
  x: -200, // how far the cloud shape moves
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top top",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress.toFixed(3);
      // move the background in opposite direction
      mask.style.backgroundPositionX = `${progress * 200}px`;
    }
  }
});