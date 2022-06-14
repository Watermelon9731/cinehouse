import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { http } from "../../../util/config";
import { useFormik } from "formik";
import { Form, Input} from "antd";
import { GROUP_CODE } from "../../../util/config";
import { useParams } from "react-router";
import { postUserRegisterApi } from "../../../redux/actions/userAction";


export default function AddNewUser() {
  const [componentSize, setComponentSize] = useState("default");

  const [user, setUser] = useState({
    infor: {},
  });

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUP_CODE,
      hoTen: "",
    },

    onSubmit: (values) => {
      // Call api to post
        const action = postUserRegisterApi(values);
        dispatch(action);
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const renderHeading = () => {
    return (
      <h1 className="text-3xl font-bold mb-5 text-center">
        {`Tạo tài khoản mới`}
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
        <Form.Item
          name="taiKhoan"
          label="Tài khoản"
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
          label="Họ và tên"
          name="hoTen"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập đầy đủ họ và tên!",
            },
            {
              pattern:
                "^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
              message: "Vui lòng nhật tên hợp lệ!",
            },
          ]}
        >
          <Input onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
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
          <Input name="email" onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item
          name="matKhau"
          label="Mật khẩu"
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
          label="Xác nhận mật khẩu"
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
          name="soDt"
          label="Số điện thoại"
          rules={[
            {
              len: 10,
              required: true,
              message: "Vui lòng nhập số điện thoại!",
            },
          ]}
        >
          <Input onChange={formik.handleChange} />
        </Form.Item>

        <Form.Item label="Xác nhận">
          <button
            type="submit"
            className="px-2 py-1 rounded bg-blue-500 hover:bg-blue-400 text-white"
          >
            Tạo tài khoản
          </button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}
