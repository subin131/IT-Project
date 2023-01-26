const mongoose = require("mongoose");

const SpacePostLike = new mongoose.Schema(
  {
    spacePostId: {
      type: mongoose.Types.ObjectId,
      ref: "post",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("spacePostLike", SpacePostLike);
