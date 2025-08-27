const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.classList.add("message", sender);
  message.innerText = text;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;
  addMessage(text, "user");
  userInput.value = "";
  setTimeout(() => {
    addMessage("🤖 " + generateReply(text), "bot");
  }, 600);
}

function generateReply(input) {
  input = input.toLowerCase();
  if (input.includes("hello")) return "Hello! 👋 Ready for a video chat?";
  if (input.includes("how are you")) return "I’m doing great 😄 thanks for asking!";
  if (input.includes("bye")) return "Goodbye 👋 Stay safe!";
  return "Interesting 🤔, tell me more!";
}

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

/* ======== VIDEO CHAT (WebRTC demo self-call) ======== */
const startCallBtn = document.getElementById("startCall");
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

let localStream, peerConn;

startCallBtn.addEventListener("click", async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;

  peerConn = new RTCPeerConnection();
  localStream.getTracks().forEach(track => peerConn.addTrack(track, localStream));

  peerConn.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };

  // Local description
  const offer = await peerConn.createOffer();
  await peerConn.setLocalDescription(offer);

  // Simulate signaling (loopback for demo)
  const answer = await fakeSignalExchange(offer);
  await peerConn.setRemoteDescription(answer);
});

// Fake signaling (local loopback)
async function fakeSignalExchange(offer) {
  const peer2 = new RTCPeerConnection();
  let remoteStream = new MediaStream();
  peer2.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };

  localStream.getTracks().forEach(track => peer2.addTrack(track, localStream));

  await peer2.setRemoteDescription(offer);
  const answer = await peer2.createAnswer();
  await peer2.setLocalDescription(answer);

  return answer;
}

