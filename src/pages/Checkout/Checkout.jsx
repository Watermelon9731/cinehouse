import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  seatSelectionAction,
  getSeatBookingListApi,
  postSeatBookingApi,
} from "../../redux/actions/seatBookingAction";
import { UserBookingModel } from "../../models/UserBookingModel";
import { FINISH_SEAT_BOOKING } from "../../redux/actions/types/seatType";

export default function Checkout(props) {
  const { userLogin } = useSelector((state) => state.userReducer);

  const {
    bookingDetail,
    seatDetail,
    seatSelection,
    guestBooking,
    userBooking,
  } = useSelector((state) => state.seatBookingReducer);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getSeatBookingListApi(id));
    return () => {
      dispatch({ type: FINISH_SEAT_BOOKING });
    };
  }, [id]);

  const renderSeatType = (seatType) => {
    let type = "";
    switch (seatType) {
      case "Thuong":
        return (type = "Thường");

      default:
        return (type = "VIP");
    }
  };

  const renderSeat = () => {
    return seatDetail.map((seatBox, idx) => {
      // binding seat status
      let seatType = "";
      let seatStt = false;

      // check for user seat booking
      if (seatBox.daDat) {
        seatType = "bg-red-500";
        seatStt = true;
      } else if (!seatBox.daDat && seatBox.loaiGhe === "Thuong") {
        seatType = "bg-gray-400";
      } else if (!seatBox.daDat && seatBox.loaiGhe === "Vip") {
        seatType = "bg-yellow-500";
      }

      // check for guest seat booking
      let idxGuestSeat = guestBooking.findIndex(
        (guest) => guest.maGhe === seatBox.maGhe
      );
      if (idxGuestSeat !== -1) {
        seatType = "bg-purple-500";
        seatStt = true;
      }

      // click to book
      let result = seatSelection.findIndex(
        (pick) => pick.maGhe === seatBox.maGhe
      );
      if (result !== -1) {
        seatType = "bg-indigo-500";
      }

      return (
        <button
          disabled={seatStt}
          className={`seat-item text-xs px-auto py-2 rounded-sm text-white ${seatType}`}
          key={idx}
          onClick={() => {
            const action = seatSelectionAction(seatBox);
            dispatch(action);
          }}
        >
          {seatBox.tenGhe}
        </button>
      );
    });
  };

  const renderReceiptItem = () => {
    return seatSelection.map((item, index) => {
      return (
        <div
          className={`list px-5 py-5 border-indigo-500 border-2 border-t-0 flex justify-between`}
          key={index}
        >
          <h3 className="w-1/3 text-white mb-0">Ghế số {item.tenGhe}</h3>
          <p className="w-1/3 mb-0">
            Giá vé: {item["giaVe"].toLocaleString()} đ
          </p>
          <p className="w-1/3 pl-3 mb-0">
            Loại ghế {renderSeatType(item.loaiGhe)}
          </p>
        </div>
      );
    });
  };

  const renderReceiptTotal = () => {
    let result = seatSelection.reduce((total, price, index) => {
      return (total += price.giaVe);
    }, 0);
    if (result !== 0) {
      return (
        <div className="list px-5 py-4 border-indigo-400 border-2 border-t-0 rounded-b-lg flex justify-between">
          <h3 className="font-semibold w-2/3 text-red-600 mb-0">Tổng tiền</h3>
          <p className="w-1/3 pl-3 text-red-500 font-semibold mb-0">
            {result.toLocaleString()} đ
          </p>
        </div>
      );
    }
  };

  return (
    <div className="checkout overflow-hidden" id="checkout">
      <div className="checkout-infor p-5 flex justify-between">
        <div className="movie-title w-1/2 text-white flex border-gray-400">
          <img
            src={bookingDetail.hinhAnh}
            alt={bookingDetail.tenPhim}
            className="w-40 rounded-lg"
          />
          <div className="content ml-5 pl-3 flex-row self-center">
            <h1 className="text-4xl text-red-600 font-semibold mb-3">
              {bookingDetail.tenPhim}
            </h1>
            <p className="mb-3 text-base">
              Suất chiếu: {bookingDetail.gioChieu} ~ {bookingDetail.ngayChieu}
            </p>
            <p className="mb-3 text-base">Cụm rạp: {bookingDetail.tenCumRap}</p>
            <p className="my-auto text-base">{bookingDetail.diaChi}</p>
          </div>
        </div>
        <div className="user-infor w-2/5 text-white flex border-gray-400">
          <div className="content px-5 flex-row self-center">
            <h1 className="text-4xl text-red-600 font-semibold mb-3">
              {userLogin.hoTen}
            </h1>
            <p className="mb-3 text-base">Email: {userLogin.email}</p>
            <p className="mb-3 text-base">Số điện thoại: {userLogin.soDT}</p>
            <p className="my-auto text-base">
              Địa chỉ: 239 Phan Xích Long, Phú Nhuận
            </p>
          </div>
        </div>
      </div>
      <div className="checkout-content p-5 flex justify-between">
        <div className="booking w-1/2">
          <div className="screen mb-10">
            <div className="screen-main bg-indigo-500 text-white text-xl font-semibold text-center uppercase p-5">
              Màn hình
            </div>
          </div>
          <div className="booking-block gap-3 mb-8">{renderSeat()}</div>
          <div className="seat-status grid grid-cols-3 gap-4">
            <div className="seat flex justify-start">
              <div className="p-3 mr-2 bg-red-500 rounded"></div>
              <span className="text-white self-end text-sm">Ghế đã đặt</span>
            </div>
            <div className="seat flex justify-start">
              <div className="p-3 mr-2 bg-yellow-500 rounded"></div>
              <span className="text-white self-end text-sm">Ghế VIP</span>
            </div>
            <div className="seat flex justify-start">
              <div className="p-3 mr-2 bg-indigo-500 rounded"></div>
              <span className="text-white self-end text-sm">Ghế đã chọn</span>
            </div>
            <div className="seat flex justify-start">
              <div className="p-3 mr-2 bg-gray-400 rounded"></div>
              <span className="text-white self-end text-sm">Ghế còn trống</span>
            </div>
            <div className="seat flex justify-start">
              <div className="p-3 mr-2 bg-purple-500 rounded"></div>
              <span className="text-white self-end text-sm">
                Ghế đang được đặt
              </span>
            </div>
          </div>
        </div>
        <div className="detail w-2/5 text-white">
          <div className="selecting">
            <h2 className="text-xl text-white text-center font-semibold bg-indigo-500 p-5 mb-0 rounded-t-lg">
              Danh sách ghế đã chọn
            </h2>
            {renderReceiptItem()}
            {renderReceiptTotal()}
          </div>
          <div className="my-5">
            <button
              className="py-3 w-full bg-indigo-500 hover:bg-red-500 rounded-lg text-lg font-semibold uppercase"
              onClick={() => {
                userBooking.maLichChieu = id;
                userBooking.danhSachVe = [...seatSelection];

                const action = postSeatBookingApi(userBooking);
                dispatch(action);
              }}
            >
              Đặt vé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
