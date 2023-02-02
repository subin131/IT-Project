import { Box, Button, Card, Link, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  getSpacePost,
  getSpacePosts,
  getUserLikedSpacePosts,
} from "../api/spacePost";
import { isLoggedIn } from "../helpers/authHelper";
import CreateSpacePost from "./CreateSpacePost";
import DashboardSpace from "./DashboardSpace";
import Loading from "./Loading";
import SpacePostCard from "./SpacePostCard";
import HorizontalStack from "./util/HorizontalStack";

const SpacePostBrowse = (props) => {
  const [spacePosts, setSpacePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [count, setCount] = useState(0);
  const user = isLoggedIn();

  const [search] = useSearchParams();
  const [effect, setEffect] = useState(false);

  const searchExists =
    search && search.get("search") && search.get("search").length > 0;

  const fetchSpacePosts = async () => {
    setLoading(true);
    const newPage = page + 1;
    setPage(newPage);

    let query = {
      page: newPage,
    };
    let data;

    if (props.contentType === "spacePosts") {
      if (props.profileUser) query.author = props.profileUser.username;

      if (searchExists) query.search = search.get("search");
      data = await getSpacePosts(user.token, query);
      console.log("data", data);
    } else if (props.contentType === "liked") {
      data = await getUserLikedSpacePosts(
        props.profileUser._id,
        user && user.token,
        query
      );
    }
    if (data.data.length < 10) {
      setEnd(true);
    }
    setLoading(false);
    if (!data.error) {
      setSpacePosts([...spacePosts, ...data.data]);
      setCount(data.count);
    }
  };

  useEffect(() => {
    fetchSpacePosts();
  }, [sortBy, effect]);

  useEffect(() => {
    setSpacePosts([]);
    setPage(0);
    setEnd(false);
    setEffect(!effect);
  }, [search]);

  const removeSpacePost = (removedSpacePost) => {
    setSpacePosts(
      spacePosts.filter((spacePost) => spacePost.id !== removedSpacePost.id)
    );
  };
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <DashboardSpace count={count} />
      <Stack spacing={2}>
        {/* <Card>
          <HorizontalStack justifyContent="space-between">
            {props.createSpacePost && <CreateSpacePost />}
          </HorizontalStack>
        </Card> */}
        {searchExists && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Showing results for "{search.get("search")}"
            </Typography>
            <Typography color="text.secondary" variant="span">
              {count} results found
            </Typography>
          </Box>
        )}

        {spacePosts.map((spacePost, i) => (
          <SpacePostCard
            preview="primary"
            key={spacePost._id}
            spacePost={spacePost}
            removeSpacePost={removeSpacePost}
          />
        ))}

        {loading && <Loading />}
        {end ? (
          <Stack py={5} alignItems="center">
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {spacePosts.length > 0 ? (
                <>All Spaces have been viewed</>
              ) : (
                <>No spaces Posts available</>
              )}
            </Typography>
            <Button
              style={{ color: "#00d5fa" }}
              variant="text"
              size="small"
              onClick={handleBackToTop}
            >
              Back to top
            </Button>
          </Stack>
        ) : (
          !loading &&
          spacePosts &&
          spacePosts.length > 0 && (
            <Stack pt={2} pb={6} alignItems="center" spacing={2}>
              <Button
                style={{ backgroundColor: "#00d5fa" }}
                onClick={fetchSpacePosts}
                variant="contained"
              >
                Load more
              </Button>
              <Button
                style={{ color: "#00d5fa" }}
                variant="text"
                size="small"
                onClick={handleBackToTop}
              >
                Back to top
              </Button>
            </Stack>
          )
        )}
      </Stack>
    </>
  );
};
export default SpacePostBrowse;
