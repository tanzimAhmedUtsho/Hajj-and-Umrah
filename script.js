// Tailwind Configuration
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        primaryDark: "#0a0a0a",
        cardDark: "#161616",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};

// Initialize Lucide Icons
lucide.createIcons();

// Navbar Scroll Effect
const nav = document.getElementById("navbar");
if (nav) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add(
        "bg-black/95",
        "backdrop-blur-md",
        "py-4",
        "shadow-2xl",
      );
      nav.classList.remove("py-6");
    } else {
      nav.classList.remove(
        "bg-black/95",
        "backdrop-blur-md",
        "py-4",
        "shadow-2xl",
      );
      nav.classList.add("py-6");
    }
  });
}

// Mobile Menu Toggle (Basic)
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    alert("Menu feature can be expanded here!");
  });
}
