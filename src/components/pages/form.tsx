import React, {useState} from 'react';
import {Row, Col, Typography, Input, Form, Button,  message} from 'antd';
import {useNavigate} from 'react-router';
const {Title} = Typography;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const FormApp = () => {
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
const handleSubmit = (values: any) => {
    setLoading(true);
    console.log(values)
    fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: values.Title,
    body: values.body,
    userId: values.userId,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) =>{
    response.json()
    setLoading(false);
  message.success('posts Added Successfully!');
  history('/list');
  
  })
  .then((json) => console.log(json))
  
    // axios.post(`https://jsonplaceholder.typicode.com/posts`, 
    //   values
    // )
    // .then(res => {
    //   setLoading(false);
    //   message.success('posts Added Successfully!');
    //   history('/list');
    // })
    // .catch(error => {
    //   setLoading(false);
    //   message.error(error);
    // })
  }
return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <Title style={{textAlign: 'center'}} level={2}>
            Please Fill the post Form
            </Title>
            </Col>
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={18}>
          <Form {...layout} onFinish={handleSubmit}>
            <Form.Item name="userId" label="UserId"
            rules={[
              {
                required: true,
                message: 'Please input your id',
              }
            ]}
            >
              <Input placeholder="Please Enter your userID" />
            </Form.Item>
            <Form.Item name="Title" label="Title" 
            rules={[
              {
                required: true,
                message: 'Please input your Title',
              }
            ]}
            >
              <Input placeholder="Please Enter your title" />
            </Form.Item>
            <Form.Item name="body" label="Body" 
            rules={[
              {
                required: true,
                message: 'Please select your post',
              }
            ]}
            >
            <Input placeholder="Please Enter your post" />

            </Form.Item>
            
           
            
             
            <div style={{textAlign: "right"}}>
            <Button type="primary" loading={loading} htmlType="submit">
              Save
            </Button>{' '}
            <Button  htmlType="button" onClick={() => history('/list')}>
              Back
            </Button>
              </div>
          </Form>
          </Col>
        </Row>
    </div>
  );
}
export default FormApp;