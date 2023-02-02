import { Button, Card, Stack, TextField, Typography } from "@mui/material";

import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSpacePost } from "../api/spacePost";
import ErrorAlert from "./ErrorAlert";
import { isLoggedIn } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";

const SpacePostEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  const imageHandleChange = (e) => {
    setImage(e.target.files[0]);
  };

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
    const spacePostObj = { ...formData, image: image };
    console.log("spacePostObj", spacePostObj);
    const spaceData = await createSpacePost(spacePostObj, isLoggedIn());
    console.log("Space editor", spaceData);
    setLoading(false);
    if (spaceData && spaceData.error) {
      setServerError(spaceData.error);
    } else {
      console.log("data", spaceData);
      navigate("/spaces/");
    }
    setImage(null);

    // console.log("formdata", postObj);
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
              What would you like to post today in your space {user.username}?
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
            label="Content"
            multiline
            rows={10}
            name="content"
            margin="normal"
            onChange={handleChange}
            error={errors.content !== undefined}
            helperText={errors.content}
            required
          />
          <TextField type="file" name="image" onChange={imageHandleChange} />

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

export default SpacePostEditor;
