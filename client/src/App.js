import "@mui/material";
import "react-icons";
import "react-icons/bi";
import "react-icons/md";
import "react-icons/bs";
import "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import {
  BrowserRouter,
  Route,
  Routes,
  useParams,
  useSearchParams,
} from "react-router-dom";
import theme from "./theme";

import PostView from "./components/views/PostView";
import CreatePostView from "./components/views/CreatePostView";
import ProfileView from "./components/views/ProfileView";
import LoginView from "./components/views/LoginView";
import SignupView from "./components/views/SignupView";
import ExploreView from "./components/views/ExploreView";
import PrivateRoute from "./components/PrivateRoute";
import SearchView from "./components/views/SearchView";

import { initiateSocketConnection, socket } from "./helpers/socketHelper";
import { useEffect } from "react";
import { BASE_URL } from "./config";
import { io } from "socket.io-client";
import Community from "./components/Community";
import SpaceEditor from "./components/SpaceEditor";
import SpaceView from "./components/views/SpaceView";

import ExploreViewSpace from "./components/views/ExploreViewSpaces";
import SpacePostEditor from "./components/SpacePostEditor";
import SpacePostView from "./components/views/SpacePostView";
import CreatePollView from "./components/views/CreatePollView";
import CreateSpacePostView from "./components/views/CreateSpacePostView";

function App() {
  initiateSocketConnection();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<ExploreView />} />
          <Route path="/community" element={<Community />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/spaces/:id" element={<SpaceView />} />
          <Route
            path="/spaces/posts/create/:id"
            element={<CreateSpacePostView />}
          />
          <Route
            path="/posts/create"
            element={
              <PrivateRoute>
                <CreatePostView />
              </PrivateRoute>
            }
          />
          <Route
            path="/poll/create"
            element={
              <PrivateRoute>
                <CreatePollView />
              </PrivateRoute>
            }
          />
          <Route
            path="/spaces/create"
            element={
              <PrivateRoute>
                <SpaceEditor />
              </PrivateRoute>
            }
          />
          <Route
            path="/spaces"
            element={
              <PrivateRoute>
                <ExploreViewSpace />
              </PrivateRoute>
            }
          />
          <Route path="/search" element={<SearchView />} />
          <Route path="/users/:id" element={<ProfileView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
