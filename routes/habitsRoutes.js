const router = require("express").Router();
const habitsController = require("../controllers/habitsController");

router.route("/").get(habitsController.index).post(habitsController.addHabit);

router.route("/history").get(habitsController.getHistory);

router
  .route("/:id")
  .get(habitsController.habitHistory)
  .post(habitsController.addHistory)
  .put(habitsController.adjustHistory)
  .delete(habitsController.deleteHabit);

module.exports = router;
