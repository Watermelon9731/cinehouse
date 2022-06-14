import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Redux
import { Provider } from 'react-redux'
import { store } from './redux/configStore';
// Tailwind elements
import 'tw-elements';
import { DOMAIN } from './util/config';
import 'antd/dist/antd.css';

// // SignalR
// import * as signalR from '@aspnet/signalr'

// // realtime socket
// export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();
// connection.start().then(() => {
// }).catch(erros => {
//   console.log(erros);
// })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , //jsx
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
