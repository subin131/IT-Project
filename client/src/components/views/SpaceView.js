import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import GridLayout from "../GridLayout";
import Loading from "../Loading";
import Navbar from "../Navbar";
import SpaceCard from "../SpaceCard";
import { useParams } from "react-router-dom";
import { getSpace } from "../../api/spaces";
import ErrorAlert from "../ErrorAlert";
import { isLoggedIn } from "../../helpers/authHelper";
import GoBackCommunity from "../GoBackCommunity";
import CreateSpacePost from "../CreateSpacePost";
import SpaceLabel from "../SpaceLabel";
import { getSpacePosts } from "../../api/spacePost";
import SpacePostBrowse from "../SpacePostBrowse";

const SpaceView = () => {
  const params = useParams();

  const [space, setSpace] = useState(null);
  const [spacePost, setSpacePost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const user = isLoggedIn();

  const fetchSpace = async () => {
    setLoading(true);
    const data = await getSpace(params.id, user && user.token);
    if (data.error) {
      setError(data.error);
    } else {
      setSpace(data);
    }
    setLoading(false);
  };

  //fetching space posts
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
    fetchSpace();
    fetchSpacePost();
  }, [params.id]);

  return (
    <Container>
      <Navbar />
      <GoBackCommunity />
      <div style={{ marginBottom: "8px" }}>
        <SpaceLabel />
      </div>
      <GridLayout
        left={
          loading ? (
            <Loading />
          ) : space ? (
            <div>
              <Stack spacing={2}>
                <SpaceCard space={space} key={space._id} />
              </Stack>
              <SpacePostBrowse spacePost={spacePost} />
            </div>
          ) : (
            error && <ErrorAlert error={error} />
          )
        }
        right={<CreateSpacePost />}
      />
    </Container>
  );
};

export default SpaceView;
