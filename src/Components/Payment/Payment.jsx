import React, { useState } from 'react'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios'

function Payment() {


    const {CartId ,setProducts ,
        setNumOfItems ,
        setTotalPrice ,} = useContext(CartContext)
    const [Loading , setLoading] = useState(false)
    const [Phone , setPhone] = useState("")
    const [City , setCity] = useState("")
    const [Details , setDetails] = useState("")


    async function cashOrder () {
        setLoading(true)
        const x = {
            shippingAddress:{
                 phone: Phone,
                 city: City,
                 details: Details
            }
           
        }
        try{
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}` , x , {
                headers: {
                    token : localStorage.getItem("tkn")
                }
            })
            setNumOfItems(0) 
            setProducts([])
            setTotalPrice(0)
            setLoading(false)
        }
        catch(e){
            console.log(e)
            setLoading(false)
        }
        
    }


    async function onlineOrder () {
        const x = {
            shippingAddress:{
                 phone: Phone,
                 city: City,
                 details: Details
            }
           
        }
        try{
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}` , x , {
                headers: {
                    token : localStorage.getItem("tkn")
                },
                params :{
                    url : "http://localhost:5173"
                }
            })
            window.open(data.session.url)
           
        }
        catch(e){
            console.log(e)
                }
        
    }
  return (
    <div className='py-10 md:w-[60%] mx-auto px-5 mt-20'>
        <h1 className='text-center py-5 text-green-700 text-4xl '>Payment</h1>
           {/* details input */}
           <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={(event) => setDetails(event.target.value)}
                type="text"
                name="details"
                id="details"
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Details
              </label>
            </div>


           {/* phone input */}
         <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={(event) => setPhone(event.target.value)}
                type="tel"
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone
              </label>
            </div>


               {/* City input */}
         <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={(event) => setCity(event.target.value)}
                type="text"
                name="city"
                id="city"
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="city"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City
              </label>
            </div>

            <button onClick={cashOrder} className="rounded text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                {Loading ? <i className='fa-solid fa-spinner fa-spin text-white '></i> : "Cash payment"}
          </button>
          <button onClick={onlineOrder} className="rounded text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                {Loading ? <i className='fa-solid fa-spinner fa-spin text-white '></i> : "online payment"}
          </button>
      
    </div>
  )
}

export default Payment
