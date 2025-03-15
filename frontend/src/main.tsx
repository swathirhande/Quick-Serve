import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router} from "react-router-dom";
import {QueryClient , QueryClientProvider} from "react-query";
import {Toaster} from "sonner"

import './index.css'
import AppRoutes from './AppRoutes';
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate';

{/*
  new QueryClient() → Creates a new client to handle API calls. 
  defaultOptions.queries.refetchOnWindowFocus: false → Prevents refetching when the user switches back to the browser tab. 
  By default, React Query refetches data when the tab comes into focus, but here, it is disabled. */}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   < Router>
   <QueryClientProvider client={queryClient}> {/* QueryClientProvider makes sure all components inside your app can use React Query functions. It acts like a global data store for managing API calls*/}
   <Auth0ProviderWithNavigate>
   <AppRoutes/>
   <Toaster visibleToasts={1} position='top-right' richColors />
   </Auth0ProviderWithNavigate>
   </QueryClientProvider>
   </Router>
  </StrictMode>,
)
