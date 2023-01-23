import React,{useEffect, useState} from 'react';
import {Table, Row, Col, Button, Typography,} from 'antd';
import {useNavigate} from 'react-router';
import {useSelector,useDispatch} from "react-redux"
import { getPosts } from '../../redux/features/postsReducer';
const {Title} = Typography;


const Lists = () => {
 
  const history = useNavigate();
 const dispatch =useDispatch();
  

const loading = useSelector(state =>state.posts.loading);
const allData = useSelector(state =>state.posts.data)
// const [allData,setAllData] =useState([])


useEffect(() => {
    // axios.get(`https://jsonplaceholder.typicode.com/posts`).then(res => {
    //   setAllData(res.data);
    // });
    dispatch(getPosts());

  }, []);
const columns = [
    {
        key : 1,
      title: 'UserId',
      dataIndex: 'userId',
      editable: true,

    },
    {
        key : 2,
      title: 'Title',
      dataIndex: 'title',
      editable: true,

    },
    {      
          key : 3,
      title: 'body',
      dataIndex: 'body',
      editable: true,

    },
    
  ];
const data = [{
  }];
allData.map((user) => {
    data.push({
     key: user.id,
     userId: user.userId,
     title: user.title,
     body: user.body,
   })
   return data;
 });
const handleClick = () => {
    history('/form')
  }
return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={18}>
            <Title level={2}>
            Post List
            </Title>
            </Col>
          <Col span={6}>
          <Button onClick={handleClick} block>Add Post</Button>
          </Col>
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={24}>
        <Table  
        bordered
         columns={columns} dataSource={data}
         />
        </Col>
        </Row>
    </div>
  );
}
export default Lists;