import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };
  const [VideoDetail, setVideoDetail] = useState([]);
  useEffect(() => {
    axios.post("/api/video/getVideoDetail", variable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setVideoDetail(res.data.videoDetail);
      } else {
        alert("Failed to load video information.");
      }
    });
  }, []);
  return (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}>
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
          <video
            style={{ width: "100%" }}
            src={`http://localhost:5000/${VideoDetail.filePath}`}
            controls
          />
          <List.Item actions>
            <List.Item.Meta
              avatar={<Avatar src={VideoDetail.writer?.image} />}
              title={<a href="https://ant.design">{VideoDetail.title}</a>}
              description={VideoDetail.description}
            ></List.Item.Meta>
          </List.Item>
          {/* Comments */}
        </div>
      </Col>
      <Col lg={6} xs={24}>
        <SideVideo />
      </Col>
    </Row>
  );
}

export default VideoDetailPage;
