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
  const history = useNavigate();

  const dispatch = useDispatch();
  const allData = useSelector((state) => state.posts.data);
  const loading = useSelector((state) => state.posts.loading);
  const oldData = [];
  const [form] = Form.useForm();
  const [data, setData] = useState(oldData);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  allData.map((user) => {
    oldData.push({
      key: user.id,
      userId: user.userId,
      title: user.title,
      body: user.body,
    });
    return oldData;
  });

  useEffect(() => {
    setData(oldData);
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

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
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
              onConfirm={() => save(record.key)}
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
        data.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
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
              dataSource={data}
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
