import React, { useContext, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Brands from './Components/Brands/Brands';
import NotFount from './Components/NotFound/NotFound';
import CounterContextProvider from './Context/CounterContext';
import { UserContext } from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';

export default function App() {

  let routers = createBrowserRouter([
    {path: '' , element: <Layout/> , children: [
      {index: true , element: <ProtectedRoute><Home/></ProtectedRoute>},
      {path: 'cart' , element: <ProtectedRoute><Cart/></ProtectedRoute>}, 
      {path: 'brands' , element: <ProtectedRoute><Brands/></ProtectedRoute>},
      {path: 'categories' , element: <ProtectedRoute><Categories/></ProtectedRoute>},
      {path: 'products' , element: <ProtectedRoute><Products/></ProtectedRoute>},
      {path: 'productdetails/:id' , element: <ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path: 'login' , element: <Login/>},
      {path: 'register' , element: <Register/>},
      {path: '*' , element: <NotFount/>}
    ]}
  ])
  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setUserToken(localStorage.getItem('userToken'));
    }
  }, [setUserToken]);

  return <>
    <CounterContextProvider>
      <RouterProvider router={routers}></RouterProvider>
    </CounterContextProvider>
  </>
}
