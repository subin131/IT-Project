import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const GoBack = () => {
  return (
    <Typography sx={{ mb: 2 }}>
      <Link
        style={{ display: "flex", textDecoration: "none", color: "#00d5fa" }}
        to="/"
      >
        {" "}
        <BiLogOut
          style={{ width: "20px", height: "20px", marginRight: "5px" }}
        />{" "}
        Go back to posts
      </Link>
    </Typography>
  );
};

export default GoBack;
