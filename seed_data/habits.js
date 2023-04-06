const { v4: uuid } = require("uuid");

module.exports = [
  {
    habit_id: uuid(),
    category: "Arts",
    name: "Photography",
    date: Date.now(),
    done: false,
    user_id: 1,
  },
  {
    habit_id: uuid(),
    category: "Education",
    name: "React",
    date: Date.now(),
    done: false,
    user_id: 1,
  },
  {
    habit_id: uuid(),
    category: "Athletics",
    name: "Running",
    date: Date.now(),
    done: false,
    user_id: 1,
  },
];
