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

// Live Chat Logic
function toggleChat() {
  const chatBox = document.getElementById("live-chat-box");
  const trigger = document.getElementById("chat-trigger");

  if (chatBox.classList.contains("hidden")) {
    chatBox.classList.remove("hidden");
    chatBox.classList.add("flex");
    setTimeout(() => {
      chatBox.classList.remove("translate-y-20", "opacity-0");
    }, 10);
    trigger.classList.add("opacity-0", "pointer-events-none");
    lucide.createIcons(); // Ensure icons inside chat box are rendered
  } else {
    chatBox.classList.add("translate-y-20", "opacity-0");
    setTimeout(() => {
      chatBox.classList.add("hidden");
      chatBox.classList.remove("flex");
      trigger.classList.remove("opacity-0", "pointer-events-none");
    }, 500);
  }
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");

  if (!input.value.trim()) return;

  // User Message
  const userMsg = document.createElement("div");
  userMsg.className =
    "bg-gold/20 p-3 rounded-2xl rounded-tr-none self-end max-w-[80%] text-gold border border-gold/10 text-xs";
  userMsg.textContent = input.value;
  messages.appendChild(userMsg);

  const messageText = input.value;
  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  // Simulated Agent Response
  setTimeout(() => {
    const agentMsg = document.createElement("div");
    agentMsg.className =
      "bg-white/5 p-3 rounded-2xl rounded-tl-none self-start max-w-[80%] border border-white/5 text-xs";
    agentMsg.textContent =
      "Thank you for contacting Al-Safar. A consultant will be with you shortly to assist with your journey.";
    messages.appendChild(agentMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 1000);
}

// Handle Enter key in chat
function handleChatEnter(e) {
  if (e.key === "Enter") {
    sendMessage();
  }
}
