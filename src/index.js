import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Configuration, TablePreview } from './pages';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FileProvider } from './providers/file';
import { ConfigProvider } from './providers/config';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ConfigProvider>
        <FileProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="config" element={<Configuration />} />
            <Route path="tablePreview" element={<TablePreview />} />
          </Routes>
        </FileProvider>
      </ConfigProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
