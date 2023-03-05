import { Container } from "@mui/material";
import React from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import PollEditor from "../PollEditor";
import Sidebar from "../Sidebar";

const CreatePollView = () => {
  return (
    <Container>
      <Navbar />
      <GoBack />
      <GridLayout left={<PollEditor />} />
    </Container>
  );
};

export default CreatePollView;
