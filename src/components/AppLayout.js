import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = ({ children, selectedKey }) => {
  return (
    <Layout>
      <Sider>
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="global">
            <Link to="/">Global Statistics</Link>
          </Menu.Item>
          <Menu.Item key="countries">
            <Link to="/countries">Countries Table</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="header"
          style={{
            background: "grey",
            textAlign: "center",
            fontSize: "50px",
            color: "#fff",
            height: "180px",
          }}
        >
          <h1 className="header__title">COVID-19 STATS</h1>
        </Header>
        <Content className="content">{children}</Content>
        <Footer className="footer">Created by Hassaan Bin Ramzan ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
