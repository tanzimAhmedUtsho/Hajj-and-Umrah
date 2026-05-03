// Tailwind Configuration for Umrah Page
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

// Detailed Umrah Packages Data
const umrahPackages = [
  {
    id: 1,
    name: "Economy Umrah Plus",
    price: "$1,299",
    duration: "14 Days",
    makkahHotel: "Emaar Grand (700m)",
    madinahHotel: "Manazil Al-Falah",
    roomType: "Quad Sharing",
    meals: "Breakfast Included",
    features: [
      "Visa Processing",
      "Local Ziyarah",
      "Transport by Bus",
      "24/7 Group Support",
    ],
    tag: "Budget Friendly",
    itinerary: [
      {
        day: "Day 01-07",
        activity:
          "Makkah Stay: Focus on Umrah and ibadah. Group orientation and guided Umrah.",
      },
      {
        day: "Day 08-14",
        activity:
          "Madinah Stay: Ziyarah of historical places and prayer at Masjid an-Nabawi.",
      },
    ],
  },
  {
    id: 2,
    name: "Premium Comfort Umrah",
    price: "$2,100",
    duration: "15 Days",
    makkahHotel: "Anjum Hotel Makkah",
    madinahHotel: "Al-Eiman Royal",
    roomType: "Triple Sharing",
    meals: "Half Board (BF & Dinner)",
    features: [
      "Umrah Visa",
      "Luxury Bus Transfer",
      "Historical Tours",
      "Mobile SIM Card",
    ],
    tag: "Most Popular",
    itinerary: [
      {
        day: "Day 01-08",
        activity:
          "Makkah: Stay in 5-star hotel near Haram. Two guided Umrah sessions included.",
      },
      {
        day: "Day 09-15",
        activity:
          "Madinah: Premium stay with close access to Bab-us-Salam and guided Ziyarah.",
      },
    ],
  },
  {
    id: 3,
    name: "VIP Haram View Umrah",
    price: "$3,500",
    duration: "10 Days",
    makkahHotel: "Swissotel Makkah (Haram View)",
    madinahHotel: "Shaza Al Madinah",
    roomType: "Double Sharing",
    meals: "Full Board Buffet",
    features: [
      "VIP Visa Service",
      "Private GMC Transfer",
      "Personal Mutawwif",
      "Zamzam Water (5L)",
    ],
    tag: "Luxury Stay",
    itinerary: [
      {
        day: "Day 01-05",
        activity:
          "Makkah: Direct Haram view room. Private guided Umrah and Taif tour included.",
      },
      {
        day: "Day 06-10",
        activity:
          "Madinah: Luxury stay with private Ziyarah of Badr and historical mosques.",
      },
    ],
  },
  {
    id: 4,
    name: "Ramadan Special Umrah",
    price: "$4,200",
    duration: "15 Days",
    makkahHotel: "Hilton Convention",
    madinahHotel: "Pullman Zamzam Madinah",
    roomType: "Sharing / Double",
    meals: "Suhoor & Iftar Buffet",
    features: [
      "Ramadan Visa",
      "Iftar at Haram",
      "Tashkeel Support",
      "Exclusive Gift Pack",
    ],
    tag: "Seasonal Choice",
    itinerary: [
      {
        day: "Day 01-10",
        activity:
          "Makkah: Spiritual Ramadan atmosphere. Tahajjud and Iftar arrangements.",
      },
      {
        day: "Day 11-15",
        activity:
          "Madinah: Last days of Ramadan in Prophet's Mosque and Eid-ul-Fitr celebration.",
      },
    ],
  },
];

// Render Functions
function renderUmrahDetailed() {
  const container = document.getElementById("umrah-detailed-grid");
  if (!container) return;

  container.innerHTML = umrahPackages
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
              <div><p class="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Makkah Hotel</p><p class="text-sm text-gray-200">${pkg.makkahHotel}</p></div>
            </div>
            <div class="flex items-start gap-3">
              <i data-lucide="users" class="text-gold w-5 h-5 mt-1"></i>
              <div><p class="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Accommodation</p><p class="text-sm text-gray-200">${pkg.roomType}</p></div>
            </div>
          </div>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <i data-lucide="utensils" class="text-gold w-5 h-5 mt-1"></i>
              <div><p class="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Meal Plan</p><p class="text-sm text-gray-200">${pkg.meals}</p></div>
            </div>
          </div>
        </div>

        <button onclick="showUmrahItinerary(${pkg.id})" class="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold tracking-widest text-xs hover:bg-gold hover:text-black hover:border-gold transition-all duration-300">
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

function showUmrahItinerary(id) {
  const pkg = umrahPackages.find((p) => p.id === id);
  const modal = document.getElementById("itinerary-modal");
  const content = document.getElementById("modal-content");

  content.innerHTML = `
    <h2 class="text-3xl md:text-5xl font-serif font-bold text-white mb-4">${pkg.name}</h2>
    <div class="space-y-8 mb-10 mt-8">
      ${pkg.itinerary
        .map(
          (item) => `
        <div class="flex gap-6 border-l-2 border-gold/30 pl-6 pb-2">
          <div class="text-gold font-bold whitespace-nowrap text-xs uppercase tracking-widest">${item.day}</div>
          <div class="text-gray-300 text-sm">${item.activity}</div>
        </div>
      `,
        )
        .join("")}
    </div>
    <button onclick="bookUmrah(${pkg.id})" class="w-full bg-gold text-black font-bold py-4 rounded-full text-xs tracking-widest uppercase hover:bg-white transition-all">Book Now</button>
  `;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
  lucide.createIcons();
}

function closeModal() {
  document.getElementById("itinerary-modal").classList.add("hidden");
  document.body.style.overflow = "auto";
}

function bookUmrah(id) {
  alert(
    "Assalamu Alaikum! Your request for Umrah booking has been received. We will contact you shortly.",
  );
  closeModal();
}

function observeReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("active");
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", renderUmrahDetailed);
