const express = require("express");
const router = express.router();

// Read habits from JSON file
function readHabits() {
  const habitsFile = fs.readFileSync("./data/habits.json");
  const habitsData = JSON.parse(habitsFile);
  return habitsData;
}

router.get("/habits", (req, res) => {
  const habits = readHabits();
  return habits;
});
