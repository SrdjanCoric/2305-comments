import { useState, useEffect } from "react";
import AddCommentForm from "./AddCommentForm";
import Comments from "./Comments";
import { createComment, getComments, getReplies } from "../services/comment";

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments();
      setComments(data);
    };
    fetchComments();
  }, []);

  const handleMoreReplies = async (commentId) => {
    const data = await getReplies(commentId);
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
      const data = await createComment(newComment);
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
      {comments.length > 0 ? <h1>Comments App</h1> : null}
      <Comments comments={comments} onMoreReplies={handleMoreReplies} />
      <AddCommentForm onSubmit={handleSubmit} />
    </div>
  );
};

export default App;
