// import seed data files, arrays of objects
const habitsData = require("../seed_data/habits");
const historyData = require("../seed_data/history");

exports.seed = function (knex) {
  return knex("habit")
    .del()
    .then(function () {
      return knex("history").del();
    })
    .then(function () {
      return knex("habit").insert(habitsData);
    })
    .then(() => {
      return knex("history").insert(historyData);
    });
};
