import { BASE_URL } from "../config";

const createPollCount = async (option, user) => {
  console.log("value come", option);
  try {
    const res = await fetch(BASE_URL + "api/pollCount", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(option),
    });
    console.log("body", res.body);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getPollCount = async (token, query) => {
  try {
    const res = await fetch(
      BASE_URL + "api/pollCount" + "?" + new URLSearchParams(query),
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

export { createPollCount, getPollCount };
