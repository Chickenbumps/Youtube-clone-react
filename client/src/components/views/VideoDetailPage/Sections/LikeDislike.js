import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";
import axios from "axios";

function LikeDislike(props) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(false);
  const [dislikeAction, setDislikeAction] = useState(false);
  let variable = {};
  if (props.videoDetail) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { userId: props.userId, commentId: props.commentId };
  }
  useEffect(() => {
    axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
        // How many get likes
        setLikes(response.data.like.length);
        // Check the likes that i clicked on.
        response.data.like.map((like, index) => {
          if (like.userId === props.userId) {
            setLikeAction(true);
          }
        });
      } else {
        alert("Failed to load likes info.");
      }
    });
    axios.post("/api/dislike/getDislikes", variable).then((response) => {
      if (response.data.success) {
        setDislikes(response.data.dislike.length);
        response.data.dislike.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction(true);
          }
        });
      } else {
        alert("Failed to load dislikes info.");
      }
    });
  });

  const onLike = () => {
    if (likeAction === false) {
      axios.post("/api/like/onLike", variable).then((res) => {
        if (res.data.success) {
          setLikes(likes + 1);
          setLikeAction(true);
          if (dislikeAction === true) {
            setDislikes(dislikes - 1);
            setDislikeAction(false);
          }
        } else {
          alert("Failed to load likes number.");
        }
      });
    } else {
      axios.post("/api/like/offLike", variable).then((res) => {
        if (res.data.success) {
          setLikeAction(false);
          setLikes(likes - 1);
        } else {
          alert("Failed to load like number.");
        }
      });
    }
  };

  const onDislike = () => {
    if (dislikeAction === false) {
      axios.post("/api/dislike/onDislike", variable).then((res) => {
        if (res.data.success) {
          setDislikes(dislikes + 1);
          setDislikeAction(true);
          if (likeAction === true) {
            setLikes(likes - 1);
            setLikeAction(false);
          }
        } else {
          alert("Failed to load dislikes number.");
        }
      });
    } else {
      axios.post("/api/dislike/offDislike", variable).then((res) => {
        if (res.data.success) {
          setDislikeAction(false);
          setDislikes(dislikes - 1);
        } else {
          alert("Failed to load dislikes number.");
        }
      });
    }
  };

  return (
    <div>
      <span key={"comment-basic-like"}>
        <Tooltip title="Like">
          {likeAction ? (
            <LikeFilled onClick={onLike} />
          ) : (
            <LikeOutlined onClick={onLike} />
          )}
        </Tooltip>
        <span style={{ cursor: "auto" }}>{likes}</span>
      </span>
      &nbsp;&nbsp;
      <span key={"comment-basic-dislike"}>
        <Tooltip title="Dislike">
          {dislikeAction ? (
            <DislikeFilled onClick={onDislike} />
          ) : (
            <DislikeOutlined onClick={onDislike} />
          )}
        </Tooltip>
        <span style={{ cursor: "auto" }}> {dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislike;
