import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { postUserLoginApi } from "../../redux/actions/userAction";
import { LOGO } from "../../util/config";

export default function Login() {
  const dispatch = useDispatch();

  const {userLogin} = useSelector(state => state.userReducer);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      const action = postUserLoginApi(values);
      dispatch(action);
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 pt-5 px-4 sm:px-6 lg:px-8"
      id="login"
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-40 w-auto"
            src={LOGO}
            alt="cinehouse-logo"
          />
          <h2 className="mt-6 text-center text-4xl font-bold text-white">
            Đăng nhập Cinemahouse
          </h2>
          <p className="mt-2 text-center text-sm text-white">
            hoặc
            <NavLink
              to="/register"
              className="font-medium pl-2 text-red-500 hover:underline hover:underline-offset-4"
            >
              đăng ký tài khoản tại đây{" "}
            </NavLink>
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={formik.handleSubmit}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="taiKhoan" className="sr-only">
                Email
              </label>
              <input
                id="taiKhoan"
                name="taiKhoan"
                onChange={formik.handleChange}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                placeholder="Tài khoản"
              />
            </div>
            <div>
              <label htmlFor="matKhau" className="sr-only">
                Mật khẩu
              </label>
              <input
                id="matKhau"
                name="matKhau"
                onChange={formik.handleChange}
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                placeholder="Mật khẩu"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-white"
              >
                {" "}
                Lưu tài khoản{" "}
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-red-500 hover:underline hover:underline-offset-4"
              >
                {" "}
                Quên mật khẩu?{" "}
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: solid/lock-closed */}
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
