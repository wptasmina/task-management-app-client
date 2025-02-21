import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';

import 'react-toastify/dist/ReactToastify.css';

import { RouterProvider } from 'react-router-dom';
import { router } from "./routes/router";
import AuthProvider from './components/auth/AuthProvider/AuthProvider';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <HelmetProvider>
        <RouterProvider router={router} /> 
        <ToastContainer position="top-center" />
     </HelmetProvider>
     </AuthProvider>
  </StrictMode>,
)

