const express = require("express");
const router = express.Router();
const paginate = require("../util/paginate");
const User = require("../models/User");
const Spaces = require("../models/Spaces");
const cooldown = new Set();

const createSpace = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!(name && description)) {
      throw new Error("All input required");
    }

    const space = await Spaces.create({
      name,
      description,
    });

    res.json(space);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getSpaces = async (req, res) => {
  try {
    const spaceId = req.params.id;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(spaceId)) {
      throw new Error("Space does not exist");
    }

    const space = await Spaces.findById(spaceId)
      .populate("poster", "-password")
      .lean();

    if (!space) {
      throw new Error("Space does not exist");
    }

    return res.status(200).json({ space });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createSpace,
  getSpaces,
};
