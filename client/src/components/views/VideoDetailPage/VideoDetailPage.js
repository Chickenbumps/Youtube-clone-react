import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";
import LikeDislike from "./Sections/LikeDislike";
function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };
  const [VideoDetail, setVideoDetail] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios.post("/api/video/getVideoDetail", variable).then((res) => {
      if (res.data.success) {
        // console.log(res.data);
        setVideoDetail(res.data.videoDetail);
      } else {
        alert("Failed to load video information.");
      }
    });
    axios.post("/api/comment/getComments", variable).then((res) => {
      if (res.data.success) {
        setComments(res.data.comments);
      } else {
        alert("Failed to load comments");
      }
    });
  }, []);
  const updateComment = (newComment) => {
    setComments(comments.concat(newComment));
  };
  if (VideoDetail.writer) {
    return (
      <Row>
        {console.log(videoId === VideoDetail._id)}
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:7000/${VideoDetail.filePath}`}
              controls
            />
            <List.Item
              actions={[
                <LikeDislike
                  videoDetail={VideoDetail}
                  videoId={videoId}
                  userId={localStorage.getItem("userId")}
                />,
                <Subscribe
                  userTo={VideoDetail.writer._id}
                  userFrom={localStorage.getItem("userId")}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={VideoDetail.writer && VideoDetail.writer.image}
                  />
                }
                title={<a href="https://ant.design">{VideoDetail.title}</a>}
                description={VideoDetail.description}
              />
            </List.Item>
            <Comment
              comments={comments}
              videoId={videoId}
              updateComment={updateComment}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
}
export default VideoDetailPage;
