import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { http, GROUP_CODE, userLocalService } from "../../../util/config";
import { useFormik } from "formik";
import { Form, Input } from "antd";
import { postEditedUserInfor, postUserInfor } from "../../../redux/actions/userAction";


export default function Profile() {
  const [componentSize, setComponentSize] = useState("default");

  const {userInfor} = useSelector(state => state.userReducer);

  const dispatch = useDispatch();

  useEffect(async () => {
    const action = postUserInfor();
    dispatch(action);
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userInfor.taiKhoan,
      matKhau: userInfor.matKhau,
      email: userInfor.email,
      soDT: userInfor.soDT,
      maNhom: GROUP_CODE,
      maLoaiNguoiDung: userInfor.maLoaiNguoiDung,
      hoTen: userInfor.hoTen,
    },

    onSubmit: (values) => {
      // Call api to post
    //   const action = postEditedUserInfor(values);
    //   dispatch(action);
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const renderHeading = () => {
    return (
      <h1 className="text-3xl font-bold mb-5 text-center">
        {`Thông tin tài khoản`}
      </h1>
    );
  };

  return (
    <Fragment>
      {renderHeading()}
      <Form
        // onSubmitCapture={formik.handleSubmit}
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
        <Form.Item label="Tài khoản">
          <Input
            disabled={true}
            name="taiKhoan"
            onChange={formik.handleChange}
            value={formik.values.taiKhoan}
          />
        </Form.Item>

        <Form.Item label="Họ và tên">
          <Input
          disabled={true}
            name="hoTen"
            onChange={formik.handleChange}
            value={formik.values.hoTen}
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
          disabled={true}
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Item>

        <Form.Item label="Mật khẩu">
          <Input.Password
            name="matKhau"
            onChange={formik.handleChange}
            value={formik.values.matKhau}
          />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          rules={[
              {
                  len: 10,
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
            ]}
            >
          <Input
            disabled={true}
            name="soDT"
            onChange={formik.handleChange}
            value={formik.values.soDT}
          />
        </Form.Item>

        <Form.Item label="Loại tài khoản">
          <Input disabled={true} name="maLoaiNguoiDung" value={
              formik.values.maLoaiNguoiDung === "QuanTri"
                ? "Quản trị"
                : "Khách Hàng"
            }/>
        </Form.Item>
      </Form>
    </Fragment>
  );
}
