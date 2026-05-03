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

// Wishlist Helper Functions
const WISH_KEY = "alsafar_wishlist";
const getWishlist = () => JSON.parse(localStorage.getItem(WISH_KEY) || "[]");
const toggleStoredWishlist = (id, type) => {
  const itemKey = `${type}_${id}`;
  let list = getWishlist();
  if (list.includes(itemKey)) list = list.filter((i) => i !== itemKey);
  else list.push(itemKey);
  localStorage.setItem(WISH_KEY, JSON.stringify(list));
  return list.includes(itemKey);
};

// Package Data
const packages = [
  {
    id: 1,
    type: "umrah",
    name: "Umrah Standard",
    price: "$1,299",
    features: ["4-Star Hotel", "Visa & Insurance", "Local Transport"],
    highlight: false,
  },
  {
    id: 2,
    type: "hajj",
    name: "Royal Hajj Premium",
    price: "$8,500",
    features: [
      "5-Star Clock Tower",
      "Private VIP Vehicle",
      "Premium Mina Tents",
    ],
    highlight: true,
  },
  {
    id: 3,
    type: "umrah",
    name: "Umrah Luxury",
    price: "$2,800",
    features: ["5-Star Haram View", "Business Class", "Historical Tours"],
    highlight: false,
  },
];

// Render Packages
function renderPackages(containerId, filter = "all") {
  const container = document.getElementById(containerId);
  if (!container) return;

  const wishlist = getWishlist();
  let filtered;

  if (filter === "wishlist") {
    filtered = packages.filter((p) => wishlist.includes(`${p.type}_${p.id}`));
  } else {
    filtered =
      filter === "all" ? packages : packages.filter((p) => p.type === filter);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-20 text-center reveal active">
        <div class="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <i data-lucide="heart-off" class="text-gold w-10 h-10"></i>
        </div>
        <h3 class="text-xl font-bold mb-2">Wishlist is Empty</h3>
        <p class="text-gray-500">You haven't added any packages to your wishlist yet.</p>
      </div>
    `;
  } else {
    container.innerHTML = filtered
      .map(
        (pkg) => `
    <div class="package-card relative ${pkg.highlight ? "bg-primaryDark border-2 border-gold scale-105 shadow-2xl" : "bg-cardDark border border-white/5"} p-8 rounded-[2rem] transition-all duration-500 reveal">
      <button onclick="handleToggleWishlist(${pkg.id}, '${pkg.type}', this)" class="absolute top-5 right-5 p-2.5 bg-white/10 rounded-full hover:bg-gold/20 transition-all group/heart z-10">
        <i data-lucide="heart" class="w-4 h-4 ${wishlist.includes(`${pkg.type}_${pkg.id}`) ? "text-gold fill-gold" : "text-gray-400"} group-hover/heart:text-gold transition-colors"></i>
      </button>
      ${pkg.highlight ? '<div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black px-6 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">VIP Choice</div>' : ""}
      <h4 class="text-xl font-bold mb-2 pr-10 ${pkg.highlight ? "text-white" : ""}">${pkg.name}</h4>
      <div class="text-3xl font-bold text-gold mb-6">${pkg.price}</div>
      <ul class="space-y-4 mb-8 text-sm ${pkg.highlight ? "text-gray-300" : "text-gray-400"}">
        ${pkg.features
          .map(
            (f) => `
          <li class="flex items-center gap-3">
            <i data-lucide="${pkg.highlight ? "star" : "check"}" class="text-gold w-4 h-4"></i> ${f}
          </li>
        `,
          )
          .join("")}
      </ul>
      <button onclick="bookDirect(${pkg.id})" class="w-full py-4 rounded-2xl ${pkg.highlight ? "bg-gold text-black" : "border border-gold text-gold"} font-bold hover:bg-white hover:text-black transition-all">
        ${pkg.highlight ? "BOOK ROYAL JOURNEY" : "BOOK NOW"}
      </button>
    </div>
  `,
      )
      .join("");
  }

  lucide.createIcons();
  observeReveal();
}

function bookDirect(id) {
  const pkg = packages.find((p) => p.id === id);
  const modal = document.getElementById("booking-modal");
  const content = document.getElementById("booking-modal-content");

  content.innerHTML = `
    <div class="text-center py-8 reveal active">
      <div class="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-gold/5 animate-pulse">
        <i data-lucide="check-circle" class="text-gold w-12 h-12"></i>
      </div>
      <h2 class="text-4xl font-serif font-bold text-white mb-4">Request Sent</h2>
      <p class="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Spiritual Journey Awaits</p>
      <p class="text-gray-400 leading-relaxed mb-10 text-sm">
        Assalamu Alaikum! You have selected the <span class="text-gold font-bold">${pkg.name}</span>. 
        Our dedicated consultant, <strong>Tanzim Ahmed Utsho</strong>, will contact you personally within 24 hours to guide you through the next steps.
      </p>
      <div class="flex flex-col gap-4">
        <button onclick="closeBookingModal()" class="w-full bg-gold text-black font-bold py-4 rounded-xl text-xs tracking-widest uppercase hover:bg-white transition-all">
          CLOSE WINDOW
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
  lucide.createIcons();
}

function closeBookingModal() {
  const modal = document.getElementById("booking-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

// Search Modal Logic
function openSearchModal() {
  const modal = document.getElementById("search-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    document.getElementById("search-input")?.focus();
  }, 100);
  lucide.createIcons();
}

function closeSearchModal() {
  const modal = document.getElementById("search-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

function handleToggleWishlist(id, type, btn) {
  const isLiked = toggleStoredWishlist(id, type);
  const icon = btn.querySelector("svg");
  if (!icon) return;

  icon.classList.toggle("fill-gold", isLiked);
  icon.classList.toggle("text-gold", isLiked);
  icon.classList.toggle("text-gray-400", !isLiked);
  lucide.createIcons();
}

function handleFilter(type, btn) {
  document.querySelectorAll(".filter-btn").forEach((b) => {
    b.classList.remove("active", "bg-gold", "text-black");
    b.classList.add("border", "border-gold/30", "text-white");
  });
  btn.classList.add("active", "bg-gold", "text-black");
  btn.classList.remove("border", "border-gold/30", "text-white");
  renderPackages("package-grid", type);
}

// Wishlist Modal Logic
function openWishlistModal() {
  const modal = document.getElementById("wishlist-modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
  lucide.createIcons();
}

function closeWishlistModal() {
  const modal = document.getElementById("wishlist-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

// Initialize everything on DOM load
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  renderPackages("package-grid");
  if (document.getElementById("hajj-only-grid")) {
    renderPackages("hajj-only-grid", "hajj");
  }

  // Search Listeners
  const searchBtn = document.getElementById("navbar-search-btn");
  if (searchBtn) searchBtn.addEventListener("click", openSearchModal);

  const wishlistBtn = document.getElementById("navbar-wishlist-btn");
  if (wishlistBtn) wishlistBtn.addEventListener("click", openWishlistModal);

  const mainSearchBtn = document.getElementById("main-search-btn");
  if (mainSearchBtn) {
    mainSearchBtn.addEventListener("click", () => {
      mainSearchBtn.innerHTML =
        '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> SEARCHING...';
      lucide.createIcons();
      setTimeout(() => {
        mainSearchBtn.innerHTML =
          '<i data-lucide="search" class="w-4 h-4"></i> SEARCH';
        lucide.createIcons();
        alert("Showing customized packages for your criteria...");
      }, 1500);
    });
  }
});

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
