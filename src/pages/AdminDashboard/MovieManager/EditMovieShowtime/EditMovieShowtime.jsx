import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { http, movieLocalService } from "../../../../util/config";
import { DatePicker, Form, Input, InputNumber, Radio, Select } from "antd";
import moment from "moment";
import { postAdminAddShowtimeApi } from "../../../../redux/actions/adminManagerAction";
import { useParams } from "react-router";

const { Option } = Select;

export default function EditMovieShowtime() {
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
    },

    onSubmit: (values) => {
      // Call api to post
      const action = postAdminAddShowtimeApi(values);
      dispatch(action);
    },
  });

  const [componentSize, setComponentSize] = useState("default");


  const dispatch = useDispatch();

  const [state, setState] = useState({
    cinemaChain: [],
    cinema: [],
  });

  useEffect(async () => {
    try {
      let result = await http.get(`/api/QuanLyRap/LayThongTinHeThongRap`);

      setState({
        ...state,
        cinemaChain: result.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const renderCinemaChainOption = () => {
    return state.cinemaChain?.map((item, index) => {
      return (
        <Option key={index} value={item.maHeThongRap}>
          {item.tenHeThongRap}
        </Option>
      );
    });
  };

  const handleChangeCinemaChain = async (values) => {
    try {
      let result = await http.get(
        `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${values}`
      );

      setState({
        ...state,
        cinema: result.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const renderCinemaOption = () => {
    return state.cinema?.map((item, index) => {
      return (
        <Option key={index} value={item.maCumRap}>
          {item.tenCumRap}
        </Option>
      );
    });
  };

  const handleChangeCinema = (values) => {
    formik.setFieldValue('maRap', values);
  }

  const handleChangeDatePicker = (value, dateString) => {
    // console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
    // parse date string into server format
    let serverFormatDate = moment(value).format('DD/MM/YYYY hh:mm:ss');
    formik.setFieldValue('ngayChieuGioChieu',serverFormatDate)
  };

  const onOk = (value) => {
    // parse date string into server format
    let serverFormatDate = moment(value).format('DD/MM/YYYY hh:mm:ss');
    formik.setFieldValue('ngayChieuGioChieu',serverFormatDate)
  };

  const handleChangeInputNumber = (value) => {
    formik.setFieldValue('giaVe',value)
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const renderHeading = () => {
    let movie = movieLocalService.getMovieDetail(); 
    return (
      <h1 className="text-3xl font-bold mb-5 text-center">
        {`Thêm lịch chiếu phim ${movie.tenPhim}`}
      </h1>
    )
  }

  return (
    <Fragment>
      {renderHeading()}
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        {/* <Form.Item label="Tên phim">
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item> */}
        <Form.Item label="Chọn hệ thống rạp">
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Tên hệ thống rạp"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            onChange={handleChangeCinemaChain}
          >
            {renderCinemaChainOption()}
          </Select>
        </Form.Item>
        <Form.Item label="Chọn cụm rạp">
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => option.children.includes(input)}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            onChange={handleChangeCinema}
          >
            {renderCinemaOption()}
          </Select>
        </Form.Item>

        <Form.Item label="Ngày khởi chiếu">
          <DatePicker showTime format={'DD/MM/YYYY hh:mm:ss'} onChange={handleChangeDatePicker} onOk={onOk} />
        </Form.Item>
        <Form.Item label="Giá vé">
          <InputNumber
            onChange={handleChangeInputNumber}
          />
        </Form.Item>
        <Form.Item label="Xác nhận">
          <button
            type="submit"
            className="px-2 py-1 rounded bg-blue-500 text-white"
          >
            Tạo lịch chiếu
          </button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}
