import { useState, useEffect } from "react";
import axios from "axios";
import AddCommentForm from "./AddCommentForm";
import Comments from "./Comments";

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get("/api/comments");
      const data = response.data;
      setComments(data);
    };
    fetchComments();
  }, []);

  const handleMoreReplies = async (commentId) => {
    const response = await axios.get(
      `/api/comment_replies?comment_id=${commentId}`
    );
    const data = response.data; // the rest of the replies
    setComments((prevState) =>
      prevState.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, replies: comment.replies.concat(data) };
        } else {
          return comment;
        }
      })
    );
  };

  const handleSubmit = async (newComment, callback) => {
    try {
      const response = await axios.post("/api/comments", { ...newComment });
      const data = response.data;
      setComments((prevState) => prevState.concat(data));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Comments comments={comments} onMoreReplies={handleMoreReplies} />
      <AddCommentForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
