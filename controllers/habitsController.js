const { v4: uuid } = require("uuid");
const knex = require("knex")(require("../knexfile"));

const habit = "habit";
const history = "history";

exports.index = (_req, res) => {
  knex("habit")
    .join("history", `${habit}.id`, "=", `${history}.habit_id`)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(`Error retrieving habits: ${err}`);
    });
};

// knex
//   .select(`${table1}.id as id1`, `${table2}.id as id2`, `${table1}.column_name as value1`, `${table2}.column_name as value2`) // Select the columns you need
//   .from(table1)
//   .join(table2, `${table1}.id`, '=', `${table2}.id`) // Join based on the id column
//   .then((results) => {
//     console.log(results); // Process the combined results here
//   })
//   .catch((error) => {
//     console.error(error);
//   });

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
