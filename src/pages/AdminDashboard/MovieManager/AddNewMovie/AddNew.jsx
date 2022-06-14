import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Switch,
} from "antd";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { postAdminAddNewMovieApi } from "../../../../redux/actions/adminManagerAction";
import { GROUP_CODE } from "../../../../util/config";
import { useParams } from "react-router";

export default function AddNewMovie() {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");

  const {id} = useParams();


  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },

    onSubmit: (values) => {
      values.maNhom = GROUP_CODE;
      let formData = new FormData();
      // Insert values from formik to formData
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        }
        if (key === "hinhAnh") {
          formData.append('File', values.hinhAnh, values.hinhAnh.name)
        }
      }
      // Call api to post
      const action = postAdminAddNewMovieApi(formData);
      dispatch(action);
    },
  });

  const handleChangeDatePicker = (value) => {
    let openingDay = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", openingDay);
  };

  const handleChangeSwitch = (name) => {
    return (value) => formik.setFieldValue(name, value);
  };

  const handleChangeFile = (e) => {
    // get file from e
    let file = e.target.files[0];

    // upload image with jpeg, png, gif only
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      // reading file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // base 64 img display
        setImgSrc(e.target.result);
      };
      // save file on formik
      formik.setFieldValue("hinhAnh", file);
    }
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Fragment>
      <h1 className="text-3xl font-bold mb-5 text-center">Thêm phim mới</h1>
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
        <Form.Item label="Tên phim">
          <Input name="tenPhim" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Mô tả">
          <TextArea name="moTa" onChange={formik.handleChange} />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            name="ngayKhoiChieu"
            format="DD/MM/YYYY"
            onChange={handleChangeDatePicker}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            name="danhGia"
            min={1}
            max={10}
            onChange={handleChangeSwitch("danhGia")}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif"
            onChange={handleChangeFile}
          />
          <img
            src={imgSrc}
            alt="upload"
            className={`w-100 mt-5 ${imgSrc === "" ? "hidden" : ""}`}
          />
        </Form.Item>
        <Form.Item label="Xác nhận">
          <button
            type="submit"
            className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-400 text-white"
          >
            Thêm phim
          </button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}
