import { Container } from "@mui/material";
import React from "react";
import GoBack from "../GoBack";

import Navbar from "../Navbar";
import { Button, Card, Link, Stack, Typography } from "@mui/material";

import HorizontalStack from "../util/HorizontalStack";
import SpacePostEditor from "../SpacePostEditor";
import GridLayout from "../GridLayout";

const CreateSpacePostView = () => {
  return (
    <Container>
      <Navbar />
      <GoBack />
      <Card>
        <GridLayout left={<SpacePostEditor />} />
      </Card>
    </Container>
  );
};

export default CreateSpacePostView;
