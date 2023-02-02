import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBackSpaces from "../GoBackSpace";
import GridLayout from "../GridLayout";
import Loading from "../Loading";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import { isLoggedIn } from "../../helpers/authHelper";
import SpacePostCard from "../SpacePostCard";
import { getSpacePost, getSpacePosts } from "../../api/spacePost";

const SpacePostView = () => {
  const params = useParams();

  const [spacePost, setSpacePost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const user = isLoggedIn();

  const fetchSpacePost = async () => {
    setLoading(true);
    const data = await getSpacePosts(params.id, user && user.token);
    if (data.error) {
      setError(data.error);
    } else {
      setSpacePost(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSpacePost();
  }, [params.id]);

  return (
    <Container>
      <Navbar />
      <GoBackSpaces />
      <GridLayout
        left={
          loading ? (
            <Loading />
          ) : spacePost ? (
            <Stack spacing={2}>
              <SpacePostCard spacePost={spacePost} key={spacePost._id} />
            </Stack>
          ) : (
            error && <ErrorAlert error={error} />
          )
        }
      />
    </Container>
  );
};

export default SpacePostView;
