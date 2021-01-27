import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  const [replyToggle, setReplyToggle] = useState(false);
  const [childCommentNum, setChildCommentNum] = useState(0);

  useEffect(() => {
    let commentNum = 0;
    props.comments.map((comment, index) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNum++;
      }
    });
    setChildCommentNum(commentNum);
  }, [props.comments, props.parentCommentId]);

  const onClick = () => {
    setReplyToggle(!replyToggle);
  };
  const renderReplyComment = (parentCommentId) =>
    props.comments.map((comment, index) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              comment={comment}
              videoId={props.videoId}
              updateComment={props.updateComment}
            />
            <ReplyComment
              parentCommentId={comment._id}
              comments={props.comments}
              videoId={props.videoId}
              updateComment={props.updateComment}
            />
          </div>
        )}
      </React.Fragment>
    ));
  return (
    <div>
      {childCommentNum > 0 && (
        <p
          style={{ fontSize: "14px", margin: "0", color: "gray" }}
          onClick={onClick}
        >
          View {childCommentNum} more conment(s)
        </p>
      )}
      {replyToggle && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
