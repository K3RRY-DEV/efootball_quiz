import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import efootball_logo from '../../Images/efootball_logo.png';
import K3RRY_logo from '../../Images/K3RRY.png';
import '../../index.css';

const Home = () => {
  const navigate = useNavigate();

  const handlePlayGame = () => {
    navigate('/quiz'); // Adjust if your quiz route differs
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-white px-6
                        bg-gradient-to-br from-black via-[#0b1d3a] to-black max-w-4xl mx-auto">
      
      {/* Logos */}
      <div className="flex items-center mb-10 gap-10">
        <img className="w-[140px]" src={K3RRY_logo} alt="K3RRY logo" />
        <img className="w-[100px]" src={efootball_logo} alt="eFootball logo" />
      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-semibold mb-6 text-center tracking-tight"
      >
        Ultimate eFootball Quiz
      </motion.h1>

      {/* Intro paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-base md:text-lg text-slate-300 mb-12 text-center leading-relaxed max-w-xl"
      >
        Test your knowledge of eFootball, including players, gameplay strategies, and history. Challenge yourself and improve your skills in a competitive and engaging environment.
      </motion.p>

      {/* Feature list */}
      <motion.ul
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className="mb-14 space-y-4 max-w-md text-slate-400 text-base"
      >
        <li>• Multiple categories for comprehensive coverage</li>
        <li>• Various difficulty levels to match your expertise</li>
        <li>• Time-based scoring to add a competitive edge</li>
        <li>• Leaderboards to track your progress and compete</li>
      </motion.ul>

      {/* Play Game button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        onClick={handlePlayGame}
        className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700
                   text-white px-14 py-4 rounded-lg font-semibold text-lg shadow-lg
                   hover:brightness-110 active:brightness-90 transition focus:outline-none focus:ring-2 focus:ring-purple-500 mb-10"
        aria-label="Start eFootball Quiz"
      >
        Play Game
      </motion.button>

      {/* Sign Up / Log In */}
      <div className="flex gap-6">
        <button
          onClick={() => navigate('/auth/signup')}
          className="px-6 py-3 rounded-lg bg-white text-indigo-900 font-medium hover:bg-indigo-100 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate('/auth/login')}
          className="px-6 py-3 rounded-lg border border-white text-white hover:bg-white hover:text-indigo-900 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Log In
        </button>
      </div>
    </section>
  );
};

export default Home;
