import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constants";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { toast } from "sonner";
import { setCurrentUser, setLoading, setUser, setUserRole } from "../store/authSlice";
import { Loader2 } from "lucide-react";
import PageHeader from "./shared/PageHeader";
function Login() {
  const loading = useSelector(store => store.auth.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData, selectedOption);
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_ENDPOINT}/${selectedOption}/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.data.user));
        dispatch(setUserRole(res.data.data.userRole));
        dispatch(setCurrentUser(true));
        console.log("Login successful:", res);
        navigate("/dashboard");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <PageHeader
        title="Login to SCOPE"
        subtitle="Access your account and connect with your college community"
      />
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        <div className="p-5 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Login to SCOPE</h2>
          <div>
            <h2>Select your Role</h2>
            <div className="flex">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={selectedOption === "student"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                Student
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={selectedOption === "teacher"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                Teacher
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="role"
                  value="tpc"
                  checked={selectedOption === "tpc"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                TPC
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  name="role"
                  value="tpo"
                  checked={selectedOption === "tpo"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                />
                TPO
              </label>
            </div>
            {/* <p>Selected: {selectedOption || 'None'}</p> */}
          </div>
          {/* {loginError && (
          <div className="p-3 mb-4 bg-scope-error/10 text-scope-error rounded-md text-sm">
            {loginError}
          </div>
        )} */}

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                //className={`w-full p-2 border rounded-md ${errors.email ? 'border-scope-error' : 'border-gray-300'}`}
                placeholder="example@email.com"
              />
              {/* {errors.email && <p className="mt-1 text-xs text-scope-error">{errors.email}</p>} */}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                //className={`w-full p-2 border rounded-md ${errors.password ? 'border-scope-error' : 'border-gray-300'}`}
                placeholder="Enter your password"
              />
              {/* {errors.password && <p className="mt-1 text-xs text-scope-error">{errors.password}</p>} */}
            </div>

            {/* <div className="flex justify-end">
            <a href="#" className="text-sm text-scope-primary hover:underline">
              Forgot password?
            </a>
          </div> */}
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4 ">
          {loading ? (
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors w-full">
              Please wait...
              <Loader2 className="animate-spin" />
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
            >
              Login
            </button>
          )}

          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default Login;
