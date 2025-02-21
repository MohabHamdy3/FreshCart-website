import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { Link ,useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";


function Login() {
  const {setToken} = useContext(AuthContext)

  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false);
  const user = {
    email: "",
    password: "",
  };
  async function signin(values) {
    setisLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      localStorage.setItem("tkn" , data.token)
      setToken(data.token);

      toast.success(data.message);
      setisLoading(false);
      navigate("/");
    } catch (e) {
      toast.error(e.response.data.message);
      setisLoading(false);
    }
  }

  const validYup = Yup.object().shape({
   
    email: Yup.string()
      .required("The email is required")
      .email("Enter a valid email address"),
    password: Yup.string()
      .required("The password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character"
      ),
   
  });
  const formik = useFormik({
    initialValues: user,
    onSubmit: signin,
    validationSchema: validYup,
  });
  return (
    <div className="py-7 min-h-screen mt-20">
      <div className="container mx-auto">
        <h1 className="text-green-700 text-4xl text-center mb-12">
          Login now
        </h1>
        <div className="w-{60%}">
          <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
     
            {/* Email input */}
              <div className="relative z-0 w-full mb-5 group">
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email
                </label>
              </div>

            {formik.errors.email  && formik.touched.email ? (
              <div
                class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span class="font-medium">Error!</span>{formik.errors.email}
              </div>
            ) : (
              ""
            )}
            {/* password input */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>

            {formik.errors.password  && formik.touched.password ? (
              <div
                class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span class="font-medium">Error!</span>{formik.errors.password}
              </div>
            ) : (
              ""
            )}
           
           <div className="flex flex-wrap justify-between fa-align-center ">
           <button
              type="submit"
              className=" text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? (
                <i className="fa-solid fa-spin fa-spinner text-white "></i>
              ) : (
                "Login  "
              )}
            </button>
            <Link to={"/forget-password"} className="hover:text-green-500 ">forget the password</Link>

           </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
