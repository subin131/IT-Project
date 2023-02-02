import { Button, Card, Link, Stack, Typography } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { MdSettingsInputAntenna } from "react-icons/md";
import { useLocation, useSearchParams } from "react-router-dom";
import { getSpaces } from "../api/spaces";
import { isLoggedIn } from "../helpers/authHelper";
import CreateSpace from "./CreateSpace";
import Loading from "./Loading";

import SpaceCard from "./SpaceCard";
import HorizontalStack from "./util/HorizontalStack";

const SpaceBrowser = (props) => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);
  const [count, setCount] = useState(0);
  const user = isLoggedIn();

  const [search] = useSearchParams();
  const [effect, setEffect] = useState(false);

  const fetchSpaces = async () => {
    setLoading(true);
    const newPage = page + 1;
    setPage(newPage);

    let query = {
      page: newPage,
    };
    let data;
    if (props.contentType === "spaces") {
      if (props.profileUser) query.author = props.profileUser.username;

      data = await getSpaces(user && user.token, query);
      console.log(data);
    }
    setLoading(false);
    if (!data.error) {
      setSpaces([...spaces, ...data.data]);
      setCount(data.count);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, [effect]);

  useEffect(() => {
    setSpaces([]);
    setPage(0);
    setEnd(false);
    setEffect(!effect);
  }, [search]);

  // const handleSortBy = (e) => {
  //   const newSortName = e.target.value;
  //   let newSortBy;

  //   Object.keys(sorts).forEach((sortName) => {
  //     if (sorts[sortName] === newSortName) newSortBy = sortName;
  //   });

  //   setSpaces([]);
  //   setPage(0);
  //   setEnd(false);
  //   setSortBy(newSortBy);
  // };

  const removeSpace = (removedSpace) => {
    setSpaces(spaces.filter((space) => space._id !== removedSpace._id));
  };

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const contentTypeSorts = {
    posts: {
      "-createdAt": "Latest",
      "-likeCount": "Likes",
      "-commentCount": "Comments",
      createdAt: "Earliest",
    },
    liked: {
      "-createdAt": "Latest",
      createdAt: "Earliest",
    },
  };

  const sorts = contentTypeSorts[props.contentType];

  return (
    <>
      <Stack spacing={2}>
        <Card>
          <HorizontalStack justifyContent="space-between">
            {props.createSpace && <CreateSpace />}
          </HorizontalStack>
        </Card>

        {spaces.map((space, i) => (
          <SpaceCard
            preview="primary"
            key={space._id}
            space={space}
            removeSpace={removeSpace}
          />
        ))}

        {loading && <Loading />}
        {end ? (
          <Stack py={5} alignItems="center">
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {spaces.length > 0 ? (
                <>All Spaces have been viewed</>
              ) : (
                <>No spaces available</>
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
          spaces &&
          spaces.length > 0 && (
            <Stack pt={2} pb={6} alignItems="center" spacing={2}>
              <Button
                style={{ backgroundColor: "#00d5fa" }}
                onClick={fetchSpaces}
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

export default SpaceBrowser;
