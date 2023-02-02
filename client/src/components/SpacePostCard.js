import { Card, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import {
  deleteSpacePost,
  likeSpacePost,
  unlikeSpacePost,
  updateSpacePost,
} from "../api/spacePost";
import { isLoggedIn } from "../helpers/authHelper";
import ContentDetails from "./ContentDetails";
import LikeBox from "./LikeBox";

import HorizontalStack from "./util/HorizontalStack";

import "./postCard.css";
import { MdCancel } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import SpacePostContentBox from "./SpacePostContentBox";
import Markdown from "./Markdown";
import ContentUpdateEditor from "./ContentUpdateEditor";

const SpacePostCard = (props) => {
  const { preview, removeSpacePost } = props;
  let spacePostData = props.spacePost;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = isLoggedIn();
  const isAuthor = user && user.username === spacePostData.spacePoster.username;
  const theme = useTheme();

  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [spacePost, setSpacePost] = useState(spacePostData);
  const [likeCount, setLikeCount] = useState(spacePost.likeCount);

  let maxHeight = null;
  if (preview === "primary") {
    maxHeight = 250;
  }

  const handleDeleteSpacePost = async (e) => {
    e.stopPropagation();

    if (!confirm) {
      setConfirm(true);
    } else {
      setLoading(true);
      await deleteSpacePost(spacePost._id, isLoggedIn());
      setLoading(false);
      if (preview) {
        removeSpacePost(spacePost);
      } else {
        navigate("/spaces");
      }
    }
  };

  const handleEditSpacePost = async (e) => {
    e.stopPropagation();

    setEditing(!editing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    await updateSpacePost(spacePost._id, isLoggedIn(), { content });
    setSpacePost({ ...spacePost, content, edited: true });
    setEditing(false);
  };

  const handleLikeSpacePost = async (e) => {
    e.stopPropagation();
    if (user) {
      if (spacePost.liked) {
        await unlikeSpacePost(spacePost._id, user);
        setLikeCount(likeCount - 1);
      } else {
        await likeSpacePost(spacePost._id, user);
        setLikeCount(likeCount + 1);
      }
      setSpacePost({ ...spacePost, liked: !spacePost.liked });
    } else {
      navigate("/login");
    }
  };

  return (
    <Card sx={{ padding: 0 }} className="post-card">
      <Box className={preview}>
        <HorizontalStack spacing={0} alignItems="initial">
          <Stack
            justifyContent="space-between "
            alignItems="center"
            spacing={1}
            sx={{
              backgroundColor: "grey.100",
              width: "50px",
              padding: theme.spacing(1),
            }}
          >
            <LikeBox
              liked={spacePost.liked}
              likeCount={likeCount}
              onLike={handleLikeSpacePost}
            />
          </Stack>
          <SpacePostContentBox clickable={preview} spacePost={spacePost} />
          <HorizontalStack justifyContent="space-between">
            {/* <ContentDetails
              username={spacePost.spacePoster.username}
              createdAt={spacePost.createdAt}
              edited={spacePost.edited}
              preview={preview === "secondary"}
            /> */}
            <Box>
              {(user && isAuthor) ||
                (user.isAdmin && preview !== "secondary" && (
                  <HorizontalStack>
                    <IconButton
                      disabled={loading}
                      size="small"
                      onClick={handleEditSpacePost}
                    >
                      {editing ? (
                        <MdCancel color={"red"} />
                      ) : (
                        <FiEdit color={"#00d5fa"} />
                      )}
                    </IconButton>
                    <IconButton
                      disabled={loading}
                      size="small"
                      onClick={handleDeleteSpacePost}
                    >
                      {confirm ? (
                        <AiFillCheckCircle color={theme.palette.error.main} />
                      ) : (
                        <BiTrash color={theme.palette.error.main} />
                      )}
                    </IconButton>
                  </HorizontalStack>
                ))}
            </Box>
          </HorizontalStack>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ overflow: "hidden", mt: 1, maxHeight: 125 }}
            className="title"
          >
            {spacePost.title}
          </Typography>

          {preview !== "secondary" &&
            (editing ? (
              <ContentUpdateEditor
                handleSubmit={handleSubmit}
                originalContent={spacePost.content}
              />
            ) : (
              <Box maxHeight={maxHeight} overflow="hidden" className="content">
                <Markdown content={spacePost.content} />
                {spacePost.picturePath && (
                  <div>
                    <img
                      className="image-section"
                      src={`${spacePost.picturePath}`}
                      alt="post"
                    />{" "}
                  </div>
                )}
              </Box>
            ))}

          <HorizontalStack sx={{ mt: 1 }}>
            <BiCommentDetail />
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontWeight: "bold" }}
            >
              {spacePost.commentCount}
            </Typography>
          </HorizontalStack>

          <SpacePostContentBox />
        </HorizontalStack>
      </Box>
    </Card>
  );
};
export default SpacePostCard;
