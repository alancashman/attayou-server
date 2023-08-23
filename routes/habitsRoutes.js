const router = require("express").Router();
const habitsController = require("../controllers/habitsController");

router.route("/").get(habitsController.index).post(habitsController.addHabit);

router
  .route("/:id")
  .get(habitsController.history)
  .post(habitsController.addHistory)
  .put(habitsController.adjustHistory)
  .delete(habitsController.deleteHabit);
// .delete(habitsController.deleteHistory);

module.exports = router;
