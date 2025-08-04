import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS_PER_PAGE = 5;

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.email === 'kerrygameshd@gmail.com'; // Use your real admin email


  const navigate = useNavigate();

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("quizScores")) || [];

    const sorted = storedScores.sort((a, b) => {
      const percentA = a.score / a.totalQuestions;
      const percentB = b.score / b.totalQuestions;
      return percentB - percentA;
    });

    setScores(sorted);
  }, []);

  const filteredScores = filter === "mine"
    ? scores.filter(score => score.user.email === currentUser.email)
    : scores;

  const totalPages = Math.ceil(filteredScores.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedScores = filteredScores.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Animation variants for fade + slide
  const listVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  return (
    <section className="max-w-4xl mx-auto min-h-screen p-6 text-white">
      <div className="backdrop-blur-md rounded-md border border-white/20 p-6 bg-gradient-to-br from-black via-[#0b1d3a] to-black">
        <h2 className="text-3xl font-bold mb-4 text-center">🏆 Leaderboard</h2>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => { setFilter("all"); setCurrentPage(1); }}
            className={`px-4 py-2 rounded cursor-pointer ${
              filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            All Scores
          </button>
          <button
            onClick={() => { setFilter("mine"); setCurrentPage(1); }}
            className={`px-4 py-2 rounded cursor-pointer ${
              filter === "mine" ? "bg-indigo-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            My Scores
          </button>
        </div>

        {filteredScores.length === 0 ? (
          <p className="text-center text-gray-300">No scores to display!</p>
        ) : (
          <>
            <AnimatePresence mode="wait">
              {/* Mobile Card Layout */}
              <motion.div
                key={filter + "-mobile"}
                className="md:hidden space-y-4"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {paginatedScores.map((entry, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-white/10">
                    <p><strong>User:</strong> {entry.user.name}</p>
                    <p>
                      <strong>Score:</strong> {entry.score} / {entry.totalQuestions} (
                      {Math.round((entry.score / entry.totalQuestions) * 100)}%)
                    </p>
                    <p><strong>Category:</strong> {entry.category}</p>
                    <p><strong>Difficulty:</strong> {entry.difficulty}</p>
                    <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </motion.div>

              {/* Desktop Table */}
              <motion.div
                key={filter + "-desktop"}
                className="hidden md:block overflow-x-auto max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 rounded-md"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <table className="min-w-full text-sm md:text-base border-collapse">
                  <thead className="sticky top-0 bg-[#0b1d3a] z-10 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left border-b border-white/20">SN</th>
                      <th className="py-3 px-4 text-left border-b border-white/20">User</th>
                      <th className="px-4 text-left border-b border-white/20">Score</th>
                      <th className="px-4 text-left border-b border-white/20">Category</th>
                      <th className="px-4 text-left border-b border-white/20">Difficulty</th>
                      <th className="px-4 text-left border-b border-white/20">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedScores.map((entry, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-2 px-4">{index}</td>
                        <td className="py-2 px-4">{entry.user.name}</td>
                        <td className="px-4">
                          {entry.score} / {entry.totalQuestions} ({Math.round((entry.score / entry.totalQuestions) * 100)}%)
                        </td>
                        <td className="px-4">{entry.category}</td>
                        <td className="px-4">{entry.difficulty}</td>
                        <td className="px-4">{new Date(entry.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            <div className="mt-6 flex justify-center gap-2 flex-wrap">
              <button
                onClick={() => changePage(currentPage - 1)}
                className="px-3 py-1 bg-white/10 text-white rounded hover:bg-white/20 cursor-pointer"
                disabled={currentPage === 1}
              >
                « Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => changePage(i + 1)}
                  className={`px-3 py-1 rounded cursor-pointer  ${
                    currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => changePage(currentPage + 1)}
                className="px-3 py-1 bg-white/10 text-white rounded hover:bg-white/20 cursor-pointer"
                disabled={currentPage === totalPages}
              >
                Next »
              </button>
            </div>
          </>
        )}
        <div className="gap-3 flex items-center justify-center">
          <button
            onClick={() => navigate('/quiz')}
            className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition cursor-pointer"
          >
            Restart Quiz
          </button>
          <button
            onClick={() => navigate('/')}
            className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition cursor-pointer"
          >
            Home
          </button>
        </div>
      </div>
      {isAdmin && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              if (confirm("Are you sure you want to reset the leaderboard? This cannot be undone.")) {
                localStorage.removeItem("quizScores");
                setScores([]);
                setCurrentPage(1);
              }
            }}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition cursor-pointer"
          >
            Reset Leaderboard (Admin Only)
          </button>
        </div>
      )}

    </section>
  );
};

export default Leaderboard;
