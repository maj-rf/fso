import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { NotifContextProvider } from './context/NotificationContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NotifContextProvider>
          <App />
        </NotifContextProvider>
      </UserProvider>
    </QueryClientProvider>
  </Router>,
);
