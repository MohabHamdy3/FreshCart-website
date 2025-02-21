import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, wishlist, removeProductFromWishlist } = useContext(WishlistContext);
  const [loading, setLoading] = useState(false);

  // Fetch product details
  const { data, isLoading } = useQuery(["ProductDetails", id], getProductDetails);

  async function getProductDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  // Add product to cart
  async function addToCart() {
    setLoading(true);
    const data = await addProductToCart(id);
    if (data.status === "success") {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setLoading(false);
  }

  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center mt-20">
        <Circles height="80" width="80" color="#4fa94d" ariaLabel="circles-loading" visible={true} />
      </div>
    );
  }

  const product = data?.data?.data; // Ensure product is properly retrieved
  const isInWishlist = Array.isArray(wishlist) && wishlist.some((item) => item._id === product.id);

  return (
    <div className="md:w-[80%] mx-auto p-5 mt-20">
      <div className="flex flex-wrap justify-center items-center">
        <div className="md:w-1/3 py-3 ">
          <div className="inner">
            <img src={product.imageCover} alt="product" className="w-full" />
          </div>
        </div>

        <div className="md:w-2/3 p-5">
          <div className="inner">
            <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
            <p className="mb-3">{product.description}</p>
            <h3 className="mb-3">{product.category.name}</h3>
            <div className="mt-3 mb-3 flex flex-wrap justify-between items-center">
              <div>
                <h2>{product.price} EGP</h2>
              </div>
              <div>
                <i className="fa-solid fa-star text-yellow-500"></i> {product.ratingsAverage}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-between items-center mt-5">
            <button
              onClick={addToCart}
              className="w-3/4 rounded text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-3 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {loading ? <i className="fa-solid fa-spinner fa-spin text-white"></i> : "Add to Cart"}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                if (isInWishlist) {
                  removeProductFromWishlist(product.id);
                } else {
                  addProductToWishlist(product.id);
                }
              }}
              className=""
            >
              {isInWishlist ? (
                <i className="fa-solid fa-heart text-red-700 text-4xl"></i>
                ) : (
                <i className="fa-solid fa-heart text-4xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
