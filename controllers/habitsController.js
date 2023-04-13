const { v4: uuid } = require("uuid");
const knex = require("knex")(require("../knexfile"));

exports.index = (_req, res) => {
  knex("habits")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving habits: ${err}`);
    });
};

exports.addHabit = (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .send("Please include a name before submitting your habit");
  }
  const { name, description } = req.body;
  const newHabit = {
    id: uuid(),
    name,
    description,
    history: JSON.stringify([
      {
        date: new Date(Date.now()).toISOString().slice(0, 10),
        done: false,
      },
    ]),
    user_id: 1,
  };
  knex("habits")
    .insert(newHabit)
    .then((data) => {
      // For POST requests we need to respond with 201 and the location of the newly created record
      const newHabitUrl = `/habits/${newHabit.id}`;
      console.log(`Data: `, data);
      console.log("New Habit: ", newHabit);
      console.log("New Habit URL: ", newHabitUrl);
      res.status(201).location(newHabitUrl).send(newHabit);
    })
    .catch((err) => {
      res.status(500).send("Error creating new habit: ", err.message);
    });
};
