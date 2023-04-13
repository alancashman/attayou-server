const router = require("express").Router();
const habitsController = require("../controllers/habitsController");

router.route("/").get(habitsController.index).post(habitsController.addHabit);

module.exports = router;
