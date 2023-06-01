import axios from "axios";
import {
  CREATE_COMMENT,
  GET_COMMENTS,
  getMoreReplies,
} from "../constants/routes";

export const getComments = async () => {
  const response = await axios.get(GET_COMMENTS);
  return response.data;
};

export const getReplies = async (commentId) => {
  const response = await axios.get(getMoreReplies(commentId));
  return response.data; // the rest of the replies
};

export const createComment = async (newComment) => {
  const response = await axios.post(CREATE_COMMENT, { ...newComment });
  return response.data;
};
