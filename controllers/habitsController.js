const { v4: uuid } = require("uuid");
const knex = require("knex")(require("../knexfile"));

const habit = "habit";
const history = "history";

exports.index = (_req, res) => {
  knex("habit")
    // .join("history", `${habit}.id`, "=", `${history}.habit_id`)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving habits: ${err}`);
    });
};

exports.habitHistory = (req, res) => {
  knex("habit")
    .where({ habit_id: req.params.id })
    .join("history", `${habit}.id`, "=", `${history}.habit_id`)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving habits: ${err}`);
    });
};

exports.getHistory = (req, res) => {
  knex("history")
    .join("habit", `${history}.habit_id`, `=`, `${habit}.id`)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving history: ${err}`);
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
  };
  knex("habit")
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

exports.addHistory = (req, res) => {
  console.log(req.body);
  const { habit_id, date, done } = req.body;
  knex("history")
    .insert({ habit_id, date, done, id: uuid() })
    .then(([insertedId]) => {
      console.log(insertedId);
      res.status(201).json({ id: insertedId });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.adjustHistory = (req, res) => {
  const { habit_id, date } = req.body;
  knex("history")
    .select("done")
    .where({ habit_id: habit_id, date: date })
    .then((data) => {
      if (data.length === 0) {
        console.log("No results found for that date");
        return;
      }
      const currentDoneStatus = data[0].done;
      const newDoneStatus = currentDoneStatus === 0 ? 1 : 0;
      knex("history")
        .where({ habit_id: habit_id, date: date })
        .update({ done: newDoneStatus })
        .then((data) => {
          console.log("Update successful");
          res.status(200).json(data);
        });
    })

    .catch((err) => {
      res.status(500).send("An error occurred while adjusting history: ", err);
    });
};

exports.deleteHabit = (req, res) => {
  knex("habit")
    .where({ id: req.params.id })
    .del()
    .then((data) => {
      res.send("Deleted habit with id " + req.params.id);
    })
    .catch((err) => {
      console.log(
        ("Error deleting habit with id ", req.params.id, err.message)
      );
      res.status(500).send("Error");
    });
};
