
/* =========================
   RUANG ATELIER — INTERACTIONS
========================= */

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

function closeMenu() {
  if (!menuToggle || !mainNav) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu");
  mainNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Buka menu" : "Tutup menu"
    );

    mainNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) closeMenu();
  });
}

// Reveal sections as they enter the viewport
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

// Automatically update the footer year
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Demo contact form: prepare an email, no server required
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);

    const name = formData.get("name");
    const email = formData.get("email");
    const projectType = formData.get("project-type");
    const message = formData.get("message");

    const subject = encodeURIComponent(
      `Project Inquiry — ${projectType}`
    );

    const body = encodeURIComponent(
      `Hello Ruang Atelier,\n\n` +
      `My name is ${name}.\n` +
      `Email: ${email}\n` +
      `Project type: ${projectType}\n\n` +
      `Project details:\n${message}\n\n` +
      `Looking forward to hearing from you.`
    );

    window.location.href =
      `mailto:hello@ruangatelier.com?subject=${subject}&body=${body}`;
  });
}
