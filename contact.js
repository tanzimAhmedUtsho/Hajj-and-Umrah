// Tailwind Configuration for Contact Page
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        primaryDark: "#0a0a0a",
        cardDark: "#111111",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};

// Form Validation and Submission
document
  .getElementById("contact-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");

    let isValid = true;

    // Simple validation
    [name, email, phone, message].forEach((el) => {
      if (!el.value.trim()) {
        el.classList.add("border-red-500");
        isValid = false;
      } else {
        el.classList.remove("border-red-500");
      }
    });

    // Email check
    if (email.value && !email.value.includes("@")) {
      email.classList.add("border-red-500");
      isValid = false;
    }

    if (isValid) {
      showToast();
      this.reset();
    }
  });

function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.remove("translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
    toast.classList.remove("translate-y-0", "opacity-100");
  }, 4000);
}

// Navbar Scroll Effect
function initNavbar() {
  const nav = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("bg-black/95", "py-4", "shadow-2xl");
      nav.classList.remove("py-6", "bg-black/20");
    } else {
      nav.classList.remove("bg-black/95", "py-4", "shadow-2xl");
      nav.classList.add("py-6", "bg-black/20");
    }
  });
}

// Reveal Animation Logic
function observeReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  initNavbar();
  observeReveal();
});
