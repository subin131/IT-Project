import { Button, Card, Container, Stack, Typography } from "@mui/material";
import React from "react";
import GridLayout from "../GridLayout";
import Loading from "../Loading";
import Navbar from "../Navbar";

import SpaceBrowser from "../SpaceBrowse";

const ExploreViewSpace = () => {
  return (
    <Container>
      <Navbar />
      <GridLayout left={<SpaceBrowser createSpace contentType="spaces" />} />
    </Container>
  );
};

export default ExploreViewSpace;
