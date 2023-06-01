export const GET_COMMENTS = "/api/comments";
export const CREATE_COMMENT = "/api/comments";
export const getMoreReplies = (commentId) =>
  `/api/comment_replies?comment_id=${commentId}`;
