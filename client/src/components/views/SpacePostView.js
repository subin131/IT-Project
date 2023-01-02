import { Container } from "@mui/material";
import React from "react";
import GoBack from "../GoBack";
import GoBackSpaces from "../GoBackSpace";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";

import SpacePostEditor from "../SpacePostEditor";

const SpacePostView = () => {
  return (
    <Container>
      <Navbar />
      <GoBackSpaces />
      <GridLayout left={<SpacePostEditor />} />
    </Container>
  );
};

export default SpacePostView;
