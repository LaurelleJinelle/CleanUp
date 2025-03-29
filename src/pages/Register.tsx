import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RecycleIcon, UserIcon, MailIcon, KeyIcon, MapPinIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

const Register = ({
  onRegister,
  user
}) => {
  const navigate = useNavigate();
    const { register, loginWithGoogle} = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "resident",
    location: ""
  })
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // Mock registration - in a real app, this would call an API
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      location: formData.location
    };
    await register(formData.name, formData.email, formData.password, formData.role)
    toast.success("Registration successful!");
    onRegister(newUser);
    navigate(`/${formData.role}`);
  };
  return <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-6">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <RecycleIcon className="h-10 w-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-blue-600">CleanUp</h1>
          </Link>
        </div>
        <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Create your account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" required />
              </div>
            </div>
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
            </div>
            <div>
              <label htmlFor="role" className="text-sm font-medium text-gray-700 block mb-2">
                I am a:
              </label>
              <select id="role" name="role" value={formData.role} onChange={handleChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                <option value="resident">Resident</option>
                <option value="worker">Worker</option>
                <option value="official">Waste Management Official</option>
              </select>
            </div>
            {formData.role === "resident" && <div>
                <label htmlFor="location" className="text-sm font-medium text-gray-700 block mb-2">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="123 Main St, City" required={formData.role === "resident"} />
                </div>
              </div>}
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
            </div>
            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="••••••••" required />
              </div>
            </div>
            <div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Create Account
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Log in
              </Link>
            </p>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={loginWithGoogle}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="flex items-center">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.798-1.677-4.198-2.707-6.735-2.707-5.523 0-10 4.477-10 10s4.477 10 10 10c8.396 0 10-7.326 10-12.234 0-0.598-0.066-1.170-0.162-1.734h-9.838z"
                    fill="#4285F4"
                  />
                </svg>
                Sign in with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default Register;