import { useNavigate } from 'react-router-dom';
import { cardsData } from './Home.js';
import efootball_logo from '../../Images/efootball_logo.png';
import K3RRY_logo from '../../Images/K3RRY.png'
import '../../index.css';
import { useState } from 'react';

const Home = () => {

  const [loggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem("currentUser");
  });

  const navigate = useNavigate();

  const logout = () => {
  localStorage.removeItem("currentUser");
  setLoggedIn(false);
  // Optionally navigate home or somewhere else
  navigate('/');
};


  

  return (
    <section>
      <div className="min-h-screen flex flex-col justify-center items-center text-white px-4">
        <div className="flex items-center">
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
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Welcome to eFootball Quiz</h1>
      <p className="text-lg md:text-xl mb-10 max-w-xl text-center">
        Test your efootball knowledge across players, gameplay, and more. Sign up or log in to get started!
      </p>

      <div className="flex gap-6">
          {!loggedIn ? (
        <>
          <button
            onClick={() => navigate('/auth/signup')}
            className="px-6 py-3 rounded-xl bg-[#fff200] text-indigo-600 font-semibold hover:text-[#fff200] hover:bg-indigo-600 transition cursor-pointer"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate('/auth/login')}
            className="px-6 py-3 rounded-xl border border-white hover:bg-[#fff200] hover:font-semibold hover:border-0 hover:text-purple-800 transition cursor-pointer"
          >
            Log In
          </button>
        </>
      ) : (
        <>
        <button
          onClick={logout}
          className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition cursor-pointer"
        >
          Log Out
        </button>
        <button
          onClick={() => navigate('/quiz')}
          className="px-6 py-3 rounded-xl bg-yellow-300 text-indigo-600 font-semibold hover:bg-yellow-400 transition cursor-pointer"
        >
          Back to Quiz
        </button>
        </>
      )}
          </div>
          </div>

      {/* CARDS SECTION */}
    <div className="max-w-5xl mx-auto my-16 px-6">
      <div className="relative">
        {/* Vertical connecting line */}
        <div className="absolute top-0 left-10 w-1 bg-indigo-600 rounded-full h-full" />

        {/* Cards */}
        {cardsData.map(({ title, description, imageUrl }, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row md:items-center bg-white/5 backdrop-blur-md 
              border border-white/10 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] 
              mb-16 last:mb-0 relative z-10"
            style={{ padding: '1.5rem' }}
          >
            {/* Connector dot */}
            <span
              className="hidden md:block absolute left-6 top-1/2 transform -translate-y-1/2
              w-5 h-5 bg-indigo-600 rounded-full border-2 border-white z-20"
            />

            {/* Text side */}
            <div className={`md:w-1/2 ${i % 2 === 0 ? 'order-1' : 'order-2'} px-4`}>
              <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
              <p className="text-indigo-200 leading-relaxed">{description}</p>
            </div>

            {/* Image side */}
            <div className={`md:w-1/2 ${i % 2 === 0 ? 'order-2' : 'order-1'} px-4 mt-6 md:mt-0`}>
              <img
                src={imageUrl}
                alt={title}
                className={`rounded-lg shadow-lg object-cover ${i % 2 === 0 ? 'object-right' : 'object-left'} w-full h-64 md:h-48`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default Home;
