import { Table, Input, Button } from "antd";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { CalendarOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  deleteAdminMovieApi,
  getAdminMovieListApi,
} from "../../../../redux/actions/adminManagerAction";
import { movieLocalService } from "../../../../util/config";

const { Search } = Input;

export default function ShowingMovie(props) {
  const { movieList } = useSelector((state) => state.adminReducer);

  const dispatch = useDispatch();

  useEffect(async () => {
    const action = getAdminMovieListApi();
    dispatch(action);
  }, []);

  const handleMovieList = () => {
    let newArr = [...movieList];
    newArr.forEach((item) => {
      item.ngayKhoiChieu = moment(item.ngayKhoiChieu).format("DD-MM-YYYY");
    });

    let result = newArr.filter(items => items.dangChieu !== false)
    return result;
  };

  const columns = [
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      // specify the condition of filtering result
      // here is that finding the name started with `value`
    },
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend']
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text, movie) => {
        return (
          <Fragment>
            {movie.moTa.length > 30
              ? movie.moTa.substr(0, 30) + "..."
              : movie.moTa}
          </Fragment>
        );
      },
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      sorter: (a, b) =>
        a.ngayKhoiChieu > b.ngayKhoiChieu
          ? 1
          : a.ngayKhoiChieu < b.ngayKhoiChieu
          ? -1
          : 0,
      sortDirections: ['ascend'],
    },
    {
      title: "Tuỳ chỉnh",
      dataIndex: "action",
      render: (text, movie) => {
        return (
          <Fragment>
            <NavLink
              to={`/admin/movielist/edit/${movie.maPhim}`}
              className="bg-green-600 text-white p-2 rounded mr-3 border 
              hover:text-indigo-600 hover:bg-transparent hover:border-indigo-600"
              onClick={() => {
                movieLocalService.setMovieDetail(movie);
              }}
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
                    `Phim ${movie.tenPhim} sẽ bị xoá khỏi hệ thống!`
                  )
                ) {
                  const action = deleteAdminMovieApi(movie.maPhim);
                  dispatch(action);

                  movieLocalService.removeMovieDetail();
                }
              }}
            >
              <DeleteOutlined className="relative -translate-y-1"/>
            </span>
            <NavLink to={`/admin/showtime/${movie.maPhim}/${movie.biDanh}`} className="bg-indigo-600 text-white p-2 rounded ml-3 border 
            hover:text-indigo-600 hover:bg-transparent hover:border-indigo-600" onClick={() => {
              movieLocalService.setMovieDetail(movie);
            }}>
              <CalendarOutlined className="relative -translate-y-1"/>
            </NavLink>
          </Fragment>
        );
      },
    },
  ];

  const data = handleMovieList();

  const onSearch = (value) => {
    const action = getAdminMovieListApi(value);
    dispatch(action);
  };

  const onChange = (pagination, filters, sorter, extra) => {
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-0">Quản lý danh sách phim</h1>
        <Button>
          <NavLink to="/admin/movielist/addnew">Thêm phim</NavLink>
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
        rowKey={"maPhim"}
      />
    </Fragment>
  );
}
