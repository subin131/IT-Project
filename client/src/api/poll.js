import { BASE_URL } from "../config";

const getPolls = async (token, query) => {
  try {
    const res = await fetch(
      BASE_URL + "api/polls?" + new URLSearchParams(query),
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getPoll = async (postId, token) => {
  try {
    const res = await fetch(BASE_URL + "api/polls/" + postId, {
      headers: {
        "x-access-token": token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const updatePoll = async (postId, user, data) => {
  try {
    const res = await fetch(BASE_URL + "api/polls/" + postId, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const deletePoll = async (postId, user) => {
  try {
    const res = await fetch(BASE_URL + "api/polls/" + postId, {
      method: "DELETE",
      headers: {
        "x-access-token": user.token,
      },
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const createPoll = async (poll, user) => {
  try {
    const res = await fetch(BASE_URL + "api/polls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(poll),
    });

    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export { getPoll, createPoll, updatePoll, deletePoll, getPolls };
