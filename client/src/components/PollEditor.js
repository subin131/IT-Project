import {
  Button,
  Card,
  // Link,
  Stack,
  TextField,
  // IconButton,
  Typography,
  // Divider,
} from "@mui/material";

import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPoll } from "../api/poll";
import ErrorAlert from "./ErrorAlert";
import { isLoggedIn } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";

const PollEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    option1: "",
    option2: "",
  });

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    const errors = validate();
    setErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const pollData = { ...formData };
    console.log("pollData", pollData);
    const data = await createPoll(pollData, isLoggedIn());
    // console.log("poll count data", data);
    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
    } else {
      navigate("/");
    }
  };

  const validate = () => {
    const errors = {};

    return errors;
  };

  return (
    <Card>
      <Stack spacing={1}>
        {user && (
          <HorizontalStack spacing={2}>
            <UserAvatar width={50} height={50} username={user.username} />
            <Typography variant="h5">
              What is your Poll Today {user.username}?
            </Typography>
          </HorizontalStack>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            required
            name="title"
            margin="normal"
            onChange={handleChange}
            error={errors.title !== undefined}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            label="Option 1"
            required
            name="option1"
            margin="normal"
            onChange={handleChange}
            error={errors.option !== undefined}
            helperText={errors.option}
          />
          <TextField
            fullWidth
            label="Option 2"
            required
            name="option2"
            margin="normal"
            onChange={handleChange}
            error={errors.option !== undefined}
            helperText={errors.option}
          />

          <ErrorAlert error={serverError} />
          <Button
            style={{ color: "#00d5fa", borderColor: "#00d5fa" }}
            variant="outlined"
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
            }}
          >
            {loading ? <>Submitting</> : <>Submit</>}
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default PollEditor;
