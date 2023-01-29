const mongoose = require("mongoose");
const Post = require("../models/Post");
const SpacePost = require("../models/SpacePost");
const User = require("../models/User");
const Comment = require("../models/Comment");
const PostLike = require("../models/PostLike");
const paginate = require("../util/paginate");
const { populate } = require("../models/PostLike");
const SpacePostLike = require("../models/SpacePostLike");

const cooldown = new Set();

const createSpacePost = async (req, res) => {
  try {
    const { title, content, userId, picturePath } = req.body;

    if (!(title && content)) {
      throw new Error("All input required");
    }

    if (cooldown.has(userId)) {
      throw new Error(
        "You are posting too frequently. Please try again shortly."
      );
    }

    cooldown.add(userId);
    setTimeout(() => {
      cooldown.delete(userId);
    }, 60000);

    const spacePost = await SpacePost.create({
      title,
      content,
      spacePoster: userId,
      picturePath,
    });

    res.json(spacePost);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getSpacePost = async (req, res) => {
  try {
    const spacePostId = req.params.id;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(spacePostId)) {
      throw new Error("Post does not exist");
    }

    const spacePost = await SpacePost.findById(spacePostId)
      .populate("spacePoster", "-password")
      .lean();

    if (!spacePost) {
      throw new Error("Post does not exist");
    }
    if (userId) {
      await setLiked([spacePost], userId);
    }
    res.json(spacePost);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const updateSpacePost = async (req, res) => {
  try {
    const spacePostId = req.params.id;
    const { content, userId, isAdmin } = req.body;

    const spacePost = await SpacePost.findById(spacePostId);

    if (!spacePost) {
      throw new Error("Post does not exist");
    }

    if (spacePost.spacePoster.toString() !== userId && !isAdmin) {
      throw new Error("You are not authorized to edit this post");
    }

    spacePost.content = content;
    spacePost.edited = true;

    await spacePost.save();
    return res.json(spacePost);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const deleteSpacePost = async (req, res) => {
  try {
    const spacePostId = req.params.id;
    const { userId, isAdmin } = req.body;

    const spacePost = await SpacePost.findById(spacePostId);

    if (!spacePost) {
      throw new Error("Post does not exist");
    }

    if (spacePost.spacePoster.toString() !== userId && !isAdmin) {
      throw new Error("You are not authorized to delete this post");
    }

    await spacePost.remove();

    await Comment.deleteMany({ post: spacePostId });

    return res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const getSpacePosts = async (req, res) => {
  try {
    const { userId } = req.body;
    let { page, sortBy, author, search, liked } = req.query;

    if (!sortBy) sortBy = "createdAt";
    if (!page) page = 1;

    let spacePost = await SpacePost.find({})
      .populate("spacePoster", "-password")
      .lean();

    if (author) {
      spacePost = spacePost.filter(
        (post) => post.spacePoster._id.toString() === author
      );
    }

    if (search) {
      spacePost = spacePost.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    const count = spacePost.length;
    spacePost = paginate(spacePost, page, 10);

    if (userId) {
      await setLiked(spacePost, userId);
    }
    return res.json({ data: spacePost, count });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const setLiked = async (spacePost, userId) => {
  let searchCondition = {};
  if (userId) searchCondition = { userId };
  const spacePostLikes = await SpacePostLike.find(searchCondition);

  spacePost.forEach((spacePost) => {
    spacePostLikes.forEach((spacePostLike) => {
      if (spacePostLike.spacePostId.equals(spacePost._id)) {
        spacePost.liked = true;
        return;
      }
    });
  });
};

const getUserLikedPosts = async (req, res) => {
  try {
    const likerId = req.params.id;
    const { userId } = req.body;
    let { page, sortBy } = req.query;

    if (!sortBy) sortBy = "createdAt";
    if (!page) page = 1;

    let spacePosts = await SpacePostLike.find({ userId: likerId })
      .sort(sortBy)
      .populate({
        path: "spacePostId",
        populate: { path: "spacePoster", select: "-password" },
      })
      .lean();

    spacePosts = paginate(spacePosts, page, 10);
    const count = spacePosts.length;

    let responseSpacePosts = [];
    spacePosts.forEach((spacePost) => {
      responseSpacePosts.push(spacePost.spacePostId);
    });
    if (userId) {
      await setLiked(responseSpacePosts, userId);
    }
    return res.json({ data: responseSpacePosts, count });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

const likeSpacePost = async (req, res) => {
  try {
    const spacePostId = req.params.id;
    const { userId } = req.body;

    const spacePost = await SpacePost.findById(spacePostId);
    if (!spacePost) {
      throw new Error("Post does not exist");
    }

    const existingSpacePostLike = await SpacePost.findOne({
      spacePostId,
      userId,
    });

    if (existingSpacePostLike) {
      throw new Error("You have already liked this post");
    }
    await SpacePostLike.create({ spacePostId, userId });
    spacePost.likeCount = (await SpacePostLike.find({ spacePostId })).length;
    await spacePost.save();
    return res.json({ success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const unlikeSpacePost = async (req, res) => {
  try {
    const spacePostId = req.params.id;
    const { userId } = req.body;

    const spacePost = await SpacePost.findById(spacePostId);
    if (!spacePost) {
      throw new Error("Post does not exist");
    }

    const existingSpacePostLike = await SpacePostLike.findOne({
      spacePostId,
      userId,
    });

    if (!existingSpacePostLike) {
      throw new Error("You have not liked this post");
    }
    await existingSpacePostLike.remove();
    spacePost.likeCount = (await SpacePostLike.find({ spacePostId })).length;
    await spacePost.save();
    return res.json({ success: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
module.exports = {
  getSpacePost,
  getSpacePosts,
  createSpacePost,
  updateSpacePost,
  deleteSpacePost,
  likeSpacePost,
  unlikeSpacePost,
  getUserLikedPosts,
};
