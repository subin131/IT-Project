import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="subtitle1" color="text.secondary">
      Copyright ©{" "}
      <Link
        style={{ color: "#00d5fa", textDecoration: "none" }}
        to="/"
        color="inherit"
      >
        CDP
      </Link>
    </Typography>
  );
};

export default Copyright;
