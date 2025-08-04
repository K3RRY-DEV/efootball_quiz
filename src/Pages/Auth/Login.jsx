import '../../index.css'
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../utils/auth';
import { CheckCircle, XCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import efootball_logo from '../../Images/efootball_logo.png';
import K3RRY_logo from '../../Images/K3RRY.png';
import { useLoader } from '../../Context/LoaderContext';
import { getCurrentUser } from '../../utils/auth';

const Login = () => {

  const { showLoader, hideLoader } = useLoader();

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      // User is already logged in, redirect away
      navigate('/quiz', { replace: true });
    }
  }, []);

    const handleLogin = async (e) => {
       e.preventDefault();

        showLoader();

  // Simulate async operation or actual async login if needed
  // Here, your loginUser is sync, so simulate delay:
      await new Promise((resolve) => setTimeout(resolve, 500)); 

      const result = loginUser(formData);

      if (result.success) {
        toast.success(
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600 bg-green-100 rounded-full p-1 w-6 h-6 animate-ping-slow" />
            <div>
              <p className="font-semibold text-sm">Login Successful</p>
              <p className="text-xs text-gray-700">Welcome back!</p>
            </div>
          </div>,
          {
            className:
              "bg-white text-gray-900 shadow-lg rounded-xl px-4 py-3 border border-green-300",
            progressClassName: "bg-green-500",
            icon: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

        // wait for toast to show then navigate & hide loader
        setTimeout(() => {
          hideLoader();
          navigate('/quiz');
        }, 1500); // 1.5 seconds delay
      } else {
        toast.error(
          <div className="flex items-center gap-3">
            <XCircle className="text-white bg-red-600 rounded-full p-1 w-6 h-6" />
            <div>
              <p className="font-semibold text-sm">Login Failed</p>
              <p className="text-xs opacity-80">Invalid credentials</p>
            </div>
          </div>,
          {
            className:
              "bg-white text-gray-900 shadow-lg rounded-lg px-4 py-3 border-l-4 border-red-600",
            progressClassName: "bg-red-600",
            icon: false,
          }
        );

        // hide loader immediately on failure
        hideLoader();
      }
  };

    
  return (
    <>
      <div className="fixed z-[10000]">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          toastClassName="!max-w-sm mx-auto"
        />
      </div>

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
                <h2 className="text-[29px] font-bold mb-4">Test your Knowledge</h2>
                <p className="text-lg">Play. Learn. Compete.</p>
              </div>
            </div>
    
            {/* Right Side – Sign Up Form */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Login to your account</h2>
    
              <form onSubmit={handleLogin} className="space-y-4">
    
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

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-800 transition duration-300 cursor-pointer"
                >
                  Login
                </button>
              </form>
    
              <p className="mt-4 text-sm text-center text-gray-600">
                Don't have an account?{' '}
                <Link to='/auth/signup' className="text-indigo-600 hover:underline">
                  Signup here
                </Link>
              </p>
            </div>
          </div>
    </section>
    </>
  )
}

export default Login