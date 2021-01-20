import React, { useEffect, useState } from "react";
import axios from "axios";
function SideVideo() {
  const [sideVideo, setSideVideo] = useState([]);
  useEffect(() => {
    axios.get("/api/video/getVideos").then((res) => {
      if (res.data.success) {
        console.log(res.data.videos);
        setSideVideo(res.data.videos);
      } else {
        alert("Failed to load videos");
      }
    });
  }, []);
  const sideVideoRender = sideVideo.map((video, index) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - minutes * 60);
    return (
      <div
        key={index}
        style={{ display: "flex", marginBotton: "1rem", padding: "0 2rem" }}
      >
        <div style={{ width: "40%", marginBottom: "1rem" }}>
          <a href={`/video/${video._id}`} style={{ collor: "gray" }}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5000/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </div>
        <div style={{ width: "50%" }}>
          <a href={`/video/${video._id}`} style={{ collor: "gray" }}>
            <span style={{ fontsize: "1rem", color: "black" }}>
              {video.title}
            </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views}views</span>
            <br />
            <span>
              {minutes} : {seconds}
            </span>
          </a>
        </div>
      </div>
    );
  });
  return (
    <>
      <div style={{ marginTop: "3rem" }}>{sideVideoRender}</div>
    </>
  );
}

export default SideVideo;
