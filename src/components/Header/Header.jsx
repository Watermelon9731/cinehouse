import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../App";
import { isEmtyObject } from "../../controllers/controller";
import { ACCESS_TOKEN, LOGO, userLocalService } from "../../util/config";

export default function Header(props) {
  const { userLogin } = useSelector((state) => state.userReducer);

  const renderLogin = () => {
    if (Object.keys(userLogin).length === 0) {
      return (
        <Fragment>
          <div className="register-button mr-4 p-2">
            <button
              type="button"
              className="nav-link text-gray-400 hover:text-white"
              onClick={() => {
                history.push("/register");
              }}
            >
              Nếu chưa có tài khoản hãy đăng ký ngay!
            </button>
          </div>
          <div className="text-center">
            <button
              type="button"
              className="py-2 px-8 rounded-xl text-white font-normal bg-red-600 hover:bg-indigo-400 flex items-center hidden-arrow"
              onClick={() => {
                history.push("/login");
              }}
            >
              Đăng nhập
            </button>
          </div>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div className="mr-4">
          <span className="text-gray-400">Chào mừng đã trở lại!</span>
        </div>
        <div className="dropdown relative text-center">
          <button
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className="dropdown-toggle py-2 px-8 rounded-xl text-white font-normal bg-indigo-400 hover:bg-red-600 flex items-center hidden-arrow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 27"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="ml-3">{userLogin.taiKhoan}</span>
          </button>
          <ul
            className="w-full dropdown-menu min-w-max absolute hidden bg-gray-500 text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <button
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-indigo-400"
                onClick={() => {
                  if (!isEmtyObject(userLogin)) {
                    let userRole = userLogin.maLoaiNguoiDung;
                    switch (userRole) {
                      case "QuanTri": {
                        history.push(`/admin`);
                        break;
                      }

                      case "KhachHang": {
                        history.push(`/user`);
                        break;
                      }

                      default:
                        alert("Vui lòng đăng nhập lại!");
                    }
                  }
                }}
              >
                Tài khoản
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white hover:bg-red-600"
                onClick={() => {
                  userLocalService.removeUserInfor();
                  localStorage.removeItem(ACCESS_TOKEN);
                  window.location.reload();
                }}
              >
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  };

  return (
    <header id="header">
      <nav className="header-container relative w-full flex flex-wrap items-center justify-between py-4 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
          <button
            className=" navbar-toggler text-gray-500 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bars"
              className="w-6"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              ></path>
            </svg>
          </button>
          <div
            className="collapse navbar-collapse flex-grow items-center relative"
          >
            <NavLink
              className="flex items-center text-gray-900 hover:text-gray-900 focus:text-gray-900 mt-2 lg:mt-0"
              alt="cinehouse-logo"
              to="/home"
            >
              <img
                src={LOGO}
                alt="cinehouse-logo"
                loading="lazy"
                className="w-16"
              />
            </NavLink>
            {/* Left links */}
            <div className="navbar-nav flex flex-col pl-0 list-style-none ml-2 mr-auto mb-0 absolute left-20">
              <div className="nav-item p-2 text-white text-xl font-semibold leading-loose ">Cinehouse - Đặt vé và trải nghiệm</div>
              <div></div>
            </div>
            {/* Left links */}
          </div>
          {/* Collapsible wrapper */}
          {/* Right elements */}
          <div className="flex items-center relative">
            {/* Icon */}
            {renderLogin()}
          </div>
          {/* Right elements */}
        </div>
      </nav>
    </header>
  );
}
