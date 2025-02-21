import React, { useContext, useState } from 'react';
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from '../../Context/CartContext';
import { Circles } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function WishList() {
  const { wishlist, loading, removeProductFromWishlist, clearWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);
  const [addingToCart, setAddingToCart] = useState(null);

  async function addToCart(id) {
    setAddingToCart(id);
    const data = await addProductToCart(id);
    
    
    if (data.status === "success") {
      toast.success(data.message);
      removeProductFromWishlist(id);
    } else {
      toast.error(data.message);
    }
    setAddingToCart(null);
  }

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center mt-20">
        <Circles height="80" width="80" color="#4fa94d" ariaLabel="circles-loading" />
      </div>
    );
  }

  return (
    <div className='py-5 mx-auto md:w-[90%] my-5 bg-slate-100 mt-20'>
      {wishlist.length === 0 ? (
        <h1 className='text-green-700 text-4xl text-center'>THERE ARE NO WISH PRODUCTS TO DISPLAY</h1>
      ) : (
        <>
          <h1 className='text-green-700 text-4xl text-center'>My Wish List</h1>
          <div className="parent mt-3">
            {wishlist.map((item, idx) => (
              <div key={idx} className='flex flex-wrap justify-center items-center pb-3 border-b-[1px] border-slate-500 border-dotted'>
                <div className="w-1/6 p-4">
                  <img src={item.imageCover} alt="" className='w-full' />
                </div>
                <div className="w-4/6 p-4">
                  <h2 className='text-2xl font-bold'>{item.title}</h2>
                  <h3 className='my-2 text-gray-600'>{item.price} EGP</h3>
                  <button onClick={() => removeProductFromWishlist(item.id)} className=""><i class="text-1xl fa-solid fa-trash text-red-600 hover:text-red-800"></i> <span className='text-1xl text-red-600 hover:text-red-800'>remove</span></button>

                </div>
                <div className="w-1/6 p-4">
                  <button onClick={() => addToCart(item.id)} className="mt-3  rounded text-white bg-green-700 hover:bg-green-800 px-5 py-2.5">
                    {addingToCart === item.id ?  <i className='fa-solid fa-spinner fa-spin text-white '></i> : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center my-4 ">
          <button onClick={clearWishlist} className=" rounded text-white bg-red-700 hover:bg-red-800 px-5 py-2.5">Clear The List</button>
          </div>
        </>
      )}
    </div>
  );
}

export default WishList;
