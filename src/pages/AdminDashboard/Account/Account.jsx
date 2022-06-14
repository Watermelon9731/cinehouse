import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { http, GROUP_CODE, userLocalService } from "../../../util/config";
import { useFormik } from "formik";
import { Form, Input } from "antd";
import { postAdminEditUserInfor } from "../../../redux/actions/adminManagerAction";


export default function Account() {
  const [componentSize, setComponentSize] = useState("default");

  const [user, setUser] = useState({
    infor: {},
  });

  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      let acc = userLocalService.getUserInfor();

      let result = await http.get(
        `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_CODE}&tuKhoa=${acc.taiKhoan}`
      );


      setUser({ infor: result.data.content[0] });

    } catch (err) {
      console.log(err);
    }
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: user.infor.taiKhoan,
      matKhau: user.infor.matKhau,
      email: user.infor.email,
      soDt: user.infor.soDt,
      maNhom: GROUP_CODE,
      maLoaiNguoiDung: user.infor.maLoaiNguoiDung,
      hoTen: user.infor.hoTen,
    },

    onSubmit: (values) => {
      // Call api to post
      const action = postAdminEditUserInfor(values);
      dispatch(action);
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
            name="hoTen"
            onChange={formik.handleChange}
            value={formik.values.hoTen}
          />
        </Form.Item>

        <Form.Item label="Email">
          <Input
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
            name="soDt"
            onChange={formik.handleChange}
            value={formik.values.soDt}
          />
        </Form.Item>

        <Form.Item label="Loại tài khoản">
          <Input disabled={true} name="maLoaiNguoiDung" value={
              formik.values.maLoaiNguoiDung === "QuanTri"
                ? "Quản trị"
                : "Khách Hàng"
            }/>
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
