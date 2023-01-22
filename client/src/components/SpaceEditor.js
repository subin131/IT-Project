import {
  Button,
  Card,
  Container,
  // Link,
  Stack,
  TextField,
  // IconButton,
  Typography,
  // Divider,
} from "@mui/material";

import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSpace } from "../api/spaces";
import ErrorAlert from "./ErrorAlert";
import { isLoggedIn } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";
import Navbar from "./Navbar";
import GoBack from "./GoBack";
import GoBackCommunity from "./GoBackCommunity";

const SpaceEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
    const data = await createSpace(formData, isLoggedIn());
    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
    } else {
      navigate("/spaces/" + data._id);
    }

    console.log(formData);
  };

  const validate = () => {
    const errors = {};

    return errors;
  };

  return (
    <Container>
      <Navbar />
      <GoBackCommunity />
      <Card>
        <Stack spacing={1}>
          {user && (
            <HorizontalStack spacing={2}>
              <UserAvatar width={50} height={50} username={user.username} />
              <Typography variant="h5">
                Create Your Own Space:<b> {user.username}</b>
              </Typography>
            </HorizontalStack>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              required
              name="name"
              margin="normal"
              onChange={handleChange}
              error={errors.title !== undefined}
              helperText={errors.title}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={10}
              name="description"
              margin="normal"
              onChange={handleChange}
              error={errors.content !== undefined}
              helperText={errors.content}
              required
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
    </Container>
  );
};

export default SpaceEditor;
