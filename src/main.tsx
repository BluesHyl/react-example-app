import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@/style/tailwind.css';
// 导入全局样式
import 'antd/dist/reset.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);