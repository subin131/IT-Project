import { Button, Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import HorizontalStack from "./util/HorizontalStack";
import "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import Poll from "react-polls";
import "./PollPosts.css";
import Loading from "./Loading";
import { getPolls } from "../api/poll";
import { isLoggedIn } from "../helpers/authHelper";
import { createPollCount } from "../api/pollCount";
import { useNavigate } from "react-router-dom";

const PollPosts = () => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const user = isLoggedIn();
  const [option, setOption] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const fetchPolls = async () => {
    setLoading(true);
    let data = await getPolls(user && user.token);
    // console.log("poll data", data);
    setLoading(false);
    if (!data.error) {
      setPolls([...polls, ...data]);
    }
  };

  console.log("polls", polls);
  // console.log("data tite", polls[0].title);
  // console.log("data option1", polls[0].option1);

  // const pollQuestion = "";
  // const answers = [];

  // const handleVote = (voteAnswer) => {
  //   setPollAnswers((pollAnswers) =>
  //     pollAnswers.map((answer) =>
  //       answer.option === voteAnswer
  //         ? {
  //             ...answer,
  //           }
  //         : answer
  //     )
  //   );
  // };

  // const [pollAnswers, setPollAnswers] = useState([...answers]);

  const handleChange = (e) => {
    setOption(e.target.value);
  };
  useEffect(() => {
    fetchPolls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("clicked");
    console.log("option", option);
    let data = await createPollCount(option, isLoggedIn());
    console.log("poll count data", data);
    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
    } else {
      navigate("/");
    }
  };

  return (
    <Stack spacing={2}>
      <Card>
        <HorizontalStack>
          <MdLeaderboard />
          <Typography>Poll Posts</Typography>
        </HorizontalStack>
      </Card>
      <div className="polls">
        {loading ? (
          <Loading />
        ) : (
          polls.map(({ title, option1, option2 }) => (
            <div className="poll">
              <h3>{title}</h3>

              <div class="button">
                <input
                  type="radio"
                  name="check-substitution-2"
                  onChange={handleChange}
                  value={option1}
                />
                <label class="btn btn-default" for="a25">
                  {option1}
                </label>
              </div>
              <div class="button">
                <input
                  type="radio"
                  name="check-substitution-2"
                  onChange={handleChange}
                  value={option2}
                />
                <label class="btn btn-default" for="a50">
                  {option2}
                </label>
              </div>

              <Button
                style={{ color: "#00d5fa", borderColor: "#00d5fa" }}
                variant="outlined"
                onClick={handleSubmit}
                fullWidth
                disabled={loading}
                sx={{
                  mt: 2,
                }}
              >
                {loading ? <>Submitting</> : <>Submit</>}
              </Button>

              {/* <Poll question={title} onVote={handleVote} /> */}
            </div>
          ))
        )}
      </div>
    </Stack>
  );
};

export default PollPosts;
