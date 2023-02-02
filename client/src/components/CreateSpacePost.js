import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";
import { useParams } from "react-router-dom";
const CreateSpacePost = () => {
  const navigate = useNavigate();
  const space = useParams();

  return (
    <Button
      style={{
        color: "#00d5fa",

        border: "1px solid #00d5fa",
      }}
      variant="outlined"
      size="medium"
      onClick={() => navigate("/spaces/posts/create/" + space.id)}
      sx={{
        gap: "0.2rem",
        whiteSpace: "nowrap",
      }}
    >
      <MdOutlineAddCircle style={{ flexShrink: 0 }} />
      <span> Add Post in Your Space</span>
    </Button>
  );
};

export default CreateSpacePost;
