import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { createContext } from 'react'
import { AuthContext } from './AuthContext';
 

export const CartContext = createContext()
function CartContextProvider({children}) {
    const {token} = useContext(AuthContext)
    const [Products , setProducts] =  useState([])
    const [numOfItems , setNumOfItems] =  useState(0)
    const [totalPrice , setTotalPrice] =  useState(0)
    const [Loading , setLoading] =  useState(false)
    const [CartId , setCartId] =  useState(null)

    // add to cart
    async function addProductToCart(id){
        try{
         const {data} = await  axios.post("https://ecommerce.routemisr.com/api/v1/cart" , 
                {
                    productId : id,
                
                }
                ,
                {
                    headers : {
                        token: localStorage.getItem("tkn")
                    }
                }
            )

            getUserCart()
         return data;   
        }
        catch(err){
            console.log(err , "error adding to cart");
        }
    }

    // get user cart 
    async function getUserCart(){
        setLoading(true)    
        try{
            const {data} = await  axios.get("https://ecommerce.routemisr.com/api/v1/cart" , 
                {
                    headers : {
                        token: localStorage.getItem("tkn")
                    }
                }
            )
            setNumOfItems(data.numOfCartItems) 
            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
            setLoading(false)  ;
            setCartId(data?.data?._id) 
        }

        catch(err){
            console.log(err , "error getting user cart");
            setLoading(false)  ;
        }
    }


    // update count 

    async function updateCount(productId , count){
        try {
            const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
                count : count
            } , {
                headers : {
                    token: localStorage.getItem("tkn")
                }
            })
            setNumOfItems(data.numOfCartItems) 
            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
        }
        catch(err){
            console.log(err , "error updating count context");
        }
    }


    // delete product from cart
    async function deleteProductFromCart(productId){
        try {
            const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
                headers : {
                    token: localStorage.getItem("tkn")
                }
            })
            setNumOfItems(data.numOfCartItems) 
            setProducts(data.data.products)
            setTotalPrice(data.data.totalCartPrice)
        }
        catch(err){
            console.log(err , "error deleting product from cart");
        }
    }

    // delete all products from cart
    async function deleteAllProductsFromCart(){
        try {
            const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" , {
                headers : {
                    token: localStorage.getItem("tkn")
                }
            })
            setNumOfItems(0) 
            setProducts([])
            setTotalPrice(0)
        }
        catch(err){
            console.log(err , "error deleting all products from cart");
        }
    } 
    useEffect(function(){
        if(token != null){
             getUserCart()
        }
       
    }, [token])
  return (
    <CartContext.Provider value={
        {   addProductToCart ,
            Products ,
            numOfItems ,
            totalPrice ,
            Loading ,
            updateCount ,
            deleteProductFromCart ,
            deleteAllProductsFromCart ,
            CartId ,
            setProducts ,
            setNumOfItems ,
            setTotalPrice ,
        }
    }>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
