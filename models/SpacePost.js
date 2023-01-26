const mongoose = require("mongoose");
const filter = require("../util/filter");
// const SpacePostLike = require("./PostLike");

const SpacePostSchema = new mongoose.Schema(
  {
    spacePoster: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxLength: [80, "Must be no more than 80 characters"],
    },
    content: {
      type: String,
      required: true,
      maxLength: [8000, "Must be no more than 8000 characters"],
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    edited: {
      type: Boolean,
      default: false,
    },
    picturePath: {
      type: String,
    },
  },
  { timestamps: true }
);

SpacePostSchema.pre("save", function (next) {
  if (this.title.length > 0) {
    this.title = filter.clean(this.title);
  }
  if (this.content.length > 0) {
    this.content = filter.clean(this.content);
  }
  next();
});
SpacePostSchema.pre("remove", async function (next) {
  console.log(this._id);
  await PostLike.deleteMany({ postId: this._id });
  next();
});

module.exports = mongoose.model("post", SpacePostSchema);
