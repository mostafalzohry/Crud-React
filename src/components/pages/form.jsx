import React, { useState , useEffect} from "react";
import { Row, Col, Typography, Input, Form, Button, message } from "antd";
import { useNavigate } from "react-router";
import {
  useGetPostsQuery,
  useAddNewPostMutation,
} from "../../redux/features/Apislice"


const FormApp = () => {

  const { Title } = Typography;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  

  const [title, settitle] = useState("");
  console.log(title);

  const [post, setpost] = useState("");
  console.log(post);

  const [addNewPost, response] = useAddNewPostMutation();
  const [postForm, setPostForm] = useState("Submit");

  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const onSubmit = (title, post) =>
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: { title },
        body: { post },
        userId: 1,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

  const {
    data: posts,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError,
  } = useGetPostsQuery({ refetchOnMountOrArgChange: true });
  let postContent;
  if (isGetLoading) {
    postContent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else if (isGetError) {
    postContent = (
      <div className="alert alert-danger" role="alert">
        {getError}
      </div>
    );
  }
 
  const handleSubmit = (values) => {
    setLoading(true);
    console.log([values]);
       fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: values.Title,
        body: values.body,
        userId: values.userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        response.json();
        setLoading(false);
        message.success("posts Added Successfully!");
        history("/list");
      })
      .then((json) => console.log(json));
  };
  
  return (
    <div>
      <Row gutter={[40, 0]}>
        <Col span={23}>
          <Title style={{ textAlign: "center" }} level={2}>
            Please Fill the post Form
          </Title>
        </Col>
      </Row>
      <Row gutter={[40, 0]}>
        <Col span={18}>
          <Form {...layout} onFinish={handleSubmit}>
            <Form.Item
              name="userId"
              label="UserId"
              rules={[
                {
                  required: true,
                  message: "Please input your id",
                },
              ]}
            >
              <Input placeholder="Please Enter your userID" />
            </Form.Item>
            <Form.Item
              name="Title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please input your Title",
                },
              ]}
            >
              <Input
                placeholder="Please Enter your title"
                onChange={(e) => settitle(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="body"
              label="Body"
              rules={[
                {
                  required: true,
                  message: "Please select your post",
                },
              ]}
            >
              <Input
                placeholder="Please Enter your post"
                onChange={(e) => setpost(e.target.value)}
              />
            </Form.Item>

            <div style={{ textAlign: "right" }}>
              <Button type="primary" loading={loading} htmlType="submit">
                Save
              </Button>{" "}
              <Button htmlType="button" onClick={() => history("/list")}>
                Back
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default FormApp;
