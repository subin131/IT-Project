const mongoose = require("mongoose");
const filter = require("../util/filter");
const PollSchema = new mongoose.Schema(
  {
    poller: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxLength: [80, "Must be no more than 80 characters"],
    },
    option1: {
      type: String,
      required: true,
      maxLength: [80, "Must be no more than 80 characters"],
    },
    option2: {
      type: String,
      required: true,
      maxLength: [80, "Must be no more than 80 characters"],
    },
  },
  { timestamps: true }
);

PollSchema.pre("save", function (next) {
  if (this.title.length > 0) {
    this.title = filter.clean(this.title);
  }
  next();
});
module.exports = mongoose.model("poll", PollSchema);
