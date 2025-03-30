import { Link} from "react-router-dom";
import { TrashIcon, RecycleIcon, UsersIcon } from "lucide-react";
const LandingPage = ({
  user
}) => {
  return <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <RecycleIcon className="text-white h-8 w-8" />
            <h1 className="text-2xl font-bold text-white">CleanUp</h1>
          </div>
          <div className="space-x-4">
            <Link to="/login" className="text-white hover:text-blue-100">
              Sign In
            </Link>
            <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
              Register
            </Link>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Smart Urban Waste Management
            </h2>
            <p className="text-xl mb-8">
              Join our platform to help keep our city clean, efficient, and
              sustainable.
            </p>
            <Link to="/register" className="bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-50">
              Get Started
            </Link>
          </div>
        </div>
      </section>
      {/* User Roles Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Choose Your Role
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <RoleCard icon={<UsersIcon className="h-12 w-12 text-blue-500" />} title="Residents" description="View waste collection schedules, report issues, and learn about environmental hygiene." />
            <RoleCard icon={<TrashIcon className="h-12 w-12 text-blue-500" />} title="Workers" description="Access assigned tasks, view optimized routes, and update task completion status." />
            <RoleCard icon={<RecycleIcon className="h-12 w-12 text-blue-500" />} title="Officials" description="Manage workers, assign tasks, and address reports from residents." />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard title="Real-time Notifications" description="Stay updated with alerts and important information." />
            <FeatureCard title="Collection Maps" description="View waste collection points and optimized routes." />
            <FeatureCard title="Task Management" description="Assign, track, and update waste collection tasks." />
            <FeatureCard title="Educational Resources" description="Learn about proper waste disposal and environmental care." />
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 CleanUp. All rights reserved.</p>
        </div>
      </footer>
    </div>;
};
const RoleCard = ({
  icon,
  title,
  description
}) => <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>;
const FeatureCard = ({
  title,
  description
}) => <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold mb-2 text-blue-600">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>;
export default LandingPage;