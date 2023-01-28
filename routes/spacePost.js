const express = require("express");
const router = express.Router();

const spacePostControllers = require("../controllers/spacePostControllers");
const { verifyToken, optionallyVerifyToken } = require("../middleware/auth");

router.get("/", optionallyVerifyToken, spacePostControllers.getSpacePosts);
router.post("/", verifyToken, spacePostControllers.createSpacePost);
router.get("/:id", optionallyVerifyToken, spacePostControllers.getSpacePost);
router.patch("/:id", verifyToken, spacePostControllers.updateSpacePost);
router.delete("/:id", verifyToken, spacePostControllers.deleteSpacePost);

router.post("/like/:id", verifyToken, spacePostControllers.likeSpacePost);
router.delete("/like/:id", verifyToken, spacePostControllers.unlikeSpacePost);
router.get(
  "/liked/:id",
  optionallyVerifyToken,
  spacePostControllers.getUserLikedSpacePosts
);
