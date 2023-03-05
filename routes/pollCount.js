const express = require("express");
const router = express.Router();
const pollCountControllers = require("../controllers/pollCountController");
const { verifyToken, optionallyVerifyToken } = require("../middleware/auth");

router.get("/:id", optionallyVerifyToken, pollCountControllers.getPoll);
router.post("/", verifyToken, pollCountControllers.createPollCount);

module.exports = router;
