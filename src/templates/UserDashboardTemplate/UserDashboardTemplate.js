import { Fragment, useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router";
import { NavLink } from 'react-router-dom';
import { LOGO, userLocalService } from '../../util/config';
import {
    VideoCameraOutlined,
    TeamOutlined,
    ProfileOutlined,
    ReconciliationOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}


const items = [
    getItem(<NavLink to={`/user`}>Lịch sử đặt vé</NavLink>, 'sub1', <ReconciliationOutlined />),
    getItem(<NavLink to='/user/profile'>Thông tin tài khoản</NavLink>, 'sub2', <ProfileOutlined />)
];

export const UserDashboardTemplate = ({
    comp: Component,
    ...rest
}) => {
    const [collapsed, setCollapsed] = useState(false);

    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    if (!userLocalService.getUserInfor()) {
        return <Redirect to='/login' />
    }

    return (
        <Fragment>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <NavLink to='/home' className="logo p-5">
                        <img src={LOGO} alt="cinehouse-logo" className="w-40 m-auto" />
                    </NavLink>
                    <Menu theme="dark" defaultSelectedKeys='sub1'
                        mode="inline"
                        items={items}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background flex justify-between" style={{ padding: 0 }}>
                        <h1 className="text-3xl text-white font-bold mt-3 pl-4">
                            User dashboard
                        </h1>
                        <button type='button' className="text-white rounded my-auto mr-10 relative" onClick={() => {
                            userLocalService.removeUserInfor();

                            history.push('/home');
                        }}>
                            <span className="bg-indigo-500 p-3 rounded hover:bg-red-500 m-auto font-medium">
                                Đăng xuất
                            </span>
                        </button>
                    </Header>
                    <Content style={{ margin: "0 16px", }}>
                        <div
                            className="mt-8 site-layout-background"
                            style={{ padding: 24, minHeight: 360, }}>
                            <Route {...rest} render={props => <Component {...props} />} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center", }}>
                        Created by T.D.C.Thinh
                    </Footer>
                </Layout>
            </Layout>
        </Fragment>
    )
};