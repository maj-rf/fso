import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { NotifContextProvider } from './context/NotificationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotifContextProvider>
    <App />
  </NotifContextProvider>,
);
