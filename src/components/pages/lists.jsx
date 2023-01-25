import {
  Form,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Input,
  Button,
  Row,
  Col,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/features/postsReducer";
import { updatePosts ,deletePosts} from '../../redux/features/postsReducer';

const { TextArea } = Input;
const { Title } = Typography;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? (
      <InputNumber />
    ) : (
      <TextArea style={{ height: 120 }} />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Lists = () => {
  const history =useNavigate();
  const dispatch =useDispatch()
  const allData = useSelector(state =>state?.posts?.data)
  const loading = useSelector(state =>state.posts.loading)
  
  const [searchVal, setSearchVal] = useState(null);
  
  const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [searchIndex, setSearchIndex] = useState([]);
  
    
    useEffect(() => {
      const crawl = (post, allValues) => {
        if (!allValues) allValues = [];
        for (var key in post) {
          if (typeof post[key] === "object") crawl(post[key], allValues);
          else allValues.push(post[key] + " ");
        }
        return allValues;
      };
        setFilteredData(allData);
        const searchInd = allData.map(post => {
          const allValues = crawl(post);
          return { allValues: allValues.toString() };
        });
        setSearchIndex(searchInd);
    }, [allData]);
  
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };


  const columns = [
    {
      key: 1,
      title: "UserId",
      dataIndex: "userId",
      editable: true,
      width: "5%",
    },
    {
      key: 2,
      title: "Title",
      dataIndex: "title",
      editable: true,
      width: "25%",
    },
    {
      key: 3,
      title: "body",
      dataIndex: "body",
      editable: true,
      width: "40%",
    },
    {
      title: "update",
      dataIndex: "update",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Popconfirm
              title="Sure to save?"
              // onConfirm={() => save(record.key)}
            >
              <Button type="primary">save</Button>
            </Popconfirm>
            <Typography.Link
              onClick={cancel}
              style={{
                marginLeft: 12,
              }}
            >
              <Button type="primary" danger>
                cancel
              </Button>
            </Typography.Link>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            <Button type="primary">edit</Button>
          </Typography.Link>
        );
      },
    },
    {
      key: 5,
      title: "delete",
      dataIndex: "delete",
      render: (_, record) =>
        allData.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => dispatch(deletePosts(record.id))}
          >
            <Button type="primary" danger>
              delete
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "userId" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleClick = (id) => {
    history("/form");
  };

  return (
    <div>
      <Row gutter={[40, 0]}>
        <Col span={18}>
          <Title level={2}>Post List</Title>
        </Col>
        <Col span={6}>
          <Button onClick={handleClick} block>
            Add Post
          </Button>
        </Col>
      </Row>
      <Row gutter={[40, 0]}>
        <Col span={24}>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={filteredData}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
              loading={loading}
            />
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default Lists;
