import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
function Comment(props) {
  const [comment, setComment] = useState("");
  const onChange = (e) => {
    setComment(e.target.value);
  };

  const user = useSelector((state) => state.user);
  const videoId = props.videoId;
  const onSubmit = (e) => {
    e.preventDefault();
    const variables = {
      content: comment,
      writer: user.userData._id,
      videoId: videoId,
    };

    axios.post("/api/comment/saveComment", variables).then((res) => {
      if (res.data.success) {
        setComment("");
        props.updateComment(res.data.result);
      } else {
        alert("Failed to create comment.");
      }
    });
  };

  return (
    <div>
      <br />
      <hr />
      {/* Comment Lists */}
      {console.log(props.comments)}

      {props.comments &&
        props.comments.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  key={index}
                  videoId={videoId}
                  comment={comment}
                  updateComment={props.updateComment}
                />
                <ReplyComment
                  parentCommentId={comment._id}
                  videoId={videoId}
                  comments={props.comments}
                  updateComment={props.updateComment}
                />
              </React.Fragment>
            )
        )}
      {/* Root Comment Form  */}

      <Form style={{ display: "flex" }} onSubmit={onSubmit}>
        <Input.TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={onChange}
          value={comment}
          placeholder="Please write comment."
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Comment;
