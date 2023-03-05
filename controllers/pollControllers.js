const mongoose = require("mongoose");
const Poll = require("../models/Poll");
const User = require("../models/User");

const createPoll = async (req, res) => {
  try {
    const { title, option1, option2, userId } = req.body;
    console.log(req.body);

    const poll = await Poll.create({
      title,
      poller: userId,
      option1,
      option2,
    });
    res.json(poll);
    console.log("poll", poll);
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

const getPolls = async (req, res) => {
  try {
    const { userId } = req.body;
    const polls = await Poll.find().populate("poller", "-password").lean();

    return res.json(polls);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = { createPoll, getPoll, getPolls };
