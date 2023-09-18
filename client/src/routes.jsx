import { createBrowserRouter } from 'react-router-dom'
import Landing from "./pages/landing/Landing"
import App from './App'
import ErrorPage from "./pages/error/ErrorPage"
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Home from './pages/home/Home'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Landing/>},
      {path: "/register", element: <Register/>},
      {path: "/login", element: <Login/>},
      {path: "/home", element: <Home/>},
      {path: "/user/:id"}
    ]
  }
])