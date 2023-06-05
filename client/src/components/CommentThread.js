import Comment from "./Comment";

const CommentThread = ({ comment, onMoreReplies }) => {
  return (
    <div className="parent-comment" data-testid="comment">
      <Comment {...comment} />
      <div className="replies">
        {comment.replies.map((reply) => {
          return <Comment key={reply.id} {...reply} />;
        })}
        {comment.replies.length === comment.replies_count ? null : (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onMoreReplies(comment.id);
            }}
            className="show_more"
          >
            Show More Replies ({comment.replies_count - 1})
          </a>
        )}
      </div>
    </div>
  );
};

export default CommentThread;
