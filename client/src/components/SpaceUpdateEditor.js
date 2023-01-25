import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const SpaceUpdateEditor = (props) => {
  //   const [content, setContent] = useState(props.originalContent);
  const [name, setName] = useState(props.originalName);
  const [description, setDescription] = useState(props.originalDescription);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    let error = null;

    if (props.validate) {
      error = props.validate(name, description);
    }

    if (error && error.length !== 0) {
      setError(error);
    } else {
      props.handleSubmit(e);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack>
        <TextField
          value={name}
          fullWidth
          margin="normal"
          name="name"
          sx={{ backgroundColor: "white" }}
          onChange={handleChange}
          error={error.length !== 0}
          helperText={error}
          multiline
        />
        <TextField
          value={description}
          fullWidth
          margin="normal"
          name="description"
          sx={{ backgroundColor: "white" }}
          onChange={handleChange}
          error={error.length !== 0}
          helperText={error}
          multiline
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{ backgroundColor: "white", mt: 1 }}
        >
          Update
        </Button>
      </Stack>
    </Box>
  );
};

export default SpaceUpdateEditor;
