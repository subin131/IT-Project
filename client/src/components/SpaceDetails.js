import { Avatar, Typography } from "@mui/material";
import React from "react";
import HorizontalStack from "./util/HorizontalStack";
import Moment from "react-moment";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import "./ContentDetails.css";

const SpaceDetails = ({ createdAt, edited, preview }) => {
  return (
    <HorizontalStack sx={{}}>
      <UserAvatar width={30} height={30} />
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {/* <Link
          className="post-header"
          color="inherit"
          underline="hover"
          onClick={(e) => {
            e.stopPropagation();
          }}
          to={"/users/" + username}
        >
          {username}
        </Link> */}
        {!preview && (
          <>
            {" "}
            · <Moment fromNow>{createdAt}</Moment> {edited && <>(Edited)</>}
          </>
        )}
      </Typography>
    </HorizontalStack>
  );
};

export default SpaceDetails;
