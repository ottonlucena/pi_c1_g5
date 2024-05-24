import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

// import { Auth0Provider } from '@auth0/auth0-react';

import '@fontsource/playfair-display';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/400-italic.css';
import App from './App';
import './index.css';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Auth0Provider> */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    {/* </Auth0Provider> */}
  </React.StrictMode>
);
