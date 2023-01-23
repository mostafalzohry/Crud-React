import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Form from "../components/pages/form";
import SideNav from "../components/layouts/sidebar";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Lists from "../components/pages/lists";
const { Header, Sider, Content } = Layout;
const ApplicationRoutes = () => {
  const [collapse, setCollapse] = useState(false);
  useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
  }, []);
  const handleToggle = (event) => {
    event.preventDefault();
    collapse ? setCollapse(false) : setCollapse(true);
  };
  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapse}>
          <SideNav />
        </Sider>
        <Layout>
          <Header
            className="siteLayoutBackground"
            style={{ padding: 0, background: "#001529" }}
          >
            {React.createElement(
              collapse ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: handleToggle,
                style: { color: "#fff" },
              }
            )}
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "calc(100vh - 114px)",
              background: "#fff",
            }}
          >
            <Routes>
              <Route path="/list" element={<Lists />} />
              <Route path="/form" element={<Form />} />
              <Route path="/" element={<Navigate to="/list" />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};
export default ApplicationRoutes;
