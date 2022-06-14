import { GET_ADMIN_MOVIE_LIST, GET_ADMIN_EDIT_MOVIE, GET_ADMIN_USER_LIST, POST_ADMIN_BOOKING_HISTORY } from "../actions/types/adminManagerType";
import { compareValue } from '../../controllers/controller'


const stateDefault = {
    movieList: [],
    editMovie: {},
    userList: [],
    bookingHistory: [],
}

export const adminReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_ADMIN_MOVIE_LIST: {

            const metadata = action.movieList;

            const sortedArr = metadata.sort(compareValue("ngayKhoiChieu", 'desc'));

            state.movieList = [...sortedArr];
            return { ...state }
        }

        case GET_ADMIN_EDIT_MOVIE: {
            state.editMovie = action.editMovie;
            return { ...state }
        }

        case GET_ADMIN_USER_LIST: {
            state.userList = action.userList;
            return { ...state }
        }

        case POST_ADMIN_BOOKING_HISTORY: {
            state.bookingHistory = action.bookingHistory;
            return { ...state }
        }

        default:
            return { ...state }
    }
}