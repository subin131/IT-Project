import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { getPosts } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import CreatePoll from "./CreatePoll";
import FindUsers from "./FindUsers";
import Footer from "./Footer";
import Loading from "./Loading";
import PollPosts from "./PollPosts";
import TopPosts from "./TopPosts";

const Sidebar = () => {
  return (
    <Stack spacing={2}>
      <CreatePoll />
      <PollPosts />
      <TopPosts />
      <FindUsers />
      <Footer />
    </Stack>
  );
};

export default Sidebar;
