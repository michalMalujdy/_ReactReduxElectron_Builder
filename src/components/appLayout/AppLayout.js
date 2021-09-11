import React from "react";
import {Layout, Menu} from 'antd';
import {Link} from "react-router-dom";
import {ReactComponent as Logo} from "./../../assets/logo.svg";
import "./AppLayout.scss";

const {Header, Sider, Content} = Layout;

class AppLayout extends React.Component {
    render() {
        return (
            <div className="app-layout">
                <Layout>
                    <Header className="header app-layout_header">
                        <div className="app-layout_header_brand">
                            <Logo className="app-layout_header_brand_logo"/>
                            <h2 className="app-layout_header_brand_name">Builder</h2>
                        </div>
                    </Header>
                    <Layout>
                        <Sider className="app-layout_sider">
                            <Menu mode="inline" defaultSelectedKeys={['1']} >
                                <Menu.Item key="1">
                                    <Link to="/dogoxo">
                                        Dogoxo
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Link to="/kittyFur">
                                        Kitty Fur
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to="/petsly">
                                        Petsly
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content className="app-layout_content">
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default AppLayout;