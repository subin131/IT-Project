import React from "react";
import {
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import HorizontalStack from "./util/HorizontalStack";
import LikeBox from "./LikeBox";
import CardSpaces from "./CardSpaces";
import "./discoverSpaces.css";
import SpaceBrowser from "./SpaceBrowse";
function DiscoverSpace() {
  return (
    <Card sx={{ padding: 3 }} className="post-card">
      <Box>
        <HorizontalStack spacing={0} alignItems="initial">
          <Stack>
            <h4>Discover Spaces</h4>
            <Box className="box-display">
              <CardSpaces style={{ marginBottom: "10px" }} />
            </Box>
          </Stack>
        </HorizontalStack>
      </Box>
    </Card>
  );
}

export default DiscoverSpace;
