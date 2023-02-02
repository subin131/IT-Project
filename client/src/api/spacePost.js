import { BASE_URL } from "../config";

const getUserLikedSpacePosts = async (likerId, token, query) => {
  try {
    const res = await fetch(
      BASE_URL +
        "api/spaceposts/liked/" +
        likerId +
        "?" +
        new URLSearchParams(query),
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

const getSpacePosts = async (token, query) => {
  try {
    const res = await fetch(
      BASE_URL + "api/spaceposts?" + new URLSearchParams(query),
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

const getSpacePost = async (spacepostId, token) => {
  try {
    const res = await fetch(BASE_URL + "api/spaceposts/" + spacepostId, {
      headers: {
        "x-access-token": token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const createSpacePost = async (spacepost, space) => {
  try {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", `${space.token}`);

    var formdata = new FormData();
    formdata.append("image", spacepost.image);
    formdata.append("title", spacepost.title);
    formdata.append("content", spacepost.content);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    const res = await fetch(BASE_URL + "api/spaceposts", requestOptions);
    return await res.json();
  } catch (err) {
    console.log("createSpacePost error: ", err);
  }
};

const updateSpacePost = async (data, user, spacepostId) => {
  try {
    const res = await fetch(BASE_URL + "api/spaceposts/" + spacepostId, {
      method: "PUT",
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

const deleteSpacePost = async (spacepostId, user) => {
  try {
    const res = await fetch(BASE_URL + "api/spaceposts/" + spacepostId, {
      method: "DELETE",
      headers: {
        "x-access-token": user.token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getSpacePostComments = async (params) => {
  try {
    const { id } = params;
    const res = await fetch(BASE_URL + `api/spaceposts/${id}/comments`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const getSpacePostUserComments = async (params) => {
  try {
    const { id, query } = params;
    const res = await fetch(
      BASE_URL + `api/spaceposts/${id}/comments?` + new URLSearchParams(query)
    );
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const createSpacePostComment = async (comment, params, user) => {
  try {
    const { id } = params;
    const res = await fetch(BASE_URL + `api/spaceposts/${id}/comments`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": user.token,
      },
      body: JSON.stringify(comment),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const updateComment = async (comment, params, user) => {
  try {
    const res = await fetch(
      BASE_URL + `api/spaceposts/${params.id}/comments/${params.commentId}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": user.token,
        },
        body: JSON.stringify(comment),
      }
    );
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const deleteComment = async (commentId, user) => {
  try {
    const res = await fetch(BASE_URL + `api/spaceposts/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "x-access-token": user.token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const likeSpacePost = async (spacepostId, user) => {
  try {
    const res = await fetch(
      BASE_URL + "api/spaceposts/" + spacepostId + "/like",
      {
        method: "POST",
        headers: {
          "x-access-token": user.token,
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

const unlikeSpacePost = async (spacepostId, user) => {
  try {
    const res = await fetch(
      BASE_URL + "api/spaceposts/" + spacepostId + "/unlike",
      {
        method: "POST",
        headers: {
          "x-access-token": user.token,
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
export {
  getSpacePosts,
  getSpacePost,
  createSpacePost,
  updateSpacePost,
  deleteSpacePost,
  getSpacePostComments,
  getSpacePostUserComments,
  createSpacePostComment,
  updateComment,
  deleteComment,
  likeSpacePost,
  unlikeSpacePost,
  getUserLikedSpacePosts,
};
