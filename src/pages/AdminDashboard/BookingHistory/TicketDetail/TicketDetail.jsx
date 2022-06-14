import { Table, Input, Button } from "antd";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { FileTextOutlined } from "@ant-design/icons";
import { postAdminBookingHistoyApi } from "../../../../redux/actions/adminManagerAction";
import { userLocalService } from "../../../../util/config";

const { Search } = Input;

export default function TicketDetail() {
  const [state, setState] = useState({
    data: [],
  });
  const { bookingHistory } = useSelector((state) => state.adminReducer);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(async () => {
    const user = userLocalService.getUserInfor();
    const action = postAdminBookingHistoyApi(user.taiKhoan);
    dispatch(action);
  }, []);

  const columns = [
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.tenPhim.localeCompare(b.tenPhim),
      sortDirections: ["descend"],
    },
    {
      title: "Thời lượng",
      dataIndex: "thoiLuongPhim",
    },
    {
      title: "Mã vé",
      dataIndex: "maVe",
      sorter: (a, b) => b.maVe - a.maVe,
      defaultSortOrder: "ascend",
    },
    {
      title: "Ngày đặt",
      dataIndex: "ngayDat",
      sorter: (a, b) => b.ngayDat - a.ngayDat,
      sortDirections: ["descend"],
    },
    {
      title: "Tuỳ chỉnh",
      dataIndex: "action",
      render: (text, ticket) => {
        return (
          <Fragment>
            <NavLink
              to={`/admin/booking/${ticket.maVe}`}
              className="bg-indigo-600 text-white p-2 rounded mr-3 border 
              hover:text-indigo-600 hover:bg-transparent hover:border-indigo-600"
            >
              <FileTextOutlined className="relative -translate-y-1" />
            </NavLink>
          </Fragment>
        );
      },
    },
  ];

  const data = state.data;

  const onChange = (pagination, filters, sorter, extra) => {
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-0">Lịch sử đặt vé</h1>
        <Button>
          <NavLink to="/admin/userlist/addnew">Thêm tài khoản</NavLink>
        </Button>
      </div>
      <Table
        className="my-5"
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maVe"}
      />
    </Fragment>
  );
}
