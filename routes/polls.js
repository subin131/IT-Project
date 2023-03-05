const express = require("express");
const router = express.Router();
const pollControllers = require("../controllers/pollControllers");
const { verifyToken, optionallyVerifyToken } = require("../middleware/auth");

router.get("/", optionallyVerifyToken, pollControllers.getPolls);
router.post("/", verifyToken, pollControllers.createPoll);

module.exports = router;
