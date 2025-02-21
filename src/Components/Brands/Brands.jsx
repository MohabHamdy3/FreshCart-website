import React, { useEffect, useState } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";

function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(true);  
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true); 
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
        setBrands(response.data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchBrands();
  }, []);

  const handleClick = (brand) => {
    setSelectedBrand(brand);
    document.getElementById("brand-modal").classList.remove("hidden");
  };

  const closeModal = () => {
    document.getElementById("brand-modal").classList.add("hidden");
  };

  return (
    <>
       <div className="container mx-auto px-4 py-7 mt-20">
      <h1 className="text-center py-5 text-green-700 text-4xl font-bold">Brands</h1>


      {loading ? (
    <div className="h-screen flex flex-wrap justify-center items-center">
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
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="border p-4 rounded-lg text-center shadow-md transition-all duration-300 hover:shadow-green-500 hover:scale-105"
              onClick={() => handleClick(brand)}
            >
              <img src={brand.image} alt={brand.name} className="w-full h-32 object-contain mb-2" />
              <h3 className="text-lg font-semibold">{brand.name}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <div id="brand-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="hidden fixed inset-0 z-50 flex items-start justify-center mt-10">
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg">
          {/* Modal header */}
          <div className="flex items-center justify-end p-4 border-b border-gray-200">
            <button type="button" className="text-gray-500 hover:bg-gray-200 rounded-lg text-sm p-2" onClick={closeModal}>
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
          </div>
          {/* Modal body */}
          <div className="p-6 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-green-600">{selectedBrand?.name}</h3>
              <p className="text-gray-600">{selectedBrand?.slug}</p>
            </div>
            <img src={selectedBrand?.image} alt={selectedBrand?.name} className="h-20 w-32 object-contain" />
          </div>
          {/* Modal footer */}
          <div className="p-4 border-t border-gray-200 flex justify-end items-center">
            <button type="button" className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
 
  );
}

export default Brands;
