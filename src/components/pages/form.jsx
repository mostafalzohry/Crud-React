import {useState} from 'react';
import {Row, Col, Typography, Input, Form, Button,  message} from 'antd';
import {useNavigate} from 'react-router';
import {useDispatch} from "react-redux"
import { addNewPost} from '../../redux/features/postsReducer';

const {Title} = Typography;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const FormApp = () => {
  const dispatch =useDispatch();
  const [loading, setLoading] = useState(false);

  const history = useNavigate();
const handleSubmit =  async (values) => {
  setLoading(true);
    try {
       dispatch(addNewPost(values))
      setLoading(false);

      message.success('posts Added Successfully!');
      history('/list');
  
    }
      catch (error) {
        setLoading(false);
        message.error(error);
      }
    
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
                message: 'Please input number of id',
              }
            ]}
            >
              <Input placeholder="Please Enter your userID" />
            </Form.Item>
            <Form.Item name="title" label="title" 
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
            <Button  htmlType="button" onClick={(e) => {
                  e.preventDefault() 
              history('/list')}}>
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