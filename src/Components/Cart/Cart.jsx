import React, { useContext } from 'react'

import { CartContext } from '../../Context/CartContext'
import { Circles } from 'react-loader-spinner'

import { Link } from 'react-router-dom';

function Cart() {
  const {Products , totalPrice , Loading , updateCount , deleteProductFromCart , deleteAllProductsFromCart} = useContext(CartContext)
  if(Loading){
    return <div className="h-screen flex flex-wrap justify-center items-center">
                <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
          </div>
  }
  return (
    <div className='py-5 mx-auto md:w-[90%] my-5 bg-slate-100 mt-20 '>
      {Products?.length == 0 ? <h1 className='text-green-700 text-4xl text-center'>THERE ARE NO PRODUCTS TO DISPLAY</h1> : <>
        <h1 className='text-green-700 text-4xl text-center py-3'>Shop Cart</h1>
      
      <div className="payment flex flex-wrap justify-between items-center px-10">
      <h3 className='font-mono text-green-700 '>Total Price :{totalPrice} EGP</h3>
      <Link to="/Payment"  className=" rounded text-white bg-sky-700 hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800">
           Check out
          </Link>
      </div>
      <div className="parent mt-3">
    {/* mapping */}
      {Products?.map(function (item , idx) {
        return  <div key={idx} className='flex flex-wrap justify-center items-center pb-3 border-b-[1px] border-slate-500 border-dotted'>
        {/*img */}
        <div className="w-1/6 p-4">
        <div>
          <img src={item.product.imageCover} alt="" className='w-full' />
        </div>
        </div>

        {/* content */}
        <div className="w-4/6 p-4">
        <h2 className='text-2xl font-bold'>{item.product.title}</h2>
        <h3 className='my-2 text-gray-600'>{item.price} EGP</h3>
       

          <button onClick={() =>deleteProductFromCart(item.product._id)} className=""><i class="text-1xl fa-solid fa-trash text-red-600 hover:text-red-800"></i> <span className='text-1xl text-red-600 hover:text-red-800'>remove</span></button>

        </div>
        
        {/* count */}
        <div className="w-1/6 p-4">
        <div className='flex flex-wrap justify-center items-center'>
        <button onClick={() => updateCount(item.product._id , item.count + 1)}  className="rounded text-green-500  hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm p-2 text-center me-2 mb-2 border ">
           +
          </button>
          <h3 className="px-2">{item.count}</h3>
          <button  onClick={() => updateCount(item.product._id , item.count - 1)}  className="rounded text-green-500  hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm p-2 text-center me-2 mb-2 border ">
           -
          </button>
        </div>
        </div>
      </div>
     
      })}

     
      </div>
      <div className="flex flex-wrap justify-center items-center my-4 "> 
      <button onClick={() => deleteAllProductsFromCart()}  className="rounded text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
           Clear Cart
          </button>
      </div>
      </>
      }
      
    </div>
  )
}

export default Cart
