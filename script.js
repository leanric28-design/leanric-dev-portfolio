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
/* =========================================================
   LEANRIC DEV PORTFOLIO
   REAL-TIME GALAXY BACKGROUND
========================================================= */

(() => {

  const canvas =
    document.getElementById("galaxyCanvas");

  if (!canvas) return;

  const ctx =
    canvas.getContext("2d");

  let width = 0;
  let height = 0;

  let devicePixelRatio =
    Math.min(window.devicePixelRatio || 1, 2);


  /* =====================================================
     CONFIG
  ===================================================== */

  const CONFIG = {

    stars: 2200,

    starSpeed: 0.015,

    orbitSpeed: 0.00018,

    planetScale: 1,

    mouseInfluence: 0.035,

    galaxyRotation: 0.00008

  };


  /* =====================================================
     STATE
  ===================================================== */

  let stars = [];

  let mouse = {
    x: 0,
    y: 0
  };

  let smoothMouse = {
    x: 0,
    y: 0
  };


  let systemRotation = 0;


  /* =====================================================
     PLANETS
  ===================================================== */

  const planets = [

    {
      name: "Mercury",
      orbit: 80,
      radius: 2.2,
      speed: 0.020,
      color: "#b7c0bd"
    },

    {
      name: "Venus",
      orbit: 115,
      radius: 3.3,
      speed: 0.015,
      color: "#e6c27a"
    },

    {
      name: "Earth",
      orbit: 155,
      radius: 3.7,
      speed: 0.010,
      color: "#55b7ff"
    },

    {
      name: "Mars",
      orbit: 195,
      radius: 3,
      speed: 0.008,
      color: "#ff725c"
    },

    {
      name: "Jupiter",
      orbit: 245,
      radius: 7,
      speed: 0.004,
      color: "#d9b58c"
    },

    {
      name: "Saturn",
      orbit: 300,
      radius: 6,
      speed: 0.003,
      color: "#e3cf91"
    },

    {
      name: "Uranus",
      orbit: 355,
      radius: 4.5,
      speed: 0.002,
      color: "#7edce8"
    },

    {
      name: "Neptune",
      orbit: 410,
      radius: 4.4,
      speed: 0.0016,
      color: "#5279ff"
    }

  ];


  /* =====================================================
     RESIZE
  ===================================================== */

  function resize() {

    width =
      window.innerWidth;

    height =
      window.innerHeight;

    devicePixelRatio =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    canvas.width =
      width * devicePixelRatio;

    canvas.height =
      height * devicePixelRatio;

    canvas.style.width =
      width + "px";

    canvas.style.height =
      height + "px";

    ctx.setTransform(
      devicePixelRatio,
      0,
      0,
      devicePixelRatio,
      0,
      0
    );

  }


  window.addEventListener(
    "resize",
    resize
  );

  resize();


  /* =====================================================
     CREATE STARS
  ===================================================== */

  function createStars() {

    stars = [];

    for (
      let i = 0;
      i < CONFIG.stars;
      i++
    ) {

      stars.push({

        x:
          Math.random() *
          width,

        y:
          Math.random() *
          height,

        size:
          Math.random() *
          1.5 + 0.2,

        alpha:
          Math.random() *
          0.8 + 0.1,

        speed:
          Math.random() *
          CONFIG.starSpeed,

        twinkle:
          Math.random() *
          Math.PI * 2,

        color:
          Math.random() > 0.9
            ? "#00ff9d"
            : "#ffffff"

      });

    }

  }


  createStars();


  /* =====================================================
     MOUSE
  ===================================================== */

  window.addEventListener(
    "pointermove",
    (event) => {

      mouse.x =
        event.clientX -
        width / 2;

      mouse.y =
        event.clientY -
        height / 2;

    }
  );


  /* =====================================================
     STAR FIELD
  ===================================================== */

  function drawStars(time) {

    stars.forEach(
      (star) => {

        star.twinkle +=
          0.01;

        star.y -=
          star.speed;

        if (
          star.y < -10
        ) {

          star.y =
            height + 10;

          star.x =
            Math.random() *
            width;

        }


        const twinkle =
          0.55 +
          Math.sin(
            star.twinkle
          ) *
          0.25;


        ctx.globalAlpha =
          star.alpha *
          twinkle;


        ctx.fillStyle =
          star.color;


        ctx.beginPath();

        ctx.arc(
          star.x,
          star.y,
          star.size,
          0,
          Math.PI * 2
        );

        ctx.fill();

      }
    );

    ctx.globalAlpha = 1;

  }


  /* =====================================================
     GALAXY DUST
  ===================================================== */

  function drawGalaxyDust(time) {

    const centerX =
      width / 2 +
      smoothMouse.x * 0.02;

    const centerY =
      height / 2 +
      smoothMouse.y * 0.02;


    for (
      let i = 0;
      i < 220;
      i++
    ) {

      const angle =
        i * 0.47 +
        time * 0.00002;

      const radius =
        150 +
        (i % 20) * 12;


      const x =
        centerX +
        Math.cos(angle) *
          radius;

      const y =
        centerY +
        Math.sin(angle) *
          radius *
          0.42;


      ctx.fillStyle =
        "rgba(0,255,157,0.045)";


      ctx.fillRect(
        x,
        y,
        1,
        1
      );

    }

  }


  /* =====================================================
     ORBIT SYSTEM
  ===================================================== */

  function drawOrbits() {

    const centerX =
      width / 2 +
      smoothMouse.x *
        CONFIG.mouseInfluence;

    const centerY =
      height / 2 +
      smoothMouse.y *
        CONFIG.mouseInfluence;


    planets.forEach(
      (planet, index) => {

        ctx.save();


        const orbitTilt =
          0.38 +
          index * 0.018;


        ctx.translate(
          centerX,
          centerY
        );


        ctx.rotate(
          systemRotation *
          0.25 +
          index * 0.08
        );


        ctx.scale(
          1,
          orbitTilt
        );


        ctx.beginPath();


        ctx.arc(
          0,
          0,
          planet.orbit,
          0,
          Math.PI * 2
        );


        ctx.strokeStyle =
          "rgba(0,255,157,0.11)";


        ctx.lineWidth =
          0.7;


        ctx.stroke();


        ctx.restore();

      }
    );

  }


  /* =====================================================
     SUN
  ===================================================== */

  function drawSun(time) {

    const centerX =
      width / 2 +
      smoothMouse.x *
      CONFIG.mouseInfluence;

    const centerY =
      height / 2 +
      smoothMouse.y *
      CONFIG.mouseInfluence;


    const pulse =
      1 +
      Math.sin(
        time * 0.002
      ) * 0.05;


    /* Outer glow */

    const glow =
      ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        75
      );


    glow.addColorStop(
      0,
      "rgba(0,255,157,0.28)"
    );

    glow.addColorStop(
      0.35,
      "rgba(0,255,157,0.09)"
    );

    glow.addColorStop(
      1,
      "rgba(0,255,157,0)"
    );


    ctx.fillStyle =
      glow;


    ctx.beginPath();

    ctx.arc(
      centerX,
      centerY,
      75 * pulse,
      0,
      Math.PI * 2
    );

    ctx.fill();


    /* Sun */

    const sun =
      ctx.createRadialGradient(
        centerX - 4,
        centerY - 4,
        1,
        centerX,
        centerY,
        25
      );


    sun.addColorStop(
      0,
      "#eafff5"
    );

    sun.addColorStop(
      0.25,
      "#00ffb0"
    );

    sun.addColorStop(
      1,
      "#00a86b"
    );


    ctx.fillStyle =
      sun;


    ctx.beginPath();

    ctx.arc(
      centerX,
      centerY,
      15 * pulse,
      0,
      Math.PI * 2
    );

    ctx.fill();

  }


  /* =====================================================
     PLANETS
  ===================================================== */

  function drawPlanets(time) {

    const centerX =
      width / 2 +
      smoothMouse.x *
      CONFIG.mouseInfluence;

    const centerY =
      height / 2 +
      smoothMouse.y *
      CONFIG.mouseInfluence;


    planets.forEach(
      (planet, index) => {

        const angle =
          time *
          planet.speed *
          0.001 +
          index *
          0.8;


        const x =
          centerX +
          Math.cos(angle) *
          planet.orbit;


        const y =
          centerY +
          Math.sin(angle) *
          planet.orbit *
          0.38;


        /* Glow */

        const gradient =
          ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            planet.radius * 4
          );


        gradient.addColorStop(
          0,
          planet.color
        );

        gradient.addColorStop(
          1,
          "rgba(0,0,0,0)"
        );


        ctx.fillStyle =
          gradient;


        ctx.globalAlpha =
          0.25;


        ctx.beginPath();

        ctx.arc(
          x,
          y,
          planet.radius * 4,
          0,
          Math.PI * 2
        );

        ctx.fill();


        ctx.globalAlpha =
          1;


        /* Planet */

        ctx.fillStyle =
          planet.color;


        ctx.beginPath();

        ctx.arc(
          x,
          y,
          planet.radius,
          0,
          Math.PI * 2
        );

        ctx.fill();


        /* Saturn ring */

        if (
          planet.name ===
          "Saturn"
        ) {

          ctx.save();

          ctx.translate(
            x,
            y
          );

          ctx.scale(
            1,
            0.35
          );


          ctx.strokeStyle =
            "rgba(255,230,160,0.7)";


          ctx.lineWidth =
            1.2;


          ctx.beginPath();

          ctx.arc(
            0,
            0,
            planet.radius * 1.9,
            0,
            Math.PI * 2
          );

          ctx.stroke();

          ctx.restore();

        }

      }
    );

  }


  /* =====================================================
     ORBITAL CONNECTIONS
  ===================================================== */

  function drawOrbitalNetwork(time) {

    const centerX =
      width / 2 +
      smoothMouse.x *
      CONFIG.mouseInfluence;

    const centerY =
      height / 2 +
      smoothMouse.y *
      CONFIG.mouseInfluence;


    ctx.save();

    ctx.translate(
      centerX,
      centerY
    );


    ctx.rotate(
      time *
      CONFIG.galaxyRotation
    );


    ctx.strokeStyle =
      "rgba(0,255,157,0.035)";

    ctx.lineWidth =
      0.5;


    for (
      let i = 0;
      i < 18;
      i++
    ) {

      const radius =
        100 +
        i * 22;


      ctx.beginPath();


      for (
        let j = 0;
        j <= 80;
        j++
      ) {

        const angle =
          (j / 80) *
          Math.PI *
          2;


        const distortion =
          Math.sin(
            angle * 3 +
            i
          ) *
          4;


        const x =
          Math.cos(angle) *
          (radius + distortion);


        const y =
          Math.sin(angle) *
          (radius + distortion) *
          0.42;


        if (j === 0) {

          ctx.moveTo(
            x,
            y
          );

        } else {

          ctx.lineTo(
            x,
            y
          );

        }

      }


      ctx.stroke();

    }


    ctx.restore();

  }


  /* =====================================================
     ANIMATION
  ===================================================== */

  function animate(time) {

    /* Clear */

    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    /* Smooth mouse */

    smoothMouse.x +=
      (
        mouse.x -
        smoothMouse.x
      ) * 0.025;


    smoothMouse.y +=
      (
        mouse.y -
        smoothMouse.y
      ) * 0.025;


    systemRotation +=
      CONFIG.galaxyRotation;


    /* Render */

    drawStars(time);

    drawGalaxyDust(time);

    drawOrbitalNetwork(time);

    drawOrbits();

    drawSun(time);

    drawPlanets(time);


    requestAnimationFrame(
      animate
    );

  }


  requestAnimationFrame(
    animate
  );


  /* =====================================================
     LIVE PHT CLOCK
  ===================================================== */

  const galaxyTime =
    document.getElementById(
      "galaxyTime"
    );


  function updateGalaxyTime() {

    if (!galaxyTime) return;


    const now =
      new Date();


    const formatter =
      new Intl.DateTimeFormat(
        "en-PH",
        {
          timeZone:
            "Asia/Manila",

          hour:
            "2-digit",

          minute:
            "2-digit",

          second:
            "2-digit",

          hour12:
            false
        }
      );


    galaxyTime.textContent =
      formatter.format(now) +
      " PHT";

  }


  updateGalaxyTime();


  setInterval(
    updateGalaxyTime,
    1000
  );


})();
