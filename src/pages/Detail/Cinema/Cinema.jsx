import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

export default function Cinema() {
  const { movieDetail } = useSelector((state) => state.movieReducer);

  const { id } = useParams();

  const renderCinemaLogo = () => {
    return movieDetail["heThongRapChieu"]?.map((cinema, index) => {
      return (
        <li className="nav-item" role="presentation" key={index}>
          <a
            href={`#tabs-${cinema.maHeThongRap}`}
            className={`nav-link block font-medium text-xs leading-tight uppercase rounded-lg px-6 py-3 my-2  hover:bg-indigo-200 ${
              index === 0 ? "active" : ""
            }`}
            id={`tabs-${cinema.maHeThongRap}-tab`}
            data-bs-toggle="pill"
            data-bs-target={`#tabs-${cinema.maHeThongRap}`}
            role="tab"
            aria-controls={`#tabs-${cinema.maHeThongRap}`}
            aria-selected="true"
          >
            <img
              src={cinema.logo}
              alt={cinema.maHeThongRap}
              className="w-full"
            />
          </a>
        </li>
      );
    });
  };

  const renderCinemaDetail = () => {
    return movieDetail["heThongRapChieu"]?.map((cinema, index) => {
      return (
        <div
          className={`tab-pane fade show ${index === 0 ? " active" : ""}`}
          id={`tabs-${cinema.maHeThongRap}`}
          role="tabpanel"
          aria-labelledby={`tabs-${cinema.maHeThongRap}-tab`}
          key={index}
        >
          <div className="box-office grid grid-flow-row gap-6">
            {cinema["cumRapChieu"]?.map((box, index) => {
              return (
                <div className="box-item grid grid-cols-5 gap-5" key={index}>
                  <div className="box-title border-collapse border-2 border-indigo-200 active:bg-indigo-400 rounded-lg p-3 text-center">
                    <div className="mb-2">
                      <h3 className="font-medium text-red-500 text-lg">{box.tenCumRap}</h3>
                    </div>
                    <div className="mb-2 text-base">
                      <small>{box.diaChi}</small>
                    </div>
                  </div>
                  <div className="box-shcedule col-span-4 grid grid-cols-4 gap-5">
                    {box["lichChieuPhim"]?.map((schedule, index) => {
                      return (
                        <NavLink to={`/checkout/${schedule.maLichChieu}`} key={index}>
                          <div className="w-full h-full text-center p-3 border-collapse border-2 border-indigo-200 hover:bg-red-500 rounded-lg">
                            <div className="content">
                              <div className="time text-white text-base font-semibold">
                                {moment(schedule.ngayChieuGioChieu).format(
                                  "hh:mm A ~ DD/MM/YYYY"
                                )}
                              </div>
                            </div>
                          </div>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="cinema flex flex-col justify-center items-center py-5 px-24" id="cinema">
      <div className="cinema-item w-full h-1/3 my-5 rounded-b-md">
        <div className="title bg-indigo-400 text-center">
          <h3 className="text-white text-xl font-semibold p-5 px-4">
            Chọn hệ thống rạp
          </h3>
        </div>
        <div className="content text-white px-3" id="tabs-tab" role="tablist">
          <ul
            className="nav nav-tabs grid grid-cols-8 gap-6 list-none border-b-0"
            id="tabs-tab"
            role="tablist"
          >
            {renderCinemaLogo()}
          </ul>
        </div>
      </div>
      <div className="cinema-item w-full h-1/3 my-5 rounded-b-md">
        <div className="title bg-indigo-400 text-center">
          <h3 className="text-white text-xl font-semibold p-5 px-4">
            Chọn lịch chiếu
          </h3>
        </div>
        <div className="content text-white px-3 py-5">
          <div className="tab-content" id="tabs-tabContent">
            {renderCinemaDetail()}
          </div>
        </div>
      </div>
    </div>
  );
}
