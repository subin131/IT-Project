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
// import FlexBetween from "./FlexBetween";
// import Dropzone from "react-dropzone";
// import {
//   EditOutlined,
//   DeleteOutlined,
//   AttachFileOutlined,
//   GifBoxOutlined,
//   ImageOutlined,
//   MicOutlined,
//   MoreHorizOutlined,
// } from "@mui/icons-material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import ErrorAlert from "./ErrorAlert";
import { isLoggedIn } from "../helpers/authHelper";
import HorizontalStack from "./util/HorizontalStack";
import UserAvatar from "./UserAvatar";

const PostEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [formData, setFormData] = useState("");

  //image upload
  useEffect(() => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      console.log("image url", imageUrl);
      setImageURL(imageUrl);
    }
  }, [image]);

  console.log("image parent url", imageURL);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  const handleChange = (e) => {
    if (e.target.name === "picturePath") {
      setImage(e.target.files[0]);
    }
    setImage(imageURL);
    setTitle(e.target.value);
    setContent(e.target.value);
    setFormData({ ...formData, title, content, picturePath: image });

    const errors = validate();
    setErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await createPost(formData, isLoggedIn());
    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
    } else {
      navigate("/posts/" + data._id);
    }
    setImage(null);
    console.log(formData);
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
              What would you like to post today {user.username}?
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
          <TextField type="file" name="picturePath" onChange={handleChange} />

          {/* Image Upload start */}
          {/* {isImage && (
            <Box
              border={`1px solid black`}
              borderRadius="5px"
              mt="1rem"
              p="1rem"
              name="picturePath"
              onChange={handleChange}
            >
              <Dropzone
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                multiple={false}
                accept="image/*"
              >
                {({ getRootProps, getInputProps }) => (
                  <FlexBetween>
                    <Box
                      {...getRootProps()}
                      border={`2px dashed black`}
                      p="1rem"
                      width="100%"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {!image ? (
                        <p>Add Image Here</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{image.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                    {image && (
                      <IconButton
                        onClick={() => setImage(null)}
                        sx={{ width: "15%" }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    )}
                  </FlexBetween>
                )}
              </Dropzone>
            </Box>
          )}

          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <Typography
              style={{ display: "flex" }}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  color: "black",
                },
              }}
              name="picturePath"
              onChange={handleChange}
            >
              <ImageOutlined sx={{ color: "black" }} />
              Image
            </Typography>
          </FlexBetween> */}
          {/* Imgage Upload end  */}

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

export default PostEditor;
