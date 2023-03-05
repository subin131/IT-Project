const mongoose = require("mongoose");
const PollCountSchema = new mongoose.Schema(
  {
    poller: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    optionId: {
      type: mongoose.Types.ObjectId,
      ref: "poll",
      required: true,
    },
    selectedOption: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pollcount", PollCountSchema);

/*
{
    poller: 897ddsf,
    optionId: 897ddsf,
    selectedOption: "yes"
}

{
    poller: 897ddsf,
    optionId: 897ddsf,
    selectedOption: "no"
}


{
    poller: 897ddsf,
    optionId: 897ddsf,
    selectedOption: "yes"
}

{
    poller: 897ddsf,
    optionId: 897ddsf,
    selectedOption: "yes"
}



[
    {option: yes, count: 3},
    {option: no, count: 1}
]
*/
