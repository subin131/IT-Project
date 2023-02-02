import { Card, Tab, Tabs } from "@mui/material";
import React from "react";
import "./DashboardSpace.css";
import { BsFillFilePostFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { BiCommentCheck } from "react-icons/bi";
const DashboardSpace = (props) => {
  return (
    <Card sx={{ padding: 0 }}>
      <div className="label">
        <div className="text-icon">
          <h4 style={{ color: "#00d5fa" }}>Posts</h4>
          <BsFillFilePostFill fontSize={"20px"} />
          <h4>{props.count}</h4>
        </div>

        <div className="text-icon">
          <h4 style={{ color: "#00d5fa" }}>Likes</h4>
          <AiOutlineLike fontSize={"20px"} />
          <h4></h4>
        </div>
        <div className="text-icon">
          <h4 style={{ color: "#00d5fa" }}>Comments</h4>
          <BiCommentCheck fontSize={"20px"} />
          <h4>0</h4>
        </div>
      </div>
    </Card>
  );
};

export default DashboardSpace;
