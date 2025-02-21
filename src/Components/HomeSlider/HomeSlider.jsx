import React from "react";
import Slider from "react-slick";
import slider1 from "./../../assets/images/slider-image-1.jpeg";
import slider2 from "./../../assets/images/slider-image-2.jpeg";
import slider3 from "./../../assets/images/slider-image-3.jpeg";
import img1 from "./../../assets/images/grocery-banner-2.jpeg";
import img2 from "./../../assets/images/grocery-banner.png";

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
  };

  return (
    <section className="py-7 px-4 md:px-8">
      <div className="flex flex-wrap md:flex-nowrap justify-center items-center">
        {/* Main Slider  */}
        <div className="w-full md:w-2/3">
          <Slider {...settings}>
            <div>
              <img
                src={slider1}
                alt="slider1"
                className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-lg"
              />
            </div>
            <div>
              <img
                src={slider2}
                alt="slider2"
                className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-lg"
              />
            </div>
            <div>
              <img
                src={slider3}
                alt="slider3"
                className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] object-cover rounded-lg"
              />
            </div>
          </Slider>
        </div>

        {/* Side Images */}
        <div className="w-full md:w-1/3 flex flex-col ">
          <img
            src={img1}
            alt="img1"
            className="w-full h-[150px] sm:h-[180px] md:h-[220px] lg:h-[250px] object-cover rounded-lg shadow-md"
          />
          <img
            src={img2}
            alt="img2"
            className="w-full h-[150px] sm:h-[180px] md:h-[220px] lg:h-[250px] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
