// import seed data files, arrays of objects
const habitsData = require("../seed_data/habits");

exports.seed = function (knex) {
  console.log(habitsData);
  return knex("habits")
    .del()
    .then(function () {
      return knex("habits").insert(habitsData);
    });
  // .then(() => {
  //   return knex("habits").del();
  // });
};
