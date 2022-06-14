import { GROUP_CODE, http } from "../../util/config";
import { GET_ADMIN_EDIT_MOVIE, GET_ADMIN_MOVIE_LIST, GET_ADMIN_USER_LIST, POST_ADMIN_BOOKING_HISTORY } from './types/adminManagerType';
import { history } from "../../App";
import { loadingDisplayAction, loadingHideAction } from "./loadingAction";

// -------------------GET--------------------

// Get user list for admin dashboard and search field on dashboard
export const getAdminUserListApi = (userAcc = '') => {
    return async (dispatch) => {
        try {
            dispatch(loadingDisplayAction);

            const getList = () => {
                if (userAcc.trim() !== '') {
                    return (
                        http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_CODE}&tuKhoa=${userAcc}`)
                    );
                };
                return (
                    http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_CODE}`)
                );

            }

            let result = await getList();

            // dispatch data
            const action = {
                type: GET_ADMIN_USER_LIST,
                userList: result.data.content,
            }
            dispatch(action)

            dispatch(loadingHideAction);

        } catch (err) {
            console.log(err);
        }
    }
}

// Get movie list for admin dashboard and search field on dashboard
export const getAdminMovieListApi = (movieName = '') => {
    return async (dispatch) => {
        try {
            const getList = () => {
                if (movieName.trim() !== '') {
                    return (
                        http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_CODE}&tenPhim=${movieName}`)
                    );
                };
                return (
                    http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_CODE}`)
                );

            }
            let result = await getList();

            // dispatch data
            const action = {
                type: GET_ADMIN_MOVIE_LIST,
                movieList: result.data.content,
            };
            dispatch(action);

        } catch (err) {
            console.log(err);
        }
    }
}

// Get movie detail for editing
export const getAdminEditMovieApi = (movieCode) => {
    return async (dispatch) => {
        try {
            let result = await http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${movieCode}`);

            // dispatch data
            const action = {
                type: GET_ADMIN_EDIT_MOVIE,
                editMovie: result.data.content,
            }
            dispatch(action);

        } catch (err) {
            console.log(err);
        }
    }
}

// --------------------POST-------------------

// Post adding movie from admin dashboard
export const postAdminAddNewMovieApi = (formData) => {
    return async (dispatch) => {
        try {
            let result = await http.post(`https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh`, formData);

            alert('Đã thêm thành công!')
        } catch (err) {
            console.log(err);
        }
    }
}

// Post edited movie detail
export const postAdminEditedMovieApi = (formData) => {
    return async (dispatch) => {
        try {
            let result = await http.post(`api/QuanLyPhim/CapNhatPhimUpload`, formData);

            alert('Cập nhật thành công')

            const action = getAdminMovieListApi();
            dispatch(action);

            history.push('/admin/movielist')

        } catch (err) {
            console.log(err);
        }
    }
}

// Post adding showtime
export const postAdminAddShowtimeApi = (formData) => {
    return async (dispatch) => {
        try {
            let result = await http.post(`/api/QuanLyDatVe/TaoLichChieu`, formData);

            alert('Tạo lịch chiếu thành công!')

            const action = getAdminMovieListApi();
            dispatch(action);

            history.push('/admin/movielist')

        } catch (err) {
            console.log(err);
        }
    }
}

// Post send account name to get booking history
export const postAdminBookingHistoyApi = (account) => {
    return async (dispatch) => {
        try {
            dispatch(loadingDisplayAction);

            let result = await http.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${account}`);

            // dispatch data
            const action = {
                type: POST_ADMIN_BOOKING_HISTORY,
                bookingHistory: result.data.content['thongTinDatVe'],
            }
            dispatch(action);

            dispatch(loadingHideAction);
        } catch (err) {
            console.log(err);
        }
    }
}

// Post edited user infor
export const postAdminEditUserInfor = (formData) => {
    return async (dispatch) => {
        try {
            let result = await http.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, formData)

            alert('Cập nhật thành công!')

            const action = getAdminUserListApi();
            dispatch(action);

            history.push('/admin')
        } catch (err) {
            console.log(err);
        }
    }
}

// -------------------DELETE-------------------

// Delete movie 
export const deleteAdminMovieApi = (movieCode) => {
    return async (dispatch) => {
        try {
            let result = await http.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${movieCode}`);

            alert('Phim đã xoá khỏi hệ thống');

            const action = getAdminMovieListApi();
            dispatch(action);

        } catch (err) {
            console.log(err);
        }
    }
}

// Delete user
export const deleteAdminUserApi = (account) => {
    return async (dispatch) => {
        try {
            let result = await http.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`);

            alert('Tài khoản đã xoá khỏi hệ thống');

            const action = getAdminUserListApi();
            dispatch(action);

        } catch (err) {
            console.log(err);
        }
    }
}