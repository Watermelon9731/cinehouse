import { ACCESS_TOKEN, SET_USER_INFOR, userLocalService } from "../../util/config";
import { POST_USER_INFOR, POST_USER_LOGIN } from "../actions/types/userType"

let user = {};
if (userLocalService.getUserInfor()) {
    user = userLocalService.getUserInfor();
}


const stateDefault = {
    userLogin: user,
    userInfor: {},
}

export const userReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case POST_USER_LOGIN: {
            let userDetail = action.userLogin;

            userLocalService.setUserInfor(userDetail);

            localStorage.setItem(ACCESS_TOKEN, userDetail.accessToken);

            state.userLogin = userDetail;
            return { ...state }
        }

        case POST_USER_INFOR: {
            state.userInfor = action.userInfor
            return { ...state }
        }

        default: return { ...state }
    }
}