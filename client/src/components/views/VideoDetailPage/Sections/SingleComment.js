import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Comment, Avatar, Button, Input, Form } from "antd";
import axios from "axios";
import LikeDislike from "./LikeDislike";
function SingleComment(props) {
  const [reply, setReply] = useState(false);
  const [inputComment, setInputComment] = useState("");
  const user = useSelector((state) => state.user);
  const onToggle = () => {
    setReply(!reply);
  };
  const onChange = (e) => {
    setInputComment(e.currentTarget.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const variables = {
      content: inputComment,
      writer: user.userData._id,
      videoId: props.videoId,
      responseTo: props.comment._id,
    };

    axios.post("/api/comment/saveComment", variables).then((res) => {
      if (res.data.success) {
        console.log(res.data.result);
        setInputComment("");
        setReply(!reply);
        props.updateComment(res.data.result);
      } else {
        alert("Failed to create comment.");
      }
    });
  };
  const actionReply = [
    <LikeDislike
      commentId={props.comment._id}
      userId={localStorage.getItem("userId")}
    />,
    <span
      style={{ paddingLeft: "10px" }}
      onClick={onToggle}
      key="comment-basic-reply-to"
    >
      Reply to
    </span>,
  ];

  return (
    <div>
      <Comment
        actions={actionReply}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt="image" />}
        content={<p>{props.comment.content}</p>}
      ></Comment>
      {reply && (
        <Form style={{ display: "flex" }} onSubmit={onSubmit}>
          <Input.TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={onChange}
            value={inputComment}
            placeholder="Please write comment."
          />
          <br />
          <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
}

export default SingleComment;
