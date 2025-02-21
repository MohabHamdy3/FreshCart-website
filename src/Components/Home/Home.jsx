import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import toast from 'react-hot-toast/headless';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from './../../Context/WishlistContext';

function Home() {

  const {addProductToCart} = useContext(CartContext)
  const {addProductToWishlist , wishlist , removeProductFromWishlist } = useContext(WishlistContext) 
  const [loading , setloading] =  useState(false)
  const [searchTerm, setSearchTerm] = useState('');

async function addToCart (id){
    setloading(true);
   const data = await addProductToCart(id)
    if (data.status === "success"){
        toast.success(data.message)
        setloading(false)
    }
    else {
        toast.error(data.message)
        setloading(false)
    }
   
}
async function addToWishList(id){

   const data = await addProductToWishlist(id)
    if (data.status === "success"){
        toast.success(data.message)

    }
    else {
        toast.error(data.message)

    }
}
  async function getAllOProducts(){

return await axios.get("https://ecommerce.routemisr.com/api/v1/products")


  }
  
  useEffect(function(){
    getAllOProducts() 
  } , [])


const {isLoading , error , data , isFetching} = useQuery("products" , getAllOProducts , {
 //   staleTime: 1000 * 60 * 5,5 minutes
 //   refetchInterval: 1000 * 60 * 5,5 minutes
//   cacheTime: 1000 * 60 * 5, 5 minutes
})

// function for filtering products by searching
const filteredProducts = data?.data.data.filter((product) =>
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <>
      { !isLoading ?  <div className="mx-auto md:w-[90%] mt-20">
        {/* slider */}
        <HomeSlider/>
        <CategorySlider/>

         {/*  Search Input */}
         <div className="mb-6 flex justify-center py-10 ">
            <input
              type="text"
              placeholder="Search for a product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-lg p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            


          </div>
        <div className="flex flex-wrap justify-center items-center">
            {filteredProducts?.map(function(product , idx) {
              const isInWishlist = Array.isArray(wishlist) && wishlist.some((item) => item._id === product.id);

              return <>
              <div key={idx} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 p-4 ">
             <div className="inner bg-slate-50  p-3  rounded-lg shadow-md transition-all duration-300 hover:shadow-green-500/50 hover:scale-105"> 
              <Link to={`/ProductDetails/${product.id}`}>
                  <img src={product.imageCover} className='w-full' alt="product" />
                  <h3 className='mt-3 text-green-500 ' >{product.category.name}</h3>
                  <h3 className='mt-3 ' >{product.title.split(" ").splice(0 , 2).join(" ")}</h3>
                  <div className="mt-3 flex flex-wrap justify-between items-center">
                    <div>
                      <h2>{product.price} EGP</h2>
                    </div>
                    <div>
                      <i className='fa-solid fa-star text-yellow-500'></i>  {product.ratingsAverage}
                    </div>
                  </div>  
                   </Link>

                   
                   {/* buttons */}
                  <div className="flex flex-wrab justify-center items-center">
                  <button onClick={function(){
                    addToCart(product.id)
                  }} className="mt-3 w-full rounded text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    {loading ? <i className='fa-solid fa-spinner fa-spin text-white '></i> : "add to cart"}
                 </button>
                 
                 <button onClick={function(){
                    if (isInWishlist) {
                      removeProductFromWishlist(product.id); // If in wishlist, remove it
                    } else {
                      addToWishList(product.id); // If not in wishlist, add it
                    }
                  }}
                  className="w-1/3"
                  >
                     {isInWishlist ? <i class="fa-solid fa-heart text-red-700 text-2xl  "></i> : <i class="fa-solid fa-heart text-2xl"></i> }
                 </button>
                  </div>
                  
              </div>
           
            </div>
            </>})}
        </div>  
      </div> :<div className="h-screen flex flex-wrap justify-center items-center">
            <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
      </div>  }

    
         
     

    </>
  )
}

export default Home
