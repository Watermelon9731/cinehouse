import { Badge, Descriptions } from "antd";
import moment from "moment";
import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { history } from "../../App";

export default function TicketDetail() {
  const { bookingHistory } = useSelector((state) => state.adminReducer);

  const { userInfor } = useSelector((state) => state.userReducer);

  const { id } = useParams();

  const handleTicket = () => {
    if (bookingHistory.length !== 0) {
      let data = bookingHistory.filter((ticket) => ticket.maVe == id);
      return data[0];
    } else if(userInfor['thongTinDatVe'].length !== 0){
      let data = userInfor['thongTinDatVe'].filter((ticket) => ticket.maVe == id);
      return data[0];
    }
    history.goBack();
  };

  const renderSeat = (data) => {
    return (
      <Fragment>
        <Descriptions.Item label="Đã đặt">
          {data.length + 1} ghế
        </Descriptions.Item>
        <Descriptions.Item label="Số ghế">
          {data.map((item, index) => {
            if (index > 0) {
              return ` - ${item.tenGhe}`;
            } else {
              return `${item.tenGhe} `;
            }
          })}
        </Descriptions.Item>
      </Fragment>
    );
  };

  const renderTicketDetail = () => {
    let dataObj = handleTicket();
    return (
      <Fragment>
        <Descriptions.Item label="Hệ thống rạp">
          {dataObj.danhSachGhe[0]["tenHeThongRap"]}
        </Descriptions.Item>
        <Descriptions.Item label="Mã vé">{dataObj.maVe}</Descriptions.Item>
        <Descriptions.Item label="Ngày đặt">
          {moment(dataObj.ngayDat).format("DD/MM/YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Tên phim">
          {dataObj.tenPhim}
        </Descriptions.Item>
        <Descriptions.Item label="Giá vé">
          {dataObj.giaVe.toLocaleString()} đ
        </Descriptions.Item>
        <Descriptions.Item label="Thời lượng">
          <Badge status="processing" text={`${dataObj.thoiLuongPhim} phút`} />
        </Descriptions.Item>
        {renderSeat(dataObj.danhSachGhe)}
        <Descriptions.Item label="Tổng tiền">
          {(dataObj.giaVe * dataObj.danhSachGhe.length).toLocaleString()} đ
        </Descriptions.Item>
        <Descriptions.Item label="Ghi chú">
          Giá vé chưa bao gồm bắp, nước và sẽ có thay đổi vào ngày lễ, cuối
          tuần, sự kiện,....
          <br />
          Mọi thắc mắc xin liên hệ tại quầy hoặc hotline 1800xxx
        </Descriptions.Item>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Descriptions
        title={<h1 className="text-3xl font-bold mb-0">Chi tiết đặt vé</h1>}
        bordered
        extra={
          <button
            className="px-4 py-2 text-white font-medium rounded bg-red-500 border border-transparent hover:border-collapse hover:border-indigo-500 hover:bg-white hover:text-indigo-500"
            onClick={() => {
              history.goBack();
            }}
          >
            Quay về
          </button>
        }
      >
        {renderTicketDetail()}
      </Descriptions>
    </Fragment>
  );
}
