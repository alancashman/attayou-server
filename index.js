const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const app = express();
const habitsRoutes = require("./routes/habitsRoutes");

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));
app.use("/habits", habitsRoutes);

/////////////////////////
// JSON ROUTING
/////////////////////////

//// READ HABITS

function readHabits() {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/habits.json", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        // console.log("Data ", data);
        const habitsData = JSON.parse(data);
        resolve(habitsData);
      }
    });
  });
}

////// WRITE HABITS

function writeHabits(data) {
  const stringifiedData = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fs.writeFile("./data/habits.json", stringifiedData, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// // GET habits
// app.get("/habits", async (req, res) => {
//   try {
//     const habits = await readHabits();
//     res.send(habits);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Failed to read habits data");
//   }
// });

// // POST new habit
// app.post("/habits", (req, res) => {
//   readHabits()
//     .then((habitsData) => {
//       if (!habitsData) {
//         res.status(404).send("No habit data!");
//       }
//       console.log(habitsData);
//       const name = req.body.name;
//       const description = req.body.description;
//       if (!name) {
//         res.status(400).send("New habits must have a name!");
//         return;
//       }
//       const newHabit = {
//         id: uuid(),
//         name,
//         history: [
//           {
//             date: new Date(Date.now()).toISOString().slice(0, 10),
//             done: false,
//           },
//         ],
//         description,
//         user_id: 1,
//       };
//       habitsData.push(newHabit);
//       writeHabits(habitsData);
//       res.status(201).send(newHabit);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// });

// // PUT habit (to adjust done status)
// app.put("/habits/:habitId", async (req, res) => {
//   try {
//     const habits = await readHabits();
//     // let { habitId } = req.params;
//     const { id: habitId, history } = req.body;
//     console.log("Req.body: ", req.body);
//     const habit = habits.find((habit) => habit.id === habitId);
//     if (!habit) {
//       return res.status(404).send("Habit not found!");
//     } else {
//       habit.history = history;
//       // return habit;
//     }
//     writeHabits(habits);
//     res.status(200).send("Done status toggled successfully");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Failed to read habits data");
//   }
// });

// // DELETE habit

// app.delete("/habits/:habitId", async (req, res) => {
//   try {
//     let habits = await readHabits();
//     const { habitId } = req.params;
//     console.log(`Habit id: `, habitId);
//     const foundHabit = habits.find((habit) => habit.id === habitId);
//     console.log("found habit: ", foundHabit);
//     habits = habits.filter((habit) => habit !== foundHabit);
//     writeHabits(habits);
//     res.status(204).send("Deleted");
//   } catch (err) {
//     console.error("Could not delete habit");
//   }
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
