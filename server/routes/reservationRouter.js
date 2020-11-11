const router = require("express").Router();
const reservationController = require("../controllers/reservationController");
const checkAuth = require("../checkAuth");

router
  .route("/:ownerID")
  .get(checkAuth, reservationController.getAllReservations)
  .post(checkAuth, reservationController.createReservation);

router
  .route("/:reservationID")
  .patch(checkAuth, reservationController.updateReservation)
  .delete(checkAuth, reservationController.deleteReservation);

module.exports = router;
