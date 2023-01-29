const express = require("express");
const paginate = require("../util/paginate");
const User = require("../models/User");
const Spaces = require("../models/Spaces");
const mongoose = require("mongoose");

const createSpace = async (req, res) => {
  try {
    const { name, description, userId } = req.body;

    if (!(name && description)) {
      throw new Error("All input required");
    }

    const space = await Spaces.create({
      name,
      description,
      spacer: userId,
    });

    res.json(space);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getSpaces = async (req, res) => {
  try {
    const { userId } = req.body;

    let { page, author } = req.query;

    if (!page) {
      page = 1;
    }
    let spaces = await Spaces.find({ spacer: userId })
      .populate("spacer", "-password")
      .lean();

    if (author) {
      spaces = spaces.filter((space) => space.spacer.username == author);
    }
    let count = spaces.length;
    spaces = paginate(spaces, 10, page);
    return res.json({ data: spaces, count });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getSpace = async (req, res) => {
  try {
    const spaceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(spaceId)) {
      throw new Error("Space does not exist");
    }
    const space = await Spaces.findById(spaceId)
      .populate("spacer", "-password")
      .lean();
    if (!space) {
      throw new Error("Space does not exist");
    }
    return res.json(space);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const deleteSpace = async (req, res) => {
  try {
    const spaceId = req.params.id;
    const { userId, isAdmin } = req.body;

    const space = await Spaces.findById(spaceId);
    if (!space) {
      throw new Error("Space does not exist");
    }
    if (space.spacer != userId && !isAdmin) {
      throw new Error("You are not authorized to delete this space");
    }
    await space.remove();
    return res.json(space);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const updateSpace = async (req, res) => {
  try {
    const spaceId = req.params.id;
    const { userId, name, description, isAdmin } = req.body;

    const space = await Spaces.findById(spaceId);
    if (!space) {
      throw new Error("Space does not exist");
    }
    if (space.spacer != userId && !isAdmin) {
      throw new Error("You are not authorized to update this space");
    }
    space.name = name;
    space.description = description;
    space.edited = true;
    await space.save();

    return res.json(space);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createSpace,
  getSpaces,
  getSpace,
  deleteSpace,
  updateSpace,
};
