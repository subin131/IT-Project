import { BASE_URL } from "../config";

const getSpaces = async (token, query) => {
  try {
    const res = await fetch(
      BASE_URL + "api/spaces?" + new URLSearchParams(query),
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

const getSpace = async (spaceId, token) => {
  try {
    const res = await fetch(`${BASE_URL}api/spaces/${spaceId}`, {
      headers: {
        "x-access-token": token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const createSpace = async (space, user) => {
  try {
    const res = await fetch(`${BASE_URL}api/spaces`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(space),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateSpace = async (spaceId, user, data) => {
  try {
    const res = await fetch(`${BASE_URL}api/spaces/${spaceId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteSpace = async (spaceId, user) => {
  try {
    const res = await fetch(`${BASE_URL}api/spaces/${spaceId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
export { getSpaces, getSpace, createSpace, updateSpace, deleteSpace };
