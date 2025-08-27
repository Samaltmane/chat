const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerText = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight; // auto scroll
}

function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;
  
  addMessage(text, "user");
  userInput.value = "";

  // Fake bot response after 1 second
  setTimeout(() => {
    addMessage("🤖 " + generateReply(text), "bot");
  }, 800);
}

function generateReply(input) {
  // Simple demo replies
  if (input.toLowerCase().includes("hello")) return "Hello! How can I help you today?";
  if (input.toLowerCase().includes("bye")) return "Goodbye 👋";
  return "I'm just a demo bot response.";
}

// Enter key support
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
