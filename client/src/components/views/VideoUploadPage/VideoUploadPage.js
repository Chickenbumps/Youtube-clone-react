import React, { useState } from "react";
import { Typography, Button, Form, message, Input } from "antd";
import Icon, { PlusOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
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
function VideoUploadPage() {
  // const [VideoTitle, setVideoTitle] = useState("");
  // const [Discription, setDiscription] = useState("");
  // const [Private, setPrivacy] = useState("Private");
  // const [Category, setCategory] = useState("Film & Animation");
  const [Inputs, setInputs] = useState({
    VideoTitle: "",
    Discription: "",
    Private: "",
    Category: "",
  });
  const { VideoTitle, Discription, Private, Category } = Inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...Inputs,
      [name]: value,
    });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/*Drop zone */}
          <Dropzone onDrop multiple maxsize>
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
          <div>
            <img src alt />
          </div>
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
        <Button type="primary" size="large" onClick>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
