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

  const userMsg = document.createElement("div");
  userMsg.className =
    "bg-gold/20 p-3 rounded-2xl rounded-tr-none self-end max-w-[80%] text-gold border border-gold/10";
  userMsg.textContent = input.value;
  messages.appendChild(userMsg);

  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    const agentMsg = document.createElement("div");
    agentMsg.className =
      "bg-white/5 p-3 rounded-2xl rounded-tl-none self-start max-w-[80%] border border-white/5";
    agentMsg.textContent =
      "Thank you for your message. A spiritual consultant will be with you shortly.";
    messages.appendChild(agentMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 1000);
}

document
  .getElementById("support-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const toast = document.getElementById("support-toast");
    toast.classList.remove("translate-y-20", "opacity-0");
    this.reset();
    setTimeout(() => {
      toast.classList.add("translate-y-20", "opacity-0");
    }, 4000);
  });
