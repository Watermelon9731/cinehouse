import { http, GROUP_CODE } from "../../util/config";
import { GET_CINEMA_CHAIN, GET_MOVIE_BANNER, GET_MOVIE_DETAIL, GET_MOVIE_LIST, GET_MOVIE_SCHEDULE, GET_MOVIE_THEATER } from "./types/movieType";

// Get data for homepage
export const getMovieListApiAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_CODE}`);

            // dispatch data
            const action = {
                type: GET_MOVIE_LIST,
                movieArray: result.data.content,
            };
            dispatch(action);
        } catch (err) {
            console.log(err);
        }
    }
}

// Get data for banner
export const getMovieBannerApiAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.get('/api/QuanLyPhim/LayDanhSachBanner');

            // dispatch data
            const action = {
                type: GET_MOVIE_BANNER,
                movieBanner: result.data.content,
            }
            dispatch(action);
        } catch (err) {
            console.log(err);
        }
    }
}

// Get cinema chain data
export const getCinemaChainApi = () => {
    return async (dispatch) => {
        try {
            let result = await http.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_CODE}`);

            // dispatch data
            const action = {
                type: GET_CINEMA_CHAIN,
                cinemaChain: result.data.content,
            }
            dispatch(action);
            
        } catch (err) {
            console.log(err);
        }
    }
}

// Get data for detail page
export const getMovieDetailApi = (movieCode) => {
    return async (dispatch) => {
        try {
            let result = await http.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieCode}`)

            // dispatch data
            const action = {
                type: GET_MOVIE_DETAIL,
                movieDetail: result.data.content,
            }
            dispatch(action);
        } catch (err) {
            console.log(err);
        }
    }
}