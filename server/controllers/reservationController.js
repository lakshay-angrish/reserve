const Reservation = require("../models/reservation");
const User = require("../models/user");

exports.getAllReservations = async (req, res, next) => {
  if (req.userData.userId !== req.params.ownerID) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
  Reservation.find({ owner: req.params.ownerID })
    .then((docs) => {
      res.status(200).send(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message
      });
    });
};

exports.createReservation = async (req, res, next) => {
  if (req.userData.userId !== req.params.ownerID) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
  User.findById(req.params.ownerID)
    .then((owner) => {
      if (!owner) throw new Error("Owner Does Not Exist");

      const reservation = new Reservation({
        owner: req.params.ownerID,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        date: req.body.date,
        time: req.body.time,
      });

      return reservation.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        id: result._id,
        message: "Reservation Created",
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.message
      });
    });
};

exports.updateReservation = async (req, res, next) => {
  if (req.userData.userId !== req.body.ownerID) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
  Reservation.findByIdAndUpdate(req.params.reservationID, {
    $set: { date: req.body.date, time: req.body.time },
  })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
          error: err.message
      });
    });
};

exports.deleteReservation = async (req, res, next) => {
  if (req.userData.userId !== req.body.ownerID) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
  Reservation.findByIdAndDelete(req.params.reservationID)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
          error: err.message
      });
    });
};
