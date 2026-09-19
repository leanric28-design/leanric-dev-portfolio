/* =========================================
   LEANRIC.DEV INTERACTION ENGINE
========================================= */


/* CURSOR GLOW */

const cursorGlow =
    document.querySelector(".cursor-glow");


if (cursorGlow) {

    document.addEventListener(
        "mousemove",
        (event) => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        }
    );

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".section, .contact-section"
    );


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    (element) => {

        element.classList.add(
            "reveal"
        );

        revealObserver.observe(
            element
        );

    }
);


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const navigationLinks =
    document.querySelectorAll(
        ".navbar nav a"
    );


const pageSections =
    document.querySelectorAll(
        "section[id]"
    );


function updateNavigation() {

    let currentSection = "";


    pageSections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop - 180;


            if (
                window.scrollY >= sectionTop
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        }
    );


    navigationLinks.forEach(
        (link) => {

            link.classList.remove(
                "active"
            );


            const target =
                link.getAttribute(
                    "href"
                );


            if (
                target ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateNavigation
);


updateNavigation();


/* =========================================
   PROJECT CARD TILT
========================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth < 900
                ) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -2;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    2;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
`
╔══════════════════════════════════╗
║        LEANRIC.DEV               ║
║                                  ║
║   DIGITAL ARCHITECT              ║
║   FULL-STACK DEVELOPER           ║
║                                  ║
║   SYSTEM STATUS: ONLINE          ║
╚══════════════════════════════════╝
`
);