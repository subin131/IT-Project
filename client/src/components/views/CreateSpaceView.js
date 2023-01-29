import { Container } from "@mui/material";
import React from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import PostEditor from "../PostEditor";
import Sidebar from "../Sidebar";
import { Button, Card, Link, Stack, Typography } from "@mui/material";
import CreateSpace from "../CreateSpace";
import HorizontalStack from "../util/HorizontalStack";

const CreateSpaceView = () => {
  return (
    <Container>
      <Navbar />
      <GoBack />
      <Card>
        <HorizontalStack justifyContent="space-between">
          {/* <CreateSpace /> */}
          {/* <SortBySelect /> */}
        </HorizontalStack>
      </Card>
    </Container>
  );
};

export default CreateSpaceView;
