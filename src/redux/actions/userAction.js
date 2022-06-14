import { http, GROUP_CODE, DOMAIN } from "../../util/config";
import { POST_USER_LOGIN, POST_USER_INFOR } from "./types/userType";
import { history } from '../../App'

export const postUserLoginApi = (user) => {
    // user = {username: '', password: ''}
    return async (dispatch) => {
        try {
            let result = await http.post(`/api/QuanLyNguoiDung/DangNhap`, user)

            // dispatch data
            if (result.data.statusCode === 200) {
                const action = {
                    type: POST_USER_LOGIN,
                    userLogin: result.data.content
                }
                dispatch(action);

                history.goBack();
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const postUserRegisterApi = (form) => {
    // form = {
    //   taiKhoan: "",
    //   matKhau: "",
    //   email: "",
    //   soDt: "",
    //   maNhom: "",
    //   hoTen: "",
    // }
    return async (dispatch) => {
        try {
            let result = await http.post(`/api/QuanLyNguoiDung/DangKy`, form)

            // dispatch data
            if (result.data.statusCode === 200) {
                const action = {
                    type: POST_USER_LOGIN,
                }
                
                alert('Đăng ký thành công!')

                history.push('/login');
            }
        } catch (error) {
            console.log('error', error);
            alert(error.response.data.content)
        }
    }
}

// Post access token to get user infor
export const postUserInfor = () => {
    return async (dispatch) => {
        try {
            let result = await http.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
            
            // dispatch data
            const action = {
                type: POST_USER_INFOR,
                userInfor: result.data.content
            }
            dispatch(action)
        } catch (err) {
            console.log(err);
        }
    }
}

// Post edited user infor
export const postEditedUserInfor = (formData) => {
    return async (dispatch) => {
        try {
            let result = await http.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, formData)

            alert('Cập nhật thành công!')

            const action = postUserInfor();
            dispatch(action);

            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
}