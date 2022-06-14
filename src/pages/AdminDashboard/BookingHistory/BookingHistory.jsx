import { Table } from "antd";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { NavLink, useParams } from "react-router-dom";
import { FileTextOutlined } from "@ant-design/icons";
import { postAdminBookingHistoyApi } from "../../../redux/actions/adminManagerAction";

export default function BookingHistory(props) {
  const { bookingHistory } = useSelector((state) => state.adminReducer);

  const dispatch = useDispatch();

  const {name} = useParams();

  useEffect(async () => {
    const action = postAdminBookingHistoyApi(name);
    dispatch(action);
  }, [name]);

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
      render: (text, ticket) => {
        return moment(ticket.ngayDat).format("DD-MM-YYYY hh:mm A");
      },
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

  const data = bookingHistory;

  const onChange = (pagination, filters, sorter, extra) => {
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-0">Lịch sử đặt vé</h1>
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
