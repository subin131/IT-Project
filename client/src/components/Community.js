import React from "react";
import { Container } from "@mui/material";
import Navbar from "./Navbar";
import CreateSpace from "./CreateSpace";
import { Button, Card, Link, Stack, Typography } from "@mui/material";
import HorizontalStack from "./util/HorizontalStack";
import SortByRole from "./SortByRole";
import DiscoverSpace from "./DiscoverSpace";
import ViewSpace from "./ViewSpace";

function Community() {
  return (
    <Container>
      <Navbar />
      <Card>
        <HorizontalStack justifyContent="space-between">
          <CreateSpace />
          <ViewSpace />
        </HorizontalStack>
      </Card>
      <div style={{ marginTop: "10px" }}>
        <DiscoverSpace />
      </div>
    </Container>
  );
}

export default Community;
