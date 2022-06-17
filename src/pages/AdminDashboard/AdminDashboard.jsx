import { Table, Input, Button } from "antd";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import {
  deleteAdminUserApi,
  getAdminUserListApi,
  postAdminBookingHistoyApi,
} from "../../redux/actions/adminManagerAction";

const { Search } = Input;

export default function AdminDashboard(props) {
  const { userList } = useSelector((state) => state.adminReducer);

  const dispatch = useDispatch();

  useEffect(async () => {
    const action = getAdminUserListApi();
    dispatch(action);
  }, []);

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.taiKhoan.localeCompare(b.taiKhoan),
      sortDirections: ["descend"],
    },
    {
      title: "Họ và tên",
      dataIndex: "hoTen",
      sorter: (a, b) => a.taiKhoan.localeCompare(b.taiKhoan),
      sortDirections: ["descend"],
    },

    {
      title: "Số điện thoại",
      dataIndex: "soDt",
    },
    {
      title: "Chức vụ",
      dataIndex: "maLoaiNguoiDung",
    },
    {
      title: "Tuỳ chỉnh",
      dataIndex: "action",
      render: (text, user) => {
        return (
          <Fragment>
            <NavLink
              to={`/admin/userlist/${user.taiKhoan}`}
              className="bg-green-600 text-white p-2 rounded mr-3 border 
              hover:text-indigo-600 hover:bg-transparent hover:border-indigo-600"
            >
              <EditOutlined className="relative -translate-y-1" />
            </NavLink>
            <span
              className="bg-red-600 text-white p-2 rounded cursor-pointer border 
              hover:text-indigo-600 hover:bg-transparent hover:border-indigo-600"
              onClick={() => {
                // Delete action
                if (
                  window.confirm(
                    `Tài khoản ${user.taiKhoan} sẽ bị xoá khỏi hệ thống!`
                  )
                ) {
                  const action = deleteAdminUserApi(user.taiKhoan);
                  dispatch(action);
                }
              }}
            >
              <DeleteOutlined className="relative -translate-y-1" />
            </span>
            <NavLink
              to={`/admin/booking/${user.taiKhoan}`}
              className="bg-indigo-600 text-white p-2 rounded ml-3 border 
            hover:text-indigo-600 hover:bg-transparent hover:border-indigo-600"
            >
              <ReconciliationOutlined
                className="relative -translate-y-1"
                onClick={() => {
                  const action = postAdminBookingHistoyApi(user.taiKhoan);
                  dispatch(action);
                }}
              />
            </NavLink>
          </Fragment>
        );
      },
    },
  ];

  const handleData = (data) => {
    if(data) {
      let list = data.filter(item => item['soDt'].length === 10);
      return list;
    }
  }

  const data = handleData(userList);

  const onSearch = (value) => {
    const action = getAdminUserListApi(value);
    dispatch(action);
  };

  const onChange = (pagination, filters, sorter, extra) => {
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-0">Quản lý danh sách tài khoản</h1>
        <Button>
          <NavLink to="/admin/userlist/addnew">Thêm tài khoản</NavLink>
        </Button>
      </div>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        className="my-5"
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"taiKhoan"}
      />
    </Fragment>
  );
}
