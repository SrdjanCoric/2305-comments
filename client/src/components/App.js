import { useState, useEffect } from "react";
import AddCommentForm from "./AddCommentForm";
import Comments from "./Comments";
import data from "../mockData/comments";

const App = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // perform some fetch request
    // grab the data from server
    // set Comments
    setComments(data);
  }, []);
  return (
    <div>
      <Comments comments={comments} />
      <AddCommentForm />
    </div>
  );
};

export default App;
