import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { DatePicker, Form, Input, InputNumber, Switch } from "antd";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import {
  getAdminEditMovieApi,
  postAdminEditedMovieApi,
} from "../../../../redux/actions/adminManagerAction";
import { GROUP_CODE, movieLocalService } from "../../../../util/config";
import { useParams } from "react-router";

export default function EditMovieDetail() {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(async () => {
    const action = getAdminEditMovieApi(id);
    dispatch(action);
  }, []);

  const { editMovie } = useSelector((state) => state.adminReducer);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: editMovie.maPhim,
      tenPhim: editMovie.tenPhim,
      trailer: editMovie.trailer,
      moTa: editMovie.moTa,
      ngayKhoiChieu: editMovie.ngayKhoiChieu,
      sapChieu: editMovie.sapChieu,
      dangChieu: editMovie.dangChieu,
      hot: editMovie.hot,
      danhGia: editMovie.danhGia,
      hinhAnh: null,
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
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      // Call api to post
      const action = postAdminEditedMovieApi(formData);
      dispatch(action);
    },
  });

  const handleChangeDatePicker = (value) => {
    let openingDay = moment(value).format('DD/MM/YYYY');
    formik.setFieldValue("ngayKhoiChieu", openingDay);
  };

  const handleChangeSwitch = (name) => {
    return (value) => formik.setFieldValue(name, value);
  };

  const handleChangeFile = async (e) => {
    // get file from e
    let file = e.target.files[0];

    // upload image with jpeg, png, gif only
    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      // save file on formik
      await formik.setFieldValue("hinhAnh", file);
      // reading file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // base 64 img display
        setImgSrc(e.target.result);
      };
    }
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const renderHeading = () => {
    let movie = movieLocalService.getMovieDetail();
    return (
      <h1 className="text-3xl font-bold mb-5 text-center">
        {`Thông tin chi tiết phim - ${movie.tenPhim}`}
      </h1>
    );
  };

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
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Mô tả">
          <TextArea
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            onChange={handleChangeDatePicker}
            format="DD/MM/YYYY"
            placeholder={moment(formik.values.ngayKhoiChieu).format("DD/MM/YYYY")}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Đánh giá">
          <InputNumber
            name="danhGia"
            min={1}
            max={10}
            onChange={handleChangeSwitch("danhGia")}
            value={formik.values.danhGia}
          />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif"
            onChange={handleChangeFile}
          />
          <img
            src={imgSrc === "" ? editMovie.hinhAnh : imgSrc}
            alt="upload"
            className={`w-100 mt-5`}
          />
        </Form.Item>
        <Form.Item label="Xác nhận">
          <button
            type="submit"
            className="px-2 py-1 rounded bg-green-600 text-white"
          >
            Chỉnh sửa
          </button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}
