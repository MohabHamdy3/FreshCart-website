import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Circles } from "react-loader-spinner";

function Category() {
  async function getAllCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { isLoading, data } = useQuery("categories", getAllCategories);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState({});

  const fetchSubcategories = async (categoryId) => {
    if (subcategories[categoryId]) {
      setSelectedCategory(categoryId);
      return;
    }

    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/subcategories?category=${categoryId}`
      );

      setSubcategories((prev) => ({
        ...prev,
        [categoryId]: response.data.data,
      }));

      setSelectedCategory(categoryId);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className="mx-auto container py-10 mt-20">
          <h2 className="text-4xl text-center text-green-500 mb-6">
            Categories
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-3 p-10">
            {data?.data.data.map((category, idx) => (
              <div
                key={idx}
                className="w-full sm:w-1/3 lg:w-1/4 hover:shadow-md hover:shadow-green-400 cursor-pointer"
                onClick={() => fetchSubcategories(category._id)}
              >
                <div className="inner bg-slate-50 text-center p-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-green-500/50 hover:scale-105">
                  <img
                    src={category.image}
                    className="w-full rounded"
                    alt={category.name}
                  />
                  <h3 className="mt-3 text-2xl font-semibold text-green-500">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Subcategories Section */}
          {selectedCategory && subcategories[selectedCategory]?.length > 0 && (
            <div className="my-8 p-6 ">
              <h3 className="text-3xl text-center text-green-500 mb-4">
                Subcategories {" "}
                {data?.data.data.find((cat) => cat._id === selectedCategory)?.name} 
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {subcategories[selectedCategory].map((sub) => (
                  <div
                    key={sub._id}
                    className="w-full sm:w-1/3 lg:w-1/4 hover:shadow-md hover:shadow-green-400 cursor-pointer"
                  >
                    <div className="inner bg-slate-50 text-center p-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-green-500/50 hover:scale-105">
                      <h3 className="text-2xl ">
                        {sub.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            visible={true}
          />
        </div>
      )}
    </>
  );
}

export default Category;
