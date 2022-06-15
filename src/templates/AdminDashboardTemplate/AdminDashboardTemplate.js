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
import { Layout, Menu } from "antd";

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
    getItem('Danh sách người dùng',"sub1", <TeamOutlined />,[
        getItem(<NavLink to='/admin'>Tất cả người dùng</NavLink>, "1"),
        getItem(<NavLink to='/admin/userlist/addnew'>Thêm người dùng</NavLink>, "2"),
    ]),
    getItem('Danh sách phim', "sub2", <VideoCameraOutlined />, [
        getItem(<NavLink to='/admin/movielist'>Tất cả các phim</NavLink>, "3"),
        getItem(<NavLink to='/admin/movielist/showing'>Phim đang chiếu</NavLink>, "4"),
        getItem(<NavLink to='/admin/movielist/upcoming'>Phim sắp chiếu</NavLink>, "5"),
        getItem(<NavLink to='/admin/movielist/addnew'>Thêm phim mới</NavLink>, "6"),
    ]),
    getItem(<NavLink to={`/admin/booking/yours`}>Lịch sử đặt vé</NavLink>, 'sub4', <ReconciliationOutlined/>),
    getItem(<NavLink to='/admin/account'>Thông tin tài khoản</NavLink>, 'sub5', <ProfileOutlined/>)
];

export const AdminDashboardTemplate = ({
    comp: Component,
    ...rest
}) => {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    const history = useHistory();
    if (!userLocalService.getUserInfor()) {
        return <Redirect to='/login' />
    } else {
        let user = userLocalService.getUserInfor();
        if (user.maLoaiNguoiDung !== "QuanTri")
            return <Redirect to='/user' />
    }

    return (
        <Fragment>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <NavLink to='/home' className="logo p-5">
                        <img src={LOGO} alt="cinehouse-logo" className="w-40 m-auto" />
                    </NavLink>
                    <Menu theme="dark" defaultSelectedKeys={() => {
                        switch (history.location.pathname) {
                            case ('/admin' || '/admin/userslist/addnew'): {
                                return ["sub1"];
                            }

                            case ('/admin/movielist' || '/admin/movielist/addnew'): {
                                return ["sub2"];
                            }

                            case ('/admin/showtime'): {
                                return ["sub3"];
                            }

                            default: break;
                        }
                    }}
                        mode="inline"
                        items={items}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background flex justify-between" style={{ padding: 0 }}>
                        <h1 className="text-3xl text-white font-bold mt-3 pl-4">
                            Admin dashboard
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