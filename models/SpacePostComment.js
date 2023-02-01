const mongoose = require("mongoose");
const SpacePost = require("./SpacePost");
const filter = require("../util/filter");

const SpacePostCommentSchema = new mongoose.Schema(
  {
    commenter: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    spacepost: {
      type: mongoose.Types.ObjectId,
      ref: "spacepost",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "spacepostcomment",
    },
    children: [
      {
        type: mongoose.Types.ObjectId,
        ref: "spacepostcomment",
      },
    ],
    edited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
SpacePostCommentSchema.post("remove", async function (res, next) {
  const comments = await this.model("spacepostcomment").find({
    parent: this._id,
  });
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    await comment.remove();
  }
  next();
});
const SpacePostComment = mongoose.model(
  "spacepostcomment",
  SpacePostCommentSchema
);
module.exports = SpacePostComment;
