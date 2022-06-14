import { applyMiddleware, combineReducers, createStore, } from "redux";
//Cấu hình middleware redux thunk
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk'
// Reducer
import { movieReducer } from "./reducers/movieReducer";
import { userReducer } from "./reducers/userReducer";
import { seatBookingReducer } from "./reducers/seatBookingReducer";
import { loadingReducer } from "./reducers/loadingReducer";
import { adminReducer } from "./reducers/adminReducer";



const rootReducer = combineReducers({
    movieReducer: movieReducer,
    userReducer: userReducer,
    seatBookingReducer: seatBookingReducer,
    loadingReducer: loadingReducer,
    adminReducer: adminReducer,
});

const middleware = [
    reduxThunk,
];

const customCompose = composeWithDevTools(applyMiddleware(...middleware));

export const store = createStore(rootReducer, customCompose);