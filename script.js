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

// Global UI Engine
const UI = {
  brand: "AL-SAFAR",
  owner: "Tanzim Ahmed Utsho",
  links: [
    { name: "Home", url: "index.html" },
    { name: "Hajj Packages", url: "hajj.html" },
    { name: "Umrah Packages", url: "umrah.html" },
    { name: "Premium Hotels", url: "hotels.html" },
    { name: "Why Us", url: "why-us.html" },
    { name: "Contact", url: "contact.html" },
  ],
  renderNavbar() {
    const container = document.getElementById("navbar-container");
    if (!container) return;
    container.innerHTML = `
      <nav id="navbar" class="w-full transition-all duration-500 py-6 px-8 md:px-16 flex justify-between items-center bg-black/20 backdrop-blur-md">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
            <i data-lucide="compass" class="text-black w-6 h-6"></i>
          </div>
          <span class="text-2xl font-bold text-gold font-serif tracking-tighter">${this.brand}</span>
        </div>
        <div class="hidden md:flex space-x-8 text-xs font-bold uppercase tracking-widest text-white/80">
          ${this.links.map((link) => `<a href="${link.url}" class="hover:text-gold transition-colors">${link.name}</a>`).join("")}
        </div>
        <div class="flex items-center space-x-6 text-white">
          <i data-lucide="search" id="navbar-search-btn" class="w-5 h-5 cursor-pointer hover:text-gold"></i>
          <i data-lucide="heart" id="navbar-wishlist-btn" class="w-5 h-5 cursor-pointer hover:text-gold"></i>
          <button id="mobile-menu-btn" class="md:hidden text-gold"><i data-lucide="menu"></i></button>
        </div>
      </nav>`;
  },
  renderFooter() {
    const container = document.getElementById("footer-container");
    if (!container) return;
    container.innerHTML = `
      <footer class="bg-primaryDark py-12 px-8 border-t border-white/5 text-center">
        <div class="text-gold font-serif font-bold text-2xl mb-4 tracking-widest">${this.brand}</div>
        <p class="text-gray-500 text-sm mb-6">Your spiritual journey is our responsibility.</p>
        <p class="text-gold/60 text-[10px] uppercase tracking-[0.2em] mb-6 font-semibold">Owner: ${this.owner}</p>
        <div class="flex justify-center space-x-6 text-gray-400">
          <i data-lucide="instagram" class="w-5 h-5 cursor-pointer hover:text-gold transition-colors"></i>
          <i data-lucide="facebook" class="w-5 h-5 cursor-pointer hover:text-gold transition-colors"></i>
          <i data-lucide="twitter" class="w-5 h-5 cursor-pointer hover:text-gold transition-colors"></i>
        </div>
        <div class="mt-8 text-[10px] text-gray-600 uppercase tracking-[0.3em]">© 2024 ${this.brand} Travel Agency. All Rights Reserved.</div>
      </footer>`;
  },
  renderTopBar() {
    const container = document.getElementById("top-announcement-bar");
    if (!container) return;
    const text =
      "Hajj 2026 Pre-Registration Open • 5-Star Hotels within 50m of Haram • Special Ramadan Umrah Packages Available • Expert Spiritual Guides";
    container.innerHTML = `
      <div class="bg-black/60 backdrop-blur-md border-b border-gold/10 py-3 overflow-hidden relative z-[60]">
        <div class="flex whitespace-nowrap animate-marquee-fast hover:pause items-center">
          <div class="flex items-center gap-16 px-8 text-gold font-bold uppercase tracking-[0.4em] text-[10px]">
            ${Array(4).fill(`<span>${text}</span> <i data-lucide="sparkles" class="w-4 h-4"></i>`).join("")}
          </div>
        </div>
      </div>`;
  },
};

// Wishlist Helper Functions
const WISH_KEY = "alsafar_wishlist";
const Wishlist = {
  get: () => JSON.parse(localStorage.getItem(WISH_KEY) || "[]"),
  toggle: (id, type) => {
    const itemKey = `${type}_${id}`;
    let list = Wishlist.get();
    list = list.includes(itemKey)
      ? list.filter((i) => i !== itemKey)
      : [...list, itemKey];
    localStorage.setItem(WISH_KEY, JSON.stringify(list));
    return list.includes(itemKey);
  },
};

// Package Data
const packages = [
  {
    id: 1,
    type: "umrah",
    name: "Umrah Standard",
    price: "$1,299",
    priceVal: 1299,
    date: "Nov 2024",
    distance: 400,
    features: ["4-Star Hotel", "Visa & Insurance", "Local Transport"],
    highlight: false,
  },
  {
    id: 2,
    type: "hajj",
    name: "Royal Hajj Premium",
    price: "$8,500",
    priceVal: 8500,
    date: "Dec 2024",
    distance: 50,
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
    priceVal: 2800,
    date: "Nov 2024",
    distance: 200,
    features: ["5-Star Haram View", "Business Class", "Historical Tours"],
    highlight: false,
  },
];

// Render Search Bar UI via JS
function renderSearchBar() {
  const container = document.getElementById("dynamic-search-container");
  if (!container) return;

  container.innerHTML = `
    <div class="bg-white dark:bg-cardDark p-8 rounded-2xl shadow-2xl border border-white/5 backdrop-blur-md">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="space-y-2">
          <label class="text-[10px] font-bold text-gold uppercase tracking-widest">Flight Date</label>
          <div class="flex items-center gap-3 border-b border-gray-700 pb-2">
            <i data-lucide="calendar" class="w-4 h-4 text-gray-400"></i>
            <input id="search-date" type="text" placeholder="Nov 2024" class="bg-transparent outline-none w-full text-sm" />
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-bold text-gold uppercase tracking-widest">Haram Distance</label>
          <div class="flex items-center gap-3 border-b border-gray-700 pb-2">
            <i data-lucide="map-pin" class="w-4 h-4 text-gray-400"></i>
            <select id="search-distance" class="bg-transparent outline-none w-full text-sm appearance-none cursor-pointer">
              <option value="all" class="bg-black">Any Distance</option>
              <option value="500" class="bg-black">Under 500m</option>
              <option value="100" class="bg-black">Walking Distance</option>
            </select>
          </div>
        </div>
        <div class="space-y-2">
          <label class="text-[10px] font-bold text-gold uppercase tracking-widest">Price Range</label>
          <div class="flex items-center gap-3 border-b border-gray-700 pb-2">
            <i data-lucide="wallet" class="w-4 h-4 text-gray-400"></i>
            <input id="search-price" type="text" placeholder="1000-5000" class="bg-transparent outline-none w-full text-sm" />
          </div>
        </div>
        <button id="main-search-btn" class="bg-gold hover:bg-white text-black font-bold rounded-xl py-3 transition-all flex items-center justify-center gap-2">
          <i data-lucide="search" class="w-4 h-4"></i> SEARCH
        </button>
      </div>
    </div>
  `;
  lucide.createIcons();
  initSearchLogic();
}

function initSearchLogic() {
  const btn = document.getElementById("main-search-btn");
  btn.addEventListener("click", () => {
    const dateVal = document.getElementById("search-date").value.toLowerCase();
    const distVal = document.getElementById("search-distance").value;
    const priceRange = document.getElementById("search-price").value;

    btn.innerHTML =
      '<i data-lucide="loader" class="w-4 h-4 animate-spin"></i> FILTERING...';
    lucide.createIcons();

    setTimeout(() => {
      const filtered = packages.filter((pkg) => {
        // Date Filter
        const matchDate = !dateVal || pkg.date.toLowerCase().includes(dateVal);

        // Distance Filter
        const matchDist =
          distVal === "all" || pkg.distance <= parseInt(distVal);

        // Price Filter Logic
        let matchPrice = true;
        if (priceRange.includes("-")) {
          const [min, max] = priceRange
            .split("-")
            .map((v) => parseInt(v.trim()));
          matchPrice = pkg.priceVal >= min && pkg.priceVal <= max;
        } else if (priceRange) {
          matchPrice = pkg.priceVal <= parseInt(priceRange);
        }

        return matchDate && matchDist && matchPrice;
      });

      displayFilteredResults(filtered);
      btn.innerHTML = '<i data-lucide="search" class="w-4 h-4"></i> SEARCH';
      lucide.createIcons();

      if (filtered.length > 0) {
        document
          .getElementById("packages")
          .scrollIntoView({ behavior: "smooth" });
      }
    }, 800);
  });
}

function displayFilteredResults(filteredData) {
  const container = document.getElementById("package-grid");
  if (!container) return;

  if (filteredData.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-10 text-center text-gray-500 italic">
        No packages match your specific criteria. Please try different filters.
      </div>`;
    return;
  }

  // Re-use rendering logic but with provided data
  renderPackagesWithData("package-grid", filteredData);
}

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

  renderPackagesWithData(containerId, filtered);
}

function renderPackagesWithData(containerId, data) {
  const container = document.getElementById(containerId);
  const wishlist = getWishlist();
  if (data.length === 0) {
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
    container.innerHTML = data
      .map(
        (pkg) => `
    <div class="package-card relative ${pkg.highlight ? "bg-primaryDark border-2 border-gold scale-105 shadow-2xl" : "bg-cardDark border border-white/5"} p-8 rounded-[2rem] transition-all duration-500 hover:bg-white/5 hover:backdrop-blur-md hover:shadow-[0_20px_50px_rgba(212,175,55,0.1)] reveal">
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

function handleFilter(type, btn) {
  document.querySelectorAll(".filter-btn").forEach((b) => {
    b.classList.remove("active", "bg-gold", "text-black");
    b.classList.add("border", "border-gold/30", "text-white");
  });
  btn.classList.add("active", "bg-gold", "text-black");
  btn.classList.remove("border", "border-gold/30", "text-white");
  renderPackages("package-grid", type);

  // Manage Remove All Button
  const existingClear = document.getElementById("clear-all-wish-main");
  if (type === "wishlist" && Wishlist.get().length > 0) {
    if (!existingClear) {
      const clearBtn = document.createElement("button");
      clearBtn.id = "clear-all-wish-main";
      clearBtn.className =
        "mt-8 mx-auto block text-red-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors reveal active";
      clearBtn.innerHTML = "Remove All From Wishlist";
      clearBtn.onclick = () => {
        if (confirm("Clear all items from your wishlist?")) {
          localStorage.removeItem(WISH_KEY);
          handleFilter("wishlist", btn);
        }
      };
      document
        .getElementById("packages")
        .querySelector(".max-w-7xl")
        .insertBefore(clearBtn, document.getElementById("package-grid"));
    }
  } else if (existingClear) {
    existingClear.remove();
  }
}

function handleToggleWishlist(id, type, btn) {
  const isLiked = Wishlist.toggle(id, type);
  const activeBtn = document.querySelector(".filter-btn.active");

  if (activeBtn && activeBtn.innerText.includes("WISHLIST")) {
    handleFilter("wishlist", activeBtn);
  } else {
    const icon = btn.querySelector("svg");
    if (icon) {
      icon.classList.toggle("fill-gold", isLiked);
      icon.classList.toggle("text-gold", isLiked);
      icon.classList.toggle("text-gray-400", !isLiked);
    }
  }
  lucide.createIcons();
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
  UI.renderTopBar();
  UI.renderNavbar();
  UI.renderFooter();
  renderSearchBar();
  renderPackages("package-grid");
  lucide.createIcons();

  // Search Listeners
  const searchBtn = document.getElementById("navbar-search-btn");
  if (searchBtn) searchBtn.addEventListener("click", openSearchModal);

  const wishlistBtn = document.getElementById("navbar-wishlist-btn");
  if (wishlistBtn) wishlistBtn.addEventListener("click", openWishlistModal);
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
