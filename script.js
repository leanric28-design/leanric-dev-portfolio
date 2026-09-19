const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const backToTop = document.getElementById("backToTop");

// Mobile navigation
if (menuToggle && navLinks) {
menuToggle.addEventListener("click", () => {
navLinks.classList.toggle("active");

```
const isOpen = navLinks.classList.contains("active");

menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
menuToggle.textContent = isOpen ? "✕" : "☰";
```

});

navLinks.querySelectorAll("a").forEach((link) => {
link.addEventListener("click", () => {
navLinks.classList.remove("active");
menuToggle.textContent = "☰";
menuToggle.setAttribute("aria-label", "Open navigation");
});
});
}

// Back to top button
window.addEventListener("scroll", () => {
if (!backToTop) return;

if (window.scrollY > 500) {
backToTop.classList.add("show");
} else {
backToTop.classList.remove("show");
}
});

if (backToTop) {
backToTop.addEventListener("click", () => {
window.scrollTo({
top: 0,
behavior: "smooth"
});
});
}

// Reveal animation
const revealElements = document.querySelectorAll(
".section-heading, .about-text, .about-terminal, .skill-card, .project-card, .service-card, .timeline-item, .contact-box"
);

const revealObserver = new IntersectionObserver(
(entries, observer) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add("revealed");
observer.unobserve(entry.target);
}
});
},
{
threshold: 0.12
}
);

revealElements.forEach((element) => {
element.classList.add("reveal");
revealObserver.observe(element);
});

// Active navigation section
const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        navigationLinks.forEach((link) => {

          link.classList.remove("active-link");

          if (
            link.getAttribute("href") ===
            `#${entry.target.id}`
          ) {
            link.classList.add("active-link");
          }

        });

      }

    });
  },
  {
    rootMargin: "-35% 0px -55% 0px"
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Dynamic year
const currentYear = document.querySelector(".footer-bottom span");

if (currentYear) {
currentYear.textContent =
`© ${new Date().getFullYear()} Leanric Dasigan. All rights reserved.`;
}

// Simple typing effect
const heroRole = document.querySelector(".hero h2");

if (heroRole) {
const roles = [
"Junior Web Developer",
"Creative Digital Specialist",
"Full-Stack Developer in Progress",
"Digital Problem Solver"
];

let roleIndex = 0;
let characterIndex = roles[0].length;
let deleting = false;

const cursor = '<span class="typing-cursor">|</span>';

function typeRole() {
const currentRole = roles[roleIndex];

```
if (!deleting) {
  characterIndex++;

  if (characterIndex >= currentRole.length) {
    deleting = true;
    setTimeout(typeRole, 2500);
    heroRole.innerHTML = currentRole + " " + cursor;
    return;
  }
} else {
  characterIndex--;

  if (characterIndex <= 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    characterIndex = 0;
  }
}

heroRole.innerHTML =
  currentRole.substring(0, characterIndex) + " " + cursor;

setTimeout(typeRole, deleting ? 60 : 100);
```

}

setTimeout(() => {
deleting = true;
typeRole();
}, 1800);
}

// Small mouse movement effect for hero code window
const codeWindow = document.querySelector(".code-window");

if (
  codeWindow &&
  window.matchMedia("(min-width: 900px)").matches
) {

  document.addEventListener("mousemove", (event) => {

    const x =
      (window.innerWidth / 2 - event.clientX) / 90;

    const y =
      (window.innerHeight / 2 - event.clientY) / 90;

    codeWindow.style.transform =
      `perspective(1000px) rotateY(${x - 4}deg) rotateX(${y + 2}deg)`;

  });

}


// Prevent empty project links from jumping to the top
document
  .querySelectorAll('.project-link[href="#"]')
  .forEach((link) => {

    link.addEventListener("click", (event) => {

      event.preventDefault();

      alert("Project demo coming soon.");

    });

  });


// Portfolio loaded
console.log("Leanric Dev Portfolio V5 loaded successfully.");
