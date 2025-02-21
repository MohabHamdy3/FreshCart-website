import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "./../../assets/images/freshcart-logo.svg";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { CartContext } from "../../Context/CartContext";

function Navbar() {
  const { numOfItems } = useContext(CartContext);

  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("tkn");
    setToken(null);
    navigate("/Login");
  }
  return (
    <nav className=" bg-gray-100 p-5 fixed top-0 w-full z-50 ">
      <div className="flex flex-wrap items-center justify-between mx-auto">

        
        <div className="flex items-center space-x-3 rtl:space-x-reverse flex  items-center ">
          <Link to={""}>
            <img src={logo} className="h-8" alt="freshcart Logo" />
          </Link>
          {/* list of components */}
          <div
            className="hidden w-full md:block md:w-auto "
            id="navbar-solid-bg"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-5 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
              {token ? (
                <>
                  <li>
                    <NavLink
                      to="/"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500"
                      aria-current="page"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="relative">
                    <NavLink
                      to="/cart"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 "
                    >
                      Carts
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-4 -end-4">
                        {numOfItems}
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/products"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 "
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/category"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 "
                    >
                      Cateogries
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/brands"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 "
                    >
                      Brands
                    </NavLink>
                  </li>
                  <NavLink
                      to="/wish-list"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 "
                    >
                      Wish List
                    </NavLink>
                  <li>
                    <NavLink
                      to="/allorders"
                      className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 "
                    >
                      All orders
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>

                     {/* icons list and login / logout buttons */}
        <div className="lg:hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-wrap items-center font-medium mt-4 rounded-lg bg-gray-50  md:space-x-5 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent ">
            <li>
              <i className="fa-brands fa-instagram ml-1"></i>
            </li>
            <li>
              <i className="fa-brands fa-facebook ml-1"></i>
            </li>
            <li>
              <i className="fa-brands fa-tiktok ml-1"></i>
            </li>
            <li>
              <i className="fa-brands fa-twitter ml-1"></i>
            </li>
            <li>
              <i className="fa-brands fa-linkedin ml-1"></i>
            </li>
            <li>
              <i className="fa-brands fa-youtube ml-1"></i>
            </li>
            {token ? (
              <>
                <li>
                  <button
                    onClick={logout}
                    className="block py-2 px-3 md:p-0  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 "
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="block py-2 px-3 md:p-0  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500  "
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="block py-2 px-3 md:p-0  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 "
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
          </div>

       
        </div>
















        {/* icons list and login / logout buttons */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-5 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent ">
            <li>
              <i className="fa-brands fa-instagram ml-1"></i>
            </li>
            <li>
              <i className="fa-brands fa-facebook ml-1"></i>
            </li>
            <li>
              <i className="fa-brands fa-tiktok ml-1"></i>
            </li>
            <li>
              <i className="fa-brands fa-twitter ml-1"></i>
            </li>
            <li>
              <i className="fa-brands fa-linkedin ml-1"></i>
            </li>
            <li>
              <i className="fa-brands fa-youtube ml-1"></i>
            </li>
            {token ? (
              <>
                <li>
                  <button
                    onClick={logout}
                    className="block py-2 px-3 md:p-0  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 "
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="block py-2 px-3 md:p-0  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500  "
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="block py-2 px-3 md:p-0  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-500 "
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        
        <button
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-solid-bg"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
