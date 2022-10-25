import addUsername from "../network/addUsername.js";

const adjectives = [
  "Strong",
  "Typical",
  "Beautiful",
  "Quick",
  "Funny",
  "Dramatic",
  "Childish",
  "Lightheaded",
  "Quirky",
  "Important",
  "Noble",
  "Slow",
  "Clever",
  "Magnetic",
  "Energetic",
  "Round",
  "Rectangular",
  "Purple",
  "Blue",
  "Yellow",
  "Red",
  "Serious",
  "Loud",
  "Experimental",
  "Contemporary",
  "Colorful",
  "Wooden",
];

const nouns = [
  "Worker",
  "Actor",
  "Conductor",
  "Cube",
  "Ellipse",
  "Planet",
  "Table",
  "Towel",
  "Microwave",
  "Lamp",
  "Bottle",
  "Pants",
  "Potato",
  "Tomato",
  "Pepper",
  "Gambino",
  "Window",
  "Pencil",
  "Fox",
  "Wolf",
  "Lion",
  "Mouse",
  "Giraffe",
  "Bicycle",
  "Boat",
  "Airplane",
  "Mountain",
  "Flower",
  "Wave",
  "Tree",
  "Stone",
];

export default async function nameGenerator() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * adjectives.length)];
  const newUsername = `${adjective}${noun}`;
  return await addUsername(newUsername);
}
