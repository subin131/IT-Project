import { useTheme } from "@emotion/react";
import { autocompleteClasses, Box, Card, CardActionArea } from "@mui/material";
import React from "react";
import "react-router-dom";
import { useNavigate } from "react-router-dom";

const SpaceContentBox = (props) => {
  const { clickable, space, editing } = props;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      {clickable && !editing ? (
        <Box
          sx={{
            padding: theme.spacing(2),
            width: "92%",
            "&:hover": { backgroundColor: "grey.50", cursor: "pointer" },
          }}
          onClick={() => navigate("/spaces/" + space._id)}
        >
          {props.children}
        </Box>
      ) : (
        <Box sx={{ padding: theme.spacing(2), width: "90%" }}>
          {props.children}
        </Box>
      )}
    </>
  );
};

export default SpaceContentBox;
