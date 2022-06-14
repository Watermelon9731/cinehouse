import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { postUserRegisterApi } from "../../redux/actions/userAction";
import { GROUP_CODE, LOGO } from "../../util/config";

export default function Register() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: "",
    },

    onSubmit: (values) => {
      values.maNhom = GROUP_CODE;
      // let formData = new FormData();
      // for (let key in values) {
      //   formData.append(key, values[key]);
      // }
      // console.log('post formData',formData);
      const action = postUserRegisterApi(values);
      dispatch(action);
    },
  });

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
  };

  return (
    <section className="register p-20 min-h-screen" id="registerForm">
      <div className="logo text-center">
        <img src={LOGO} alt="cinehouse-logo" className="w-52 mx-auto mb-5" />
      </div>
      <h1 className="text-4xl font-bold text-center text-white mb-10">
        Đăng ký tài khoản
      </h1>
      <div className="flex justify-center mr-32">
        <Form
          {...formItemLayout}
          onSubmitCapture={formik.handleSubmit}
          scrollToFirstError
          className="w-2/3"
        >
          <Form.Item
            name="hoTen"
            label={<label style={{ color: "white" }}>Họ và tên</label>}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đầy đủ họ và tên!",
              },
              {
                pattern: "^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
                message: 'Vui lòng nhật tên hợp lệ!'
              }
            ]}
          >
            <Input onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item
            name="taiKhoan"
            label={<label style={{ color: "white" }}>Tài khoản</label>}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên tài khoản!",
              },
            ]}
          >
            <Input onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item
            name="matKhau"
            label={<label style={{ color: "white" }}>Mật khẩu</label>}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
            hasFeedback
          >
            <Input.Password onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item
            name="confirm"
            label={<label style={{ color: "white" }}>Xác nhận mật khẩu</label>}
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("matKhau") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="email"
            label={<label style={{ color: "white" }}>Email</label>}
            rules={[
              {
                type: "email",
                message: "Địa chỉ Email không đúng!",
              },
              {
                required: true,
                message: "Vui lòng nhập địa chỉ Email!",
              },
            ]}
          >
            <Input onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item
            name="soDt"
            label={<label style={{ color: "white" }}>Số điện thoại</label>}
            rules={[
              {
                len: 10,
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
            ]}
          >
            <Input className="w-100" onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error("Bạn cần đồng ý với điều khoản sử dụng!")
                      ),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              <span className="text-white">
                Tôi đã đọc và đồng ý vơi{" "}
                <NavLink to="/" className="text-indigo-400 hover:text-red-500">
                  điều khoản sử dụng
                </NavLink>
              </span>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <button
              className="bg-indigo-600 hover:bg-red-500 p-2 px-4 text-white rounded"
              type="submit"
            >
              Đăng ký
            </button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
