const express = require("express");
const router = express.Router();
const postControllers = require("../controllers/postControllers");
const { verifyToken, optionallyVerifyToken } = require("../middleware/auth");

//importing the uploader middleware
const uploader = require("../middleware/uploader");

router.get("/", optionallyVerifyToken, postControllers.getPosts);

//post request to create a post
router.post(
  "/",
  uploader.single("image"),
  verifyToken,
  postControllers.createPost
);

router.get("/:id", optionallyVerifyToken, postControllers.getPost);
router.patch("/:id", verifyToken, postControllers.updatePost);
router.delete("/:id", verifyToken, postControllers.deletePost);

router.post("/like/:id", verifyToken, postControllers.likePost);
router.delete("/like/:id", verifyToken, postControllers.unlikePost);
router.get(
  "/liked/:id",
  optionallyVerifyToken,
  postControllers.getUserLikedPosts
);

module.exports = router;
