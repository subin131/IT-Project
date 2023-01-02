import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Loading from "../Loading";
import Navbar from "../Navbar";
import SpaceCard from "../SpaceCard";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import { getSpace } from "../../api/spaces";
import Comments from "../Comments";
import ErrorAlert from "../ErrorAlert";
import { isLoggedIn } from "../../helpers/authHelper";
import GoBackCommunity from "../GoBackCommunity";
import CreatePost from "../CreatePost";
import CreateSpacePost from "../CreateSpacePost";
import { GrDashboard } from "react-icons/gr";
import DashboardSpace from "../DashboardSpace";
import SpaceLabel from "../SpaceLabel";

const SpaceView = () => {
  const params = useParams();

  const [space, setSpace] = useState(null);
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

  useEffect(() => {
    fetchSpace();
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
            <Stack spacing={2}>
              <SpaceCard space={space} key={space._id} />

              <DashboardSpace />
            </Stack>
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
