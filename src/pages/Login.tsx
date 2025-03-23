import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RecycleIcon, KeyIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";
const Login = ({
  onLogin,
  user
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  useEffect(() => {
    const savedCredentials = localStorage.getItem("wasteManagementCredentials");
    if (savedCredentials) {
      const {
        email,
        password
      } = JSON.parse(savedCredentials);
      setFormData(prev => ({
        ...prev,
        email,
        password,
        rememberMe: true
      }));
    }
  }, []);
  if (user) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  const handleChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    const mockUsers = {
      "resident@example.com": {
        id: 1,
        name: "Jane Resident",
        email: "resident@example.com",
        role: "resident",
        location: "123 Main St"
      },
      "worker@example.com": {
        id: 2,
        name: "John Worker",
        email: "worker@example.com",
        role: "worker"
      },
      "official@example.com": {
        id: 3,
        name: "Sam Official",
        email: "official@example.com",
        role: "official"
      }
    };
    const user = mockUsers[formData.email];
    if (user && formData.password === "password") {
      if (formData.rememberMe) {
        localStorage.setItem("wasteManagementCredentials", JSON.stringify({
          email: formData.email,
          password: formData.password
        }));
      } else {
        localStorage.removeItem("wasteManagementCredentials");
      }
      toast.success("Login successful!");
      onLogin(user);
      navigate(`/${user.role}`);
    } else {
      toast.error("Invalid email or password");
    }
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-6">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <RecycleIcon className="h-10 w-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-blue-600">CleanUp</h1>
          </Link>
        </div>
        <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Log in to your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="you@example.com" required />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Demo emails: resident@example.com, worker@example.com,
                official@example.com
              </p>
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" required />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Demo password: password
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="rememberMe" name="rememberMe" type="checkbox" checked={formData.rememberMe} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
            <div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Log in
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default Login;