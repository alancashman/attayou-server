const router = require("express").Router();
const habitsController = require("../controllers/habitsController");

router.route("/").get(habitsController.index).post(habitsController.addHabit);

router.route("/:id").delete(habitsController.deleteHabit);

module.exports = router;
