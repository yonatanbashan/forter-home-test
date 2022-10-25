export default function postMessage(message, username) {
  fetch(
    `http://localhost:3000/message?message=${encodeURIComponent(
      message
    )}&username=${username}`,
    {
      method: "POST",
    }
  );
}
