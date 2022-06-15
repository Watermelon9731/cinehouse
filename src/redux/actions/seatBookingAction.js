import { http } from "../../util/config";
import { SEAT_SELECTION, GET_SEAT_BOOKING_LIST, FINISH_SEAT_BOOKING } from "./types/seatType";
import { loadingDisplayAction, loadingHideAction } from './loadingAction'


export const getSeatBookingListApi = (code) => {
    return async (dispatch) => {
        try {
            dispatch(loadingDisplayAction);

            let result = await http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${code}`)

            // dispatch data
            if (result.status === 200) {
                const action = {
                    type: GET_SEAT_BOOKING_LIST,
                    bookingDetail: result.data.content['thongTinPhim'],
                    seatDetail: result.data.content['danhSachGhe'],
                }
                dispatch(action);

                dispatch(loadingHideAction);
            }
        } catch (err) {
            dispatch(loadingHideAction);
            console.log(err);
        }
    }
}

export const seatSelectionAction = (seatBox) => {
    return (dispatch) => {
        const action = {
            type: SEAT_SELECTION,
            seatSelection: seatBox,
        }
        dispatch(action);
    }
}

export const postSeatBookingApi = (userBooking) => {
    return async (dispatch) => {
        try {
            dispatch(loadingDisplayAction)

            // Send user booking action to server
            let result = await http.post('/api/QuanLyDatVe/DatVe', userBooking)

            // reload seatDetail to show result
            await dispatch(getSeatBookingListApi(userBooking.maLichChieu))

            await dispatch({type: FINISH_SEAT_BOOKING})

            await dispatch(loadingHideAction)
            
            // window.location.reload()

        } catch (err) {
            dispatch(loadingHideAction);

            console.log(err);
        }
    }
}