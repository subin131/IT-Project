import { Card, Tab, Tabs } from "@mui/material";
import React from "react";
import "./DashboardSpace.css";
import { BsFillFilePostFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { BiCommentCheck } from "react-icons/bi";
const SpaceLabel = (props) => {
  return (
    <Card sx={{ padding: 0 }}>
      <h3 style={{ display: "flex", justifyContent: "center" }}> Space</h3>
    </Card>
  );
};

export default SpaceLabel;
