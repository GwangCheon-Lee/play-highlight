import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './common/assets/fonts/Pretendard-Bold.woff'
import './common/assets/fonts/Pretendard-Bold.otf'
import './common/assets/fonts/Pretendard-Light.otf'
import './common/assets/fonts/Pretendard-Light.woff'
import './common/assets/fonts/Pretendard-Regular.otf'
import './common/assets/fonts/Pretendard-Regular.woff'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GlobalStyle} from "./common/components/GlobalStyle";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <GlobalStyle/>
        <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
