import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { Circles } from "react-loader-spinner";

function CategorySlider() {
  // Fetch categories
  async function getAllCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { isLoading, data } = useQuery("categories", getAllCategories);

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } }, // Large screens
      { breakpoint: 1024, settings: { slidesToShow: 4 } }, // Medium screens
      { breakpoint: 768, settings: { slidesToShow: 3 } }, // Tablets
      { breakpoint: 640, settings: { slidesToShow: 2 } }, // Mobile
    ],
  };

  return (
    <section className="py-10 px-5 mx-auto">
      {isLoading ? (
        <div className="h-40 flex justify-center items-center">
          <Circles height="50" width="50" color="#4fa94d" ariaLabel="loading" />
        </div>
      ) : (
        <div className="slider-container">
          <Slider {...settings}>
            {data?.data.data.map((item, idx) => (
              <div key={idx} className="p-2">
                <div className="bg-white shadow-md rounded-lg border-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[200px] object-cover rounded-t-lg"
                  />
                  <h3 className="py-3 text-center text-lg font-semibold text-green-600">
                    {item.name}
                  </h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </section>
  );
}

export default CategorySlider;
