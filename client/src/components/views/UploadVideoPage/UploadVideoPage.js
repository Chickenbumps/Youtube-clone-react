import React, { useState } from "react";

import { Typography, Button, Form, message, Input } from "antd";
import Icon, { PlusOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import axios from "axios";
import { FaRss } from "react-icons/fa";
import { useSelector } from "react-redux";
const { TextArea } = Input;
const { Title } = Typography;
const PrivateOption = [
  { value: "0", label: "Private" },
  { value: "1", label: "Public" },
];
const CategoryOption = [
  { value: "1", label: "Film & Animation" },
  { value: "2", label: "Autos & Vechicles" },
  { value: "3", label: "Music" },
  { value: "4", label: "Pets & Animals" },
];

function UploadVideoPage(props) {
  const user = useSelector((state) => state.user);
  const [Inputs, setInputs] = useState({
    VideoTitle: "",
    Discription: "",
    Private: "",
    Category: "",
  });
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [ThumbnailPath, setThumbnailPath] = useState("");
  const { VideoTitle, Discription, Private, Category } = Inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...Inputs,
      [name]: value,
    });
  };

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/video/uploadfiles", formData, config).then((res) => {
      if (res.data.success) {
        let variables = {
          url: res.data.url,
          filename: res.data.filename,
        };
        setFilePath(res.data.url);
        axios.post("/api/video/thumbnail", variables).then((res) => {
          if (res.data.success) {
            setDuration(res.data.fileDuration);
            setThumbnailPath(res.data.url);
          } else {
            alert("The thumbnail were not created properly.");
          }
        });
      } else {
        alert("Failed uploading video.");
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const variables = {
      writer: user.userData._id,
      title: VideoTitle,
      description: Discription,
      privacy: Private,
      filePath: FilePath,
      category: Category,
      duration: Duration,
      thumbnail: ThumbnailPath,
    };
    axios.post("/api/video/uploadVideo", variables).then((res) => {
      if (res.data.success) {
        message.success("Success video uploading");
        setTimeout(() => {
          props.history.push("/");
        }, 3000);
      } else {
        alert("Failed  video uploading.");
      }
    });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/*Drop zone */}
          <Dropzone onDrop={onDrop} multiple={false} maxsize={1000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                <PlusOutlined
                  style={{
                    fontSize: "5rem",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              </div>
            )}
          </Dropzone>
          {/*Thumbnail */}
          {ThumbnailPath && (
            <div>
              <img
                src={`http://localhost:5000/${ThumbnailPath}`}
                alt="thumbnail"
              />
            </div>
          )}
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input name="VideoTitle" onChange={onChange} value={VideoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea name="Discription" onChange={onChange} value={Discription} />
        <br />
        <br />
        <select name="Private" onChange={onChange}>
          {PrivateOption.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select name="Category" onChange={onChange}>
          {CategoryOption.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadVideoPage;
