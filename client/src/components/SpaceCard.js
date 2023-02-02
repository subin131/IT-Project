import { Card, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { AiFillCheckCircle, AiFillEdit, AiFillMessage } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { deleteSpace, updateSpace } from "../api/spaces";
import { isLoggedIn } from "../helpers/authHelper";

import SpaceContentBox from "./SpaceContentBox";
import HorizontalStack from "./util/HorizontalStack";

import SpaceUpdateEditor from "./SpaceUpdateEditor";
import Markdown from "./Markdown";

import "./postCard.css";
import { MdCancel } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import SpaceDetails from "./SpaceDetails";

const SpaceCard = (props) => {
  const { preview, removeSpace } = props;
  let spaceData = props.space;

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = isLoggedIn();

  const isAuthor = user && user.username === spaceData.spacer.username;

  const theme = useTheme();
  const iconColor = theme.palette.primary.main;
  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [space, setSpace] = useState(spaceData);
  let maxHeight = null;
  if (preview === "primary") {
    maxHeight = 250;
  }

  const handleDeleteSpace = async (e) => {
    e.stopPropagation();

    if (!confirm) {
      setConfirm(true);
    } else {
      setLoading(true);
      await deleteSpace(space._id, isLoggedIn());
      setLoading(false);
      if (preview) {
        removeSpace(space);
      } else {
        navigate("/community");
      }
    }
  };

  const handleEditSpace = async (e) => {
    e.stopPropagation();
    setEditing(!editing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const description = e.target.description.value;
    await updateSpace(space._id, isLoggedIn(), { name, description });
    setSpace({ ...space, name, description, edited: true });
    setEditing(false);
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
          ></Stack>
          <SpaceContentBox clickable={preview} space={space} editing={editing}>
            <HorizontalStack justifyContent="space-between">
              <SpaceDetails
                createdAt={space.createdAt}
                //   edited={post.edited}
                preview={preview === "secondary"}
              />

              <Box>
                {user &&
                  (isAuthor || user.isAdmin) &&
                  preview !== "secondary" && (
                    <HorizontalStack>
                      <IconButton
                        disabled={loading}
                        size="small"
                        onClick={handleEditSpace}
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
                        onClick={handleDeleteSpace}
                      >
                        {confirm ? (
                          <AiFillCheckCircle color={theme.palette.error.main} />
                        ) : (
                          <BiTrash color={theme.palette.error.main} />
                        )}
                      </IconButton>
                    </HorizontalStack>
                  )}
              </Box>
            </HorizontalStack>

            <Typography
              variant="h5"
              gutterBottom
              sx={{ overflow: "hidden", mt: 1, maxHeight: 125 }}
              className="title"
            >
              {space.name}
            </Typography>

            {preview !== "secondary" &&
              (editing ? (
                <SpaceUpdateEditor
                  handleSubmit={handleSubmit}
                  originalName={space.name}
                  originalDescription={space.description}
                />
              ) : (
                <Box
                  maxHeight={maxHeight}
                  overflow="hidden"
                  className="content"
                >
                  <Markdown content={space.description} />
                </Box>
              ))}
          </SpaceContentBox>
        </HorizontalStack>
      </Box>
    </Card>
  );
};

export default SpaceCard;
