import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Brands from './Components/Brands/Brands';
import Category from './Components/Category/Category';
import Layout from './Components/Layout/Layout';
import Error from './Components/Error/Error';
import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';
import AuthContextProvider from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import Payment from './Components/Payment/Payment';
import AllOrders from './Components/AllOrders/AllOrders';
import ForgotPassword from './Components/ForgetPassword/ForgetPassword';
import Products from './Components/Products/Products';
import WishList from './Components/WishList/WishList';
import WishlistContextProvider from './Context/WishlistContext';
function App() {
  const x = new QueryClient()

 const router =  createBrowserRouter([
  { path: "" , element: <Layout/> , children: [
    { path: "/" , element: <ProtectedRoute> <Home/> </ProtectedRoute>} ,
    { path: "/cart" , element: <ProtectedRoute><Cart/> </ProtectedRoute> } ,
    { path: "/productDetails/:id" , element: <ProtectedRoute> <ProductDetails/> </ProtectedRoute> } ,
    { path: "/register" , element: <Register/>} ,
    { path: "/login" , element: <Login/>} , 
    { path: "/forget-password" , element: <ForgotPassword/>} , 
    { path: "/brands" , element: <ProtectedRoute> <Brands/>   </ProtectedRoute>} ,
    { path: "/products" , element: <ProtectedRoute> <Products/>   </ProtectedRoute>} ,
    { path: "/wish-list" , element: <ProtectedRoute> <WishList/>   </ProtectedRoute>} ,
    { path: "/category" , element:   <ProtectedRoute><Category/></ProtectedRoute>} ,
    { path: "/Payment" , element:   <ProtectedRoute><Payment/></ProtectedRoute>} ,
    { path: "/allorders" , element:   <ProtectedRoute><AllOrders/></ProtectedRoute>} ,
    { path: "*" , element: <Error/>} , 
  ]}
  ])


  return (
    <QueryClientProvider client={x}> 

    <AuthContextProvider>  
    <WishlistContextProvider>
    <CartContextProvider>

          <Toaster/> 
          <RouterProvider router={router}/>
         
    </CartContextProvider>
    </WishlistContextProvider>
    </AuthContextProvider>
    </QueryClientProvider>

  )
}

export default App
