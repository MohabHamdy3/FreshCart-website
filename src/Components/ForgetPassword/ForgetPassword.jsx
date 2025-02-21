import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Request Reset, 2: Verify Code, 3: Set New Password
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );
      toast.success(response.data.message);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );
      toast.success(response.data.message);
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid reset code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        { email, newPassword, resetCode }
      );
      toast.success(response.data.message);
      // Redirect to login or another appropriate action
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-7">
      <h1 className="text-green-700 text-4xl text-center mb-12">Forgot Password</h1>
      <div className="max-w-md mx-auto">
        {step === 1 && (
          <form onSubmit={handleRequestReset}>
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2.5 rounded-md hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Code"}
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyCode}>
            <div className="mb-5">
              <label htmlFor="resetCode" className="block text-sm text-gray-700">Reset Code</label>
              <input
                type="text"
                id="resetCode"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2.5 rounded-md hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify Reset Code"}
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleSetNewPassword}>
            <div className="mb-5">
              <label htmlFor="newPassword" className="block text-sm text-gray-700">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2.5 rounded-md hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Set New Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
