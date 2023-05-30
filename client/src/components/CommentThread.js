import Comment from "./Comment";

const CommentThread = ({ comment }) => {
  return (
    <div className="parent-comment">
      <Comment {...comment} />
      <div className="replies">
        {comment.replies.map((reply) => {
          return <Comment key={reply.id} {...reply} />;
        })}
        <a href="#" className="show_more">
          Show More Replies ({comment.replies_count - 1})
        </a>
      </div>
    </div>
  );
};

export default CommentThread;
