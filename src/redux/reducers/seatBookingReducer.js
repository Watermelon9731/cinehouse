import { SEAT_SELECTION, GET_SEAT_BOOKING_LIST, FINISH_SEAT_BOOKING } from "../actions/types/seatType";
import { UserBookingModel } from '../../models/UserBookingModel'


const stateDefault = {
    bookingDetail: {},
    seatDetail: [],
    seatSelection: [],
    userBooking: new UserBookingModel(),
    guestBooking: [
        {maGhe: 47728},
        {maGhe: 47731},
    ]
}

export const seatBookingReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_SEAT_BOOKING_LIST: {
            state.bookingDetail = action.bookingDetail;
            state.seatDetail = action.seatDetail;

            return { ...state };
        }

        case SEAT_SELECTION: {
            let baseData = [...state.seatSelection];
            let newData = action.seatSelection

            let idx = baseData.findIndex(item => item.maGhe === newData.maGhe)

            if (idx !== -1) {
                baseData.splice(idx, 1);
            } else {
                baseData.push(newData);
            }

            state.seatSelection = baseData;

            return { ...state }
        }

        case FINISH_SEAT_BOOKING: {
            state.userBooking = new UserBookingModel();
            return { ...state }
        }

        default: return { ...state };
    }
}