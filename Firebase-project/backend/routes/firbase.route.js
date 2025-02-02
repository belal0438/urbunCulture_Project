const express = require("express");

const firebaseContollers = require("../controllers/firbase.controllers");

const router = express.Router();

router.post("/add-booking", firebaseContollers.fetchBookings);

router.get("/add-booking/:id", firebaseContollers.GstCalculateInvoic);

module.exports = router;
