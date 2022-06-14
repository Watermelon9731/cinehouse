import { DISPLAY_LOADING, DISPLAY_VIDEO, HIDE_LOADING, HIDE_VIDEO } from "./types/loadingType"

export const loadingDisplayAction = {
    type: DISPLAY_LOADING,
}

export const loadingHideAction = {
    type: HIDE_LOADING,
}

export const loadingDisplayVideoAction = (url) => {
    return (dispatch) => {
        const action = {
            type: DISPLAY_VIDEO,
            videoUrl: url,
        }
        dispatch(action)
    }
}

export const loadingHideVideoAction = () => {
    return (dispatch) => {
        const action = {
            type: HIDE_VIDEO,
            videoUrl: '',
        }
        dispatch(action)
    }
}