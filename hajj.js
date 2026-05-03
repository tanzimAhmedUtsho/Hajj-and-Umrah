// Tailwind Configuration for Hajj Page
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        primaryDark: "#0a0a0a",
        cardDark: "#111111",
      },
    },
  },
};

// Detailed Hajj Packages Data
const hajjPackages = [
  {
    id: 1,
    name: "Economy Spiritual Hajj",
    price: "$5,800",
    duration: "25-30 Days",
    makkahHotel: "3-Star Hotel (800m)",
    madinahHotel: "3-Star Hotel (Close to Markazia)",
    roomType: "4 Person Sharing",
    meals: "3 Times Buffet Meals",
    features: [
      "Standard Mina Tents",
      "Moallim Support",
      "Ziyarah Included",
      "Health Insurance",
    ],
    tag: "Most Affordable",
    itinerary: [
      {
        day: "Day 01-15",
        activity:
          "Makkah Stay: Focus on Ibadah at Masjid Al-Haram. Daily lectures by group leaders.",
      },
      {
        day: "Day 16-20",
        activity:
          "Hajj Rituals: Movement to Mina, Arafat, and Muzdalifah with standard Moallim services.",
      },
      {
        day: "Day 21-30",
        activity:
          "Madinah Stay: Ziyarah of Prophet's Mosque and historical sites around Madinah.",
      },
    ],
  },
  {
    id: 2,
    name: "Standard Comfort Hajj",
    price: "$7,500",
    duration: "20-22 Days",
    makkahHotel: "4-Star Hotel (Walking Distance)",
    madinahHotel: "4-Star Near Al-Masjid an-Nabawi",
    roomType: "3 Person Sharing",
    meals: "Full Board Premium Meals",
    features: [
      "Upgraded Mina Tents",
      "Private AC Bus",
      "24/7 Group Leader",
      "Laundry Service",
    ],
    tag: "Best Seller",
    itinerary: [
      {
        day: "Day 01-10",
        activity:
          "Makkah Stay: 4-Star accommodation within walking distance. Full board meals.",
      },
      {
        day: "Day 11-15",
        activity:
          "Hajj Rituals: Upgraded Mina tents with better facilities and private bus transport.",
      },
      {
        day: "Day 16-22",
        activity:
          "Madinah Stay: Premium accommodation near Markazia and group Ziyarah sessions.",
      },
    ],
  },
  {
    id: 3,
    name: "Elite VIP Hajj",
    price: "$9,900",
    duration: "14-16 Days",
    makkahHotel: "5-Star (Pullman ZamZam)",
    madinahHotel: "5-Star (Anwar Al Madinah)",
    roomType: "Double Sharing",
    meals: "Luxury Buffet & Snacks",
    features: [
      "VIP Sofa Beds in Mina",
      "Luxury Private Transport",
      "Specialized Religious Scholars",
      "Kit Bag & Gifts",
    ],
    tag: "Luxury Experience",
    itinerary: [
      {
        day: "Day 01-05",
        activity:
          "Arrival in Makkah: VIP Check-in at 5-Star Hotel. Welcome ceremony and orientation.",
      },
      {
        day: "Day 06-10",
        activity:
          "VIP Hajj Days: Sofa beds in Mina, high-end catering, and scholars for guidance.",
      },
      {
        day: "Day 11-16",
        activity:
          "Madinah Luxury: 5-Star stay with easy access to Rawdah and exclusive tours.",
      },
    ],
  },
  {
    id: 4,
    name: "Royal Clock Tower Hajj",
    price: "$12,500",
    duration: "12-14 Days",
    makkahHotel: "Fairmont Clock Tower (Haram View)",
    madinahHotel: "Oberoi Madinah",
    roomType: "Private Double/Single",
    meals: "Exclusive Catering Services",
    features: [
      "Direct Haram Entrance",
      "Private VIP Tents with Bed",
      "GMC Private Transfer",
      "Personal Assistance",
    ],
    tag: "Royal Premium",
    itinerary: [
      {
        day: "Day 01-05",
        activity:
          "Royal Makkah: Stay at Clock Tower with direct Haram view. 24/7 personal butler.",
      },
      {
        day: "Day 06-10",
        activity:
          "Elite Hajj: Private tents in Mina with AC and luxury bedding. GMC transfers.",
      },
      {
        day: "Day 11-14",
        activity:
          "Royal Madinah: Stay at Oberoi. Private Ziyarah and airport VIP lounge access.",
      },
    ],
  },
];

const WISH_KEY = "alsafar_wishlist";
const getWishlist = () => JSON.parse(localStorage.getItem(WISH_KEY) || "[]");
let currentHajjFilter = "all";

function renderHajjDetailed() {
  const container = document.getElementById("hajj-detailed-grid");
  if (!container) return;

  const wishlist = getWishlist();
  let filtered =
    currentHajjFilter === "wishlist"
      ? hajjPackages.filter((p) => wishlist.includes("hajj_" + p.id))
      : hajjPackages;

  if (filtered.length === 0) {
    container.innerHTML = `<div class="col-span-full py-20 text-center text-gray-500 italic">No packages found.</div>`;
    return;
  }

  container.innerHTML = filtered
    .map(
      (pkg) => `
    <div class="group relative bg-cardDark border border-white/5 rounded-[2.5rem] p-1 overflow-hidden transition-all duration-500 hover:border-gold/50 hover:bg-white/5 hover:backdrop-blur-md reveal">
      <button onclick="toggleHajjWishlist(${pkg.id}, this)" class="absolute top-6 right-6 p-2.5 bg-white/10 rounded-full hover:bg-gold/20 transition-all group/heart z-10">
        <i data-lucide="heart" class="w-4 h-4 ${wishlist.includes("hajj_" + pkg.id) ? "text-gold fill-gold" : "text-gray-400"} group-hover/heart:text-gold transition-colors"></i>
      </button>
      <div class="p-8 md:p-10">
        ${renderCardContent(pkg)}
      </div>
    </div>`,
    )
    .join("");

  lucide.createIcons();
  observeReveal();
}

function renderCardContent(pkg) {
  return `
        <div class="flex justify-between items-start mb-6">
            <div>
                <span class="text-gold text-[10px] font-bold uppercase tracking-[0.2em] bg-gold/10 px-3 py-1 rounded-full mb-3 inline-block">${pkg.tag}</span>
                <h3 class="text-2xl md:text-3xl font-bold text-white group-hover:text-gold transition-colors">${pkg.name}</h3>
            </div>
            <div class="text-right pt-4">
                <div class="text-3xl font-bold text-gold">${pkg.price}</div>
                <div class="text-gray-500 text-xs uppercase tracking-tighter">${pkg.duration}</div>
            </div>
        </div>
        ${renderDetailsGrid(pkg)}
        <div class="border-t border-white/5 pt-8 mb-8">
            <ul class="grid grid-cols-2 gap-y-3">
                ${pkg.features
                  .map(
                    (feat) => `
                    <li class="flex items-center gap-2 text-xs text-gray-400">
                        <i data-lucide="check-circle" class="text-gold w-3 h-3"></i> ${feat}
                    </li>`,
                  )
                  .join("")}
            </ul>
        </div>
        <button onclick="showItinerary(${pkg.id})" class="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold tracking-widest text-xs hover:bg-gold hover:text-black hover:border-gold transition-all duration-300">
            VIEW COMPLETE ITINERARY
        </button>
    `;
}

function clearHajjWishlist() {
  if (confirm("Clear all items from your hajj wishlist?")) {
    let list = getWishlist();
    list = list.filter((item) => !item.startsWith("hajj_"));
    localStorage.setItem(WISH_KEY, JSON.stringify(list));
    renderHajjUI();
  }
}

function toggleHajjWishlist(id, btn) {
  const itemKey = "hajj_" + id;
  let list = getWishlist();
  if (list.includes(itemKey)) list = list.filter((i) => i !== itemKey);
  else list.push(itemKey);
  localStorage.setItem(WISH_KEY, JSON.stringify(list));
  renderHajjUI();
}

function renderDetailsGrid(pkg) {
  return `
        <div class="grid md:grid-cols-2 gap-6 mb-8 text-left">
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <i data-lucide="hotel" class="text-gold w-5 h-5 mt-1"></i>
              <div>
                <p class="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Makkah Hotel</p>
                <p class="text-sm text-gray-200">${pkg.makkahHotel}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <i data-lucide="users" class="text-gold w-5 h-5 mt-1"></i>
              <div>
                <p class="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Accommodation</p>
                <p class="text-sm text-gray-200">${pkg.roomType}</p>
              </div>
            </div>
          </div>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <i data-lucide="utensils" class="text-gold w-5 h-5 mt-1"></i>
              <div>
                <p class="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Meal Plan</p>
                <p class="text-sm text-gray-200">${pkg.meals}</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <i data-lucide="calendar-check" class="text-gold w-5 h-5 mt-1"></i>
              <div>
                <p class="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Duration</p>
                <p class="text-sm text-gray-200">${pkg.duration}</p>
              </div>
            </div>
          </div>
        </div>
    `;
}

// Modal Controls
function showItinerary(id) {
  const pkg = hajjPackages.find((p) => p.id === id);
  const modal = document.getElementById("itinerary-modal");
  const content = document.getElementById("modal-content");

  content.innerHTML = `
    <h2 class="text-3xl md:text-5xl font-bold text-white mb-4">${pkg.name}</h2>
    <p class="text-gold font-bold mb-8 tracking-widest uppercase text-xs">${pkg.duration} Complete Journey Plan</p>
    
    <div class="space-y-8 mb-10">
      ${pkg.itinerary
        .map(
          (item) => `
        <div class="flex gap-6 border-l-2 border-gold/30 pl-6 pb-2">
          <div class="text-gold font-bold whitespace-nowrap pt-1 text-xs uppercase tracking-widest">${item.day}</div>
          <div class="text-gray-300 leading-relaxed text-sm">${item.activity}</div>
        </div>
      `,
        )
        .join("")}
    </div>

    <div class="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
      <p class="text-gray-400 text-xs mb-4 italic">Ready to start your spiritual journey?</p>
      <button onclick="bookPackage(${pkg.id})" class="bg-gold text-black font-bold px-12 py-4 rounded-full text-xs tracking-widest hover:bg-white transition-all">BOOK THIS PACKAGE</button>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
  lucide.createIcons();
}

function renderHajjUI() {
  // Create Filter Buttons dynamically via JS
  const filterContainer = document.querySelector(
    ".flex.justify-center.gap-8.mb-12",
  );
  if (filterContainer) {
    const wishlist = getWishlist();
    const hasWish = wishlist.some((item) => item.startsWith("hajj_"));

    filterContainer.innerHTML = `
            <button onclick="setHajjFilter('all')" class="px-6 py-2 rounded-full border border-gold/30 text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all">All Packages</button>
            <button onclick="setHajjFilter('wishlist')" class="px-6 py-2 rounded-full border border-gold/30 text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all flex items-center gap-2">
                <i data-lucide="heart" class="w-3 h-3"></i> My Wishlist
            </button>
            ${hasWish ? `<button onclick="clearHajjWishlist()" class="px-6 py-2 rounded-full border border-red-500/20 text-[10px] text-red-500 uppercase font-bold tracking-widest hover:bg-red-500 hover:text-white transition-all">Remove All</button>` : ""}
        `;
    lucide.createIcons();
  }
  renderHajjDetailed();
}

function setHajjFilter(filter) {
  currentHajjFilter = filter;
  renderHajjDetailed();
}

function bookPackage(id) {
  const pkg = hajjPackages.find((p) => p.id === id);
  const content = document.getElementById("modal-content");

  content.innerHTML = `
    <div class="text-center py-12 reveal active">
      <div class="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 ring-8 ring-gold/5 animate-pulse">
        <i data-lucide="scroll" class="text-gold w-10 h-10"></i>
      </div>
      <h2 class="text-4xl font-bold text-white mb-4">Booking Requested</h2>
      <p class="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Sacred Hajj Journey</p>
      <p class="text-gray-400 leading-relaxed mb-10 text-sm">
        Assalamu Alaikum! You've expressed interest in <span class="text-gold font-bold">${pkg.name}</span>. 
        Our chief consultant <strong>Tanzim Ahmed Utsho</strong> will prioritize your request and contact you shortly.
      </p>
      <button onclick="closeModal()" class="bg-gold text-black font-bold px-12 py-4 rounded-full text-xs tracking-widest hover:bg-white transition-all uppercase">Acknowledge</button>
    </div>
  `;
  lucide.createIcons();
}

function closeModal() {
  const modal = document.getElementById("itinerary-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto";
}

// Navbar Scroll Effect
function initNavbar() {
  const nav = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("bg-black/95", "py-4", "shadow-2xl");
      nav.classList.remove("py-6");
    } else {
      nav.classList.remove("bg-black/95", "py-4", "shadow-2xl");
      nav.classList.add("py-6");
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
  renderHajjUI();
  initNavbar();
});
