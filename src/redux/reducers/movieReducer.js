import moment from "moment";
import { GET_CINEMA_CHAIN, GET_MOVIE_BANNER, GET_MOVIE_DETAIL, GET_MOVIE_LIST} from "../actions/types/movieType";
import { compareValue } from '../../controllers/controller'

const stateDefault = {
    movieArray: [],
    movieBanner: [],
    cinemaChain: [],
    movieDetail: {},
}

export const movieReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case GET_MOVIE_LIST: {
            const metadata = action.movieArray;

            const sortedArr = metadata.sort(compareValue("ngayKhoiChieu", 'desc'));

            state.movieArray = [...sortedArr];
            return { ...state }
        }

        case GET_MOVIE_BANNER: {
            state.movieBanner = action.movieBanner;
            return { ...state }
        }

        case GET_CINEMA_CHAIN: {
            state.cinemaChain = action.cinemaChain;
            return { ...state }
        }

        case GET_MOVIE_DETAIL: {
            state.movieDetail = { ...action.movieDetail };

            return { ...state }
        }


        default: return { ...state }

    }

}

