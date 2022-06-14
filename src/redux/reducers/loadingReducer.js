import { DISPLAY_LOADING, DISPLAY_VIDEO, HIDE_VIDEO, HIDE_LOADING } from '../actions/types/loadingType'

const stateDefault = {
    isLoading: false,
    isVideoLoading: false,
    videoUrl: '',
}

export const loadingReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DISPLAY_LOADING: {
            state.isLoading = true;
            return { ...state }
        }

        case HIDE_LOADING: {
            state.isLoading = false;
            return { ...state }
        }
        
        case DISPLAY_VIDEO: {
            state.isVideoLoading = true;
            state.videoUrl = action.videoUrl;
            return { ...state }
        }
        
        case HIDE_VIDEO: {
            state.isVideoLoading = false;
            state.videoUrl = action.videoUrl;
            return { ...state }
        }

        default:
            return { ...state }
    }
}
