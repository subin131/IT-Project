import { Typography } from "@mui/material";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const GoBackSpaces = () => {
  const space = useParams();
  return (
    <Typography sx={{ mb: 2 }}>
      <Link
        style={{ display: "flex", textDecoration: "none", color: "#00d5fa" }}
        to={`/spaces/${space.id}`}
      >
        {" "}
        <BiLogOut
          style={{ width: "20px", height: "20px", marginRight: "5px" }}
        />{" "}
        Go back to spaces
      </Link>
    </Typography>
  );
};

export default GoBackSpaces;
