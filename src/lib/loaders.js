import apiRequest from "./apiRequest";
import { defer } from "react-router-dom";

export const singkePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  // console.log(request);
  const query = request.url.split("?")[1];
  const postPromise = await apiRequest("/posts/?" + query);
  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async ({}) => {
  const postPromise = await apiRequest("/users/profilePost");

  const chatPromise = await apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
