import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { Circles } from 'react-loader-spinner'
import { useQuery } from 'react-query'

function AllOrders() {
  const {id} = jwtDecode(localStorage.getItem("tkn"))

  const getAllOrders = async (id) => {
    if (!id) {
      console.error("User ID is missing. API request aborted.");
      return null;
    }
  
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  };
  

  const { isLoading, data } = useQuery("AllOrders", () => getAllOrders(id));
  console.log(data);
  

  return (
    <div className="py-10 px-5 mx-auto max-w-6xl mt-20">
      <h1 className="text-center py-5 text-green-700 text-4xl font-bold">All Orders</h1>

      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <Circles height="80" width="80" color="#4fa94d" ariaLabel="circles-loading" />
        </div>
      ) : (
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data?.map((order, idx) => (
            <div
              key={idx}
              className="p-6 bg-white  rounded-lg shadow-md transition-all duration-300 hover:shadow-green-500/50 hover:scale-105 border border-gray-200"
            >
              {/* Order Details */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Total Price: <span className="text-green-600">{order.totalOrderPrice} EGP</span>
                </h2>
                <p className="text-gray-600">Payment Method: {order.paymentMethodType}</p>
              </div>

              {/* Cart Items */}
              <div className="flex flex-wrap gap-4">
                {order.cartItems.map((cartItem, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-gray-100 rounded-lg flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={cartItem.product.imageCover}
                      alt={cartItem.product.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <h3 className="mt-2 text-sm font-semibold text-gray-700">
                      {cartItem.product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllOrders;
