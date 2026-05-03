// Tailwind Configuration for Why Us Page
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

// Navbar Scroll Effect
function initNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add(
        "bg-black/95",
        "py-4",
        "shadow-2xl",
        "backdrop-blur-md",
      );
      nav.classList.remove("py-6", "bg-black/20");
    } else {
      nav.classList.remove(
        "bg-black/95",
        "py-4",
        "shadow-2xl",
        "backdrop-blur-md",
      );
      nav.classList.add("py-6", "bg-black/20");
    }
  });
}

// Intersection Observer for Reveal Animations
function observeReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  initNavbar();
  observeReveal();
});
