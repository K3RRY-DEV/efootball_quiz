
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className=" mb-6 text-white text-2xl">Oops! The page you’re looking for doesn’t exist.</p>
      <button
        onClick={() => navigate('/')}
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition cursor-pointer" 
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
