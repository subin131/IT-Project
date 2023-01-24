const express = require("express");
const router = express.Router();
const spaceControllers = require("../controllers/spaceControllers");
const { verifyToken, optionallyVerifyToken } = require("../middleware/auth");

router.get("/", optionallyVerifyToken, spaceControllers.getSpaces);
router.post("/", verifyToken, spaceControllers.createSpace);

router.get("/:id", optionallyVerifyToken, spaceControllers.getSpaces);

module.exports = router;
