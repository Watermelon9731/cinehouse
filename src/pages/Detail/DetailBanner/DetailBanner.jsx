import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { dateFormat, searchMovie } from "../../../controllers/controller";
import { getMovieDetailApi } from "../../../redux/actions/movieAction";

export default function DetailBanner() {
  const { movieDetail } = useSelector((state) => state.movieReducer);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(async () => {
    const action = getMovieDetailApi(Number(id));
    dispatch(action);
  }, []);

  return (
    <div className="detail-banner">
      <div
        className="glass-container w-full flex items-center"
        style={{ backgroundImage: `url('${movieDetail.hinhAnh}')` }}
      >
        <div className="banner-glass glass-item-s2 w-full h-full flex justify-evenly items-center">
          <div className="glass-img w-1/4 h-auto overflow-hidden rounded-xl">
            <div className="glass-item-s2 rounded-lg overflow-hidden">
              <img src={movieDetail.hinhAnh} alt={movieDetail.biDanh} className="w-full" />
            </div>
          </div>
          <div className="w-1/2 text-left">
            <div className="glass-item-s2 text-left text-white rounded inline-block px-6 py-4">
              <h2 className="text-3xl leading-relaxed font-bold pb-5 text-red-500 uppercase">
                {movieDetail.tenPhim}
              </h2>
              <div className="content">
                <div className="content-item flex justify-start">
                  <h3 className="text-lg text-white font-medium pb-5">
                    Ngày khởi chiếu: {dateFormat(movieDetail.ngayKhoiChieu)}
                  </h3>
                  <h3 className="text-white text-lg font-medium mx-auto">
                    Đánh giá: {movieDetail.danhGia}/10
                  </h3>
                </div>
                <p className="pb-3 text-lg">{movieDetail.moTa}</p>
              </div>
            </div>
            <a href="#cinema" className="block text-center w-1/3 my-8 bg-red-500 rounded hover:bg-indigo-500 py-4 px-8 text-white hover:text-white text-xl font-semibold uppercase">
              Mua vé ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
