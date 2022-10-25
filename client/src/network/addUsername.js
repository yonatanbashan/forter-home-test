export default async function addUsername(newUsername) {
  const response = await fetch(
    `http://localhost:3000/add_user?new_username=${encodeURIComponent(
      newUsername
    )}`,
    {
      method: "POST",
    }
  );
  return (await response.json()).username;
}
