import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@fontsource/playfair-display';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/400-italic.css';
import App from './App';
import './index.css';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
