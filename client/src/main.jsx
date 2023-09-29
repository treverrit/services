import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import Landing from "./pages/landing/Landing"
import App from './App'
import ErrorPage from "./pages/error/ErrorPage"
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import {router} from './routes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
