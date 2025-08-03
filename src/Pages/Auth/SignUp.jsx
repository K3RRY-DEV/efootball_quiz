
import '../../index.css'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../../utils/auth';
import efootball_logo from '../../Images/efootball_logo.png';
import K3RRY_logo from '../../Images/K3RRY.png'

const SignUp = () => {

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
  });
  const [error, setError] = useState(null); // for error message

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const result = signupUser(formData);

      if (!result.success) {
    setError(result.message); // show error like "Email already exists"
    return;
  }

  // Signup successful
  navigate('/auth/login'); // or redirect to quiz or dashboard
  };


  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side – Optional Image or Quote */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-purple-600 p-10 text-white">
          <div className="text-center flex flex-col">
            <div className="flex items-center justify-center">
              <span>
                <img
                  className="w-[140px]" 
                  src={K3RRY_logo}
                  alt="kerry logo" 
                  />
              </span>
              <span>
                <img
                  className="w-[100px]"
                  src={efootball_logo}
                  alt="efootball logo" 
                  />
              </span>
            </div>
            <h2 className="text-[29px] font-bold mb-4">Welcome to efootball Quiz</h2>
            <p className="text-lg">Play. Learn. Compete.</p>
          </div>
        </div>

        {/* Right Side – Sign Up Form */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Create Your Account</h2>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-indigo-600">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                name="name"
                value={formData.name}
                required
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:border-0 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-indigo-600">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                required
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:border-0 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-indigo-600">Password</label>
              <input
                type="password"
                placeholder="********"
                name="password"
                value={formData.password}
                required
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:border-0 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-indigo-600">Confirm Password</label>
              <input
                type="password"
                placeholder="********"
                name="confirmPassword"
                value={formData.confirmPassword}
                required
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                className="w-full px-4 py-2 border rounded-md focus:border-0 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-800 transition duration-300 cursor-pointer"
            >
              Sign Up
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link to='/auth/login' className="text-indigo-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
