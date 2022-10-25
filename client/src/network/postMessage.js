export default function postMessage(
  message,
  username,
  replyToMessage,
  replyToId
) {
  const searchParams =
    replyToMessage === undefined
      ? new URLSearchParams({
          username,
          message,
        })
      : new URLSearchParams({
          username,
          message,
          replyToId,
          replyToMessage,
        });
  fetch(`http://localhost:3000/message?${searchParams}`, {
    method: "POST",
  });
}
