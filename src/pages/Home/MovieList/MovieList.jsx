import React from "react";
import { Tabs, Collapse, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import { loadingDisplayVideoAction } from "../../../redux/actions/loadingAction";

const { TabPane } = Tabs;

const { Panel } = Collapse;

export default function MovieList(props) {
  const { movieArray, cinemaChain } = useSelector(
    (state) => state.movieReducer
  );

  const dispatch = useDispatch();

  const timeShowing = moment().subtract(4, "weeks").format();

  const timeUpcoming = moment().add(2, "weeks").format();

  const renderMovieShowingItem = () => {
    return movieArray.map((movie, index) => {
      if (
        movie.ngayKhoiChieu >= timeShowing &&
        movie.ngayKhoiChieu <= timeUpcoming
      ) {
        return (
          <div className="group relative" key={index}>
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none md:aspect-square">
              <img
                src={movie.hinhAnh}
                alt={movie.biDanh}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="mt-4">
              <div>
                <h3 className="text-center mb-4 text-lg font-semibold text-white h-12">
                  <NavLink to={`/detail/${movie.maPhim}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {movie.tenPhim}
                  </NavLink>
                </h3>
              </div>
            </div>
            <button className="absolute p-5 left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-90 transition-opacity opacity-0 hover:opacity-100" onClick={() => {
              dispatch(loadingDisplayVideoAction(movie.trailer))
            }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 stroke-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button
              className="relative z-90 transition-colors bg-indigo-400 hover:bg-red-500 rounded p-3 text-white text-lg font-semibold w-full"
              onClick={() => {
                history.push(`/detail/${movie.maPhim}`);
              }}
            >
              Mua vé ngay
            </button>
          </div>
        );
      } return null;
    });
  };

  const renderMovieUpcomingItem = () => {
    return movieArray.map((movie, index) => {
      if (movie.ngayKhoiChieu > timeUpcoming) {
        return (
          <div className="group relative" key={index}>
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none md:aspect-square">
              <img
                src={movie.hinhAnh}
                alt={movie.biDanh}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="mt-4">
              <div>
                <h3 className="text-center mb-4 text-lg font-semibold text-white h-12">
                  <NavLink to={`/detail/${movie.maPhim}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {movie.tenPhim}
                  </NavLink>
                </h3>
              </div>
            </div>
            <button className="absolute p-5 left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-90 transition-opacity opacity-0 hover:opacity-100" onClick={() => {
              dispatch(loadingDisplayVideoAction(movie.trailer))
            }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 stroke-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button className="relative z-90 transition-colors bg-indigo-400 hover:bg-red-500 rounded p-3 text-white text-lg font-semibold w-full" onClick={() => {
                history.push(`/detail/${movie.maPhim}`);
              }}>
              Mua vé ngay
            </button>
          </div>
        );
      } return null;
    });
  };

  const renderCinemaShowtime = () => {
    const onChange = (key) => {
    };
    return cinemaChain.map((chain, index) => {
      return (
        <TabPane
          tab={
            <div className="px-3 py-2">
              <img src={chain.logo} className="w-20" alt={chain.maHeThongRap}/>
            </div>
          }
          key={index}
          className="text-white"
        >
          <div className="px-3 bg-gray-900 cinema-movie-list">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={onChange}
            >
              {chain.lstCumRap.map((cinema, index) => {
                // Filter no showing movie which had dangChieu = false
                const newCinema = () => {
                  let newArr = cinema.danhSachPhim.filter(
                    (item) =>
                      item.dangChieu !== false && item.dangChieu !== null
                  );
                  return newArr;
                };
                const data = newCinema();
                return (
                  <Panel
                    header={
                      <div>
                        <p className="text-base font-medium text-left mb-1">{cinema.tenCumRap}</p>
                        <small>{cinema.diaChi}</small>
                      </div>
                    }
                    key={index + 1}
                    className="bg-transparent"
                  >
                    <List
                      grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                      }}
                      dataSource={data}
                      renderItem={(movie) => {
                        if (movie.dangChieu) {
                          return (
                            <List.Item>
                              <NavLink to={`/detail/${movie.maPhim}`}>
                                <div className="mr-4">
                                  <div className="w-full min-h-80 bg-gray-200 mt-2 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none md:aspect-square">
                                    <img
                                      src={movie.hinhAnh}
                                      alt={movie.tenPhim}
                                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                    />
                                  </div>
                                  <div className="pt-3">
                                    <h3 className="text-center text-lg font-semibold text-black">
                                      {movie.tenPhim}
                                    </h3>
                                  </div>
                                </div>
                              </NavLink>
                            </List.Item>
                          );
                        }
                      }}
                    />
                  </Panel>
                );
              })}
            </Collapse>
          </div>
        </TabPane>
      );
    });
  };

  return (
    <section className="blockbusters">
      <div className="blockbusters-container">
        <div className="max-w-2xl mx-auto py-8 px-4 sm:py-10 sm:pb-5 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight uppercase">
            Phim đang chiếu
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {renderMovieShowingItem()}
            {/* More products... */}
          </div>
        </div>
        <div className="max-w-2xl mx-auto py-8 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight uppercase">
            Phim sắp chiếu
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {renderMovieUpcomingItem()}
            {/* More products... */}
          </div>
        </div>
        <div className="max-w-2xl mx-auto py-8 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight uppercase">
            Lịch chiếu hệ thống rạp
          </h2>
          <div className="mt-6">
            <div className="schedule">
              <Tabs defaultActiveKey="1">
                {renderCinemaShowtime()}
                {/* <TabPane
            tab={
              <div>
                <img src="https://picsum.photos/200" />
                <span>Tab 1</span>
              </div>
            }
            key="1"
            className="text-white"
          >
            Tab 1
          </TabPane>
          <TabPane
            tab={
              <div>
                <img src="https://picsum.photos/200" />
                <span>Tab 2</span>
              </div>
            }
            key="2"
            className="text-white"
          >
            Tab 2
          </TabPane>
          <TabPane
            tab={
              <div>
                <img src="https://picsum.photos/200" />
                <span>Tab 3</span>
              </div>
            }
            key="3"
            className="text-white"
          >
            Tab 3
          </TabPane> */}
              </Tabs>
            </div>
            {/* More products... */}
          </div>
        </div>
      </div>
    </section>
  );
}
