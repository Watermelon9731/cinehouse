import axios from "axios";

export const GROUP_CODE = 'GP13';

export const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxNiIsIkhldEhhblN0cmluZyI6IjA4LzExLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2Nzg2NTYwMDAwMCIsIm5iZiI6MTYzNzY4NjgwMCwiZXhwIjoxNjY4MDEzMjAwfQ.QkTkDXeVpyqSwqxo_HmH-aQhbITi8vZC_UPJ7cPM3W4';

export const DOMAIN = 'https://movienew.cybersoft.edu.vn';

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const LOGO = 'https://drive.google.com/uc?id=1_j4jtFLPlm2iHmi1TkLSOIHIVXODmf5l';

export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 30000,
})

http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'TokenCybersoft': TOKEN,
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
    };
    return config;
}, errors => {
    return Promise.reject({ errors })
})

export const SET_USER_INFOR = 'SET_USER_LOGIN';

export const userLocalService = {
    setUserInfor: (data) => {
        let json = JSON.stringify(data);

        localStorage.setItem(SET_USER_INFOR, json);
    },

    getUserInfor: () => {
        let userInforJson = localStorage.getItem(SET_USER_INFOR);
        let userInfor = JSON.parse(userInforJson);

        return userInfor;
    },

    removeUserInfor: () => {
        localStorage.removeItem(SET_USER_INFOR);
        localStorage.removeItem(ACCESS_TOKEN);
    }
}

export const MOVIE_DETAIL = 'MOVIE_DETAIL'

export const movieLocalService = {
    setMovieDetail: (data) => {
        let json = JSON.stringify(data);

        localStorage.setItem(MOVIE_DETAIL, json);
    },

    getMovieDetail: () => {
        let movieDetailJson = localStorage.getItem(MOVIE_DETAIL);
        let movieDetail = JSON.parse(movieDetailJson);

        return movieDetail;
    },

    removeMovieDetail: () => {
        localStorage.removeItem(MOVIE_DETAIL);
    }
}