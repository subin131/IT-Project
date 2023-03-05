const mongoose = require("mongoose");
const PollCount = require("../models/PollCount");
const User = require("../models/User");

const createPollCount = async (req, res) => {
  try {
    const { option, userId, optionId } = req.body;
    console.log("option", option);
    console.log("userId", userId);
    console.log("optionId", optionId);
    const pollcount = await PollCount.create({
      poller: userId,
      optionId: optionId,
      selectedOption: option,
    });
    res.json(pollcount);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
const getPoll = async (req, res) => {
  try {
    const pollId = req.params.id;
    const { userId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(pollId)) {
      throw new Error("Poll does not exist");
    }
    const poll = await Poll.findById(pollId)
      .populate("poller", "-password")
      .lean();
    if (!poll) {
      throw new Error("Poll does not exist");
    }
    if (userId) {
      await setLiked([poll], userId);
    }
    return res.json(poll);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = { createPollCount, getPoll };
