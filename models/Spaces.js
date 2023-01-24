const mongoose = require("mongoose");
const filter = require("../util/filter");
const SpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: [80, "Must be no more than 80 characters"],
    },
    description: {
      type: String,
      required: true,
      maxLength: [8000, "Must be no more than 8000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

SpaceSchema.pre("save", function (next) {
  if (this.name.length > 0) {
    this.name = filter.clean(this.name);
  }
  if (this.description.length > 0) {
    this.description = filter.clean(this.description);
  }
  next();
});

module.exports = mongoose.model("space", SpaceSchema);
