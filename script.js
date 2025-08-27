const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

// --- Predefined replies for real-life feel ---
const replies = [
  { keywords: ["hello", "hi", "hey"], response: "Hey 👋! How’s your day going?" },
  { keywords: ["good", "fine", "great"], response: "Nice to hear that 😊. Got any plans today?" },
  { keywords: ["not good", "sad", "tired"], response: "Sorry to hear that 😔. Want to talk about it?" },
  { keywords: ["weather"], response: "Looks like a good day outside 🌤️. Do you like sunny or rainy days?" },
  { keywords: ["food", "eat", "hungry"], response: "I could go for a pizza 🍕 right now. What’s your favorite food?" },
  { keywords: ["bye", "goodbye", "see you"], response: "Take care 👋! Catch you later." },
];

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

  // Fake bot response after delay
  setTimeout(() => {
    addMessage("🤖 " + generateReply(text), "bot");
  }, 800);
}

function generateReply(input) {
  input = input.toLowerCase();
  for (let rule of replies) {
    if (rule.keywords.some(word => input.includes(word))) {
      return rule.response;
    }
  }
  return "That’s interesting 🤔, tell me more!";
}

// Enter key support
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
