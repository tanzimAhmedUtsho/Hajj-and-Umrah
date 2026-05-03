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
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
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
  },
];

// Render Detailed Packages
function renderHajjDetailed() {
  const container = document.getElementById("hajj-detailed-grid");
  if (!container) return;

  container.innerHTML = hajjPackages
    .map(
      (pkg) => `
    <div class="group bg-cardDark border border-white/5 rounded-[2.5rem] p-1 overflow-hidden transition-all duration-500 hover:border-gold/50 reveal">
      <div class="p-8 md:p-10">
        <div class="flex justify-between items-start mb-6">
          <div>
            <span class="text-gold text-[10px] font-bold uppercase tracking-[0.2em] bg-gold/10 px-3 py-1 rounded-full mb-3 inline-block">${pkg.tag}</span>
            <h3 class="text-2xl md:text-3xl font-serif font-bold text-white group-hover:text-gold transition-colors">${pkg.name}</h3>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-gold">${pkg.price}</div>
            <div class="text-gray-500 text-xs uppercase tracking-tighter">${pkg.duration}</div>
          </div>
        </div>

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

        <div class="border-t border-white/5 pt-8 mb-8">
          <ul class="grid grid-cols-2 gap-y-3">
            ${pkg.features
              .map(
                (feat) => `
              <li class="flex items-center gap-2 text-xs text-gray-400">
                <i data-lucide="check-circle" class="text-gold w-3 h-3"></i> ${feat}
              </li>
            `,
              )
              .join("")}
          </ul>
        </div>

        <button class="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold tracking-widest text-xs hover:bg-gold hover:text-black hover:border-gold transition-all duration-300">
          VIEW COMPLETE ITINERARY
        </button>
      </div>
    </div>
  `,
    )
    .join("");

  lucide.createIcons();
  observeReveal();
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
  renderHajjDetailed();
  initNavbar();
});
