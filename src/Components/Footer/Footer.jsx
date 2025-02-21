import React from "react";
import img_paymentPartner1 from "./../../assets/images/p1.png"
import img_paymentPartner2 from "./../../assets/images/p2.png"
import img_paymentPartner3 from "./../../assets/images/p3.png"
import img_paymentPartner4 from "./../../assets/images/p4.png"
import img_appstore from "./../../assets/images/a1.png"
import img_googleplay from "./../../assets/images/a2.png"

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-10 pb-20">
      <div className="container mx-auto text-center md:text-left">
          <h2 className="text-2xl">Get the FreshCart app</h2>
          <p className=" text-gray-500 py-3 mb-4">We will send you link, open it on your phone to download the app</p>
          <div className="flex flex-wrap justify-center gap-5 items-center border-b-2 border-dashed border-gray-300 py-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-3/4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            
           
          />
           <button  className=" rounded text-white bg-green-700 hover:bg-green-800 px-5 py-2">
                   Add to link
                  </button>
          </div>
          <div className="flex flex-wrap justify-between items-center py-5 border-b-2 border-dashed border-gray-300   ">
            <div className="flex flex-wrap items-center justify-center space-x-2">
            <p>Payment Partners</p>
            <img src={img_paymentPartner1} alt="amazon pay" className="w-[50px]" />
            <img src={img_paymentPartner2} alt="american express" className="w-[50px]" />
            <img src={img_paymentPartner3} alt="master card" className="w-[50px]" />
            <img src={img_paymentPartner4} alt="paypal" className="w-[50px]" />
            </div>
            <div className="flex flex-wrap items-center justify-center space-x-1">
            <p>Get deliveries with FreshCart</p>
            <img src={img_appstore} alt="app store" className="w-[100px]" />
            <img src={img_googleplay} alt="google play" className="w-[100px]" />


            </div>

          </div >
      </div>
    </footer>
  );
};

export default Footer;
