// Tailwind Configuration for Hotels Page
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

const hotelData = [
  {
    id: 1,
    name: "Fairmont Makkah Clock Royal Tower",
    city: "makkah",
    distance: "0m (Inside Clock Tower)",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?q=80&w=1974&auto=format&fit=crop",
    features: [
      "Haram View Rooms",
      "9 Restaurants",
      "Direct Access to Mall",
      "VIP Service",
    ],
  },
  {
    id: 2,
    name: "Pullman ZamZam Makkah",
    city: "makkah",
    distance: "50m from King Abdulaziz Gate",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Family Suites",
      "Breakfast Buffet",
      "24/7 Concierge",
      "Prayer Hall Link",
    ],
  },
  {
    id: 3,
    name: "Anwar Al Madinah Movenpick",
    city: "madinah",
    distance: "Near Masjid an-Nabawi",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Closest to Ladies Gate",
      "Executive Lounge",
      "Spacious Rooms",
      "Shopping Arcade",
    ],
  },
  {
    id: 4,
    name: "Oberoi Madinah",
    city: "madinah",
    distance: "Opposite Prophet's Mosque",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1551882547-ff43c63ef53d?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Ultra Luxury",
      "Butler Service",
      "Gourmet Dining",
      "Prime Location",
    ],
  },
];

function renderHotels(filter = "all") {
  const container = document.getElementById("hotel-grid");
  if (!container) return;

  const filtered =
    filter === "all" ? hotelData : hotelData.filter((h) => h.city === filter);

  container.innerHTML = filtered
    .map(
      (hotel) => `
    <div class="group bg-cardDark border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-gold/50 reveal">
      <div class="relative h-64 overflow-hidden">
        <img src="${hotel.image}" alt="${hotel.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
        <div class="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
          <i data-lucide="star" class="w-3 h-3 text-gold fill-gold"></i>
          <span class="text-[10px] font-bold text-white">${hotel.rating}.0</span>
        </div>
      </div>
      <div class="p-8">
        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">${hotel.name}</h3>
        <div class="flex items-center gap-2 text-gray-400 text-xs mb-6 uppercase tracking-widest">
          <i data-lucide="map-pin" class="w-3 h-3 text-gold"></i>
          ${hotel.distance}
        </div>
        <button onclick="showHotelDetails(${hotel.id})" class="w-full py-4 border border-gold/30 text-gold rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all">
          View Gallery & Details
        </button>
      </div>
    </div>
  `,
    )
    .join("");

  lucide.createIcons();
  observeReveal();
}

function showHotelDetails(id) {
  const hotel = hotelData.find((h) => h.id === id);
  const modal = document.getElementById("hotel-modal");
  const content = document.getElementById("hotel-modal-content");

  content.innerHTML = `
    <div class="flex flex-col md:flex-row">
      <div class="md:w-1/2 h-64 md:h-auto">
        <img src="${hotel.image}" class="w-full h-full object-cover">
      </div>
      <div class="md:w-1/2 p-8 md:p-12">
        <span class="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4 inline-block">${hotel.city} Premium</span>
        <h2 class="text-3xl font-bold text-white mb-4">${hotel.name}</h2>
        <p class="text-gray-400 text-sm mb-8 italic">Experience ultimate comfort with our handpicked premium selection.</p>
        <ul class="space-y-3 mb-10">
          ${hotel.features
            .map(
              (f) => `
            <li class="flex items-center gap-3 text-xs text-gray-300">
              <i data-lucide="check" class="text-gold w-4 h-4"></i> ${f}
            </li>
          `,
            )
            .join("")}
        </ul>
        <button class="w-full bg-gold text-black font-bold py-4 rounded-xl text-xs tracking-widest uppercase hover:bg-white transition-all">Check Availability</button>
      </div>
    </div>
  `;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  lucide.createIcons();
}

function closeHotelModal() {
  document.getElementById("hotel-modal").classList.add("hidden");
}

function filterHotels(city) {
  document
    .querySelectorAll(".hotel-filter")
    .forEach((btn) => btn.classList.remove("active", "bg-gold", "text-black"));
  event.target.classList.add("active", "bg-gold", "text-black");
  renderHotels(city);
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

document.addEventListener("DOMContentLoaded", () => renderHotels("all"));
