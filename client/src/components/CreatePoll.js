import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";

const CreatePoll = () => {
  const navigate = useNavigate();
  return (
    <Button
      style={{
        color: "#00d5fa",

        border: "1px solid #00d5fa",
      }}
      variant="outlined"
      size="medium"
      onClick={() => navigate("/poll/create")}
      sx={{
        gap: "0.2rem",
        whiteSpace: "nowrap",
      }}
    >
      <MdOutlineAddCircle style={{ flexShrink: 0 }} />
      <span> Create Poll</span>
    </Button>
  );
};

export default CreatePoll;
