import { useEffect } from 'react';
import { getCurrentUser } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';


const ResultScreen = ({ score, totalQuestions, category, difficulty, onRestart, image }) => {

  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) return;

    const scoreEntry = {
      user,
      score,
      totalQuestions,
      category: category || "General",
      difficulty: difficulty || "Medium",
      date: new Date().toISOString()
    };

    const existingScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    localStorage.setItem("quizScores", JSON.stringify([...existingScores, scoreEntry]));
  }, []);

  const getRemark = () => {
    const percent = (score / totalQuestions) * 100;
    if (percent >= 80) return "🌟 Excellent!";
    if (percent >= 50) return "👍 Good job!";
    return "😕 Try again!";
  };

  const percentScore = Math.round((score / totalQuestions) * 100);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-black via-[#0b1d3a] to-black text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 md:p-10 text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-wide">🎉 Quiz Completed!</h2>

        {image && (
          <div className="mb-4">
            <img
              src={image}
              alt="Quiz Visual"
              className="w-full h-48 object-cover rounded-lg border border-white/10"
            />
          </div>
        )}

        <div className="text-sm md:text-base space-y-2">
          <p className="text-white/90">
            <span className="font-semibold text-white">Category:</span> {category || "General"}
          </p>
          <p className="text-white/90">
            <span className="font-semibold text-white">Difficulty:</span> {difficulty || "Medium"}
          </p>
          <p className="text-white text-lg font-semibold mt-2">
            Score: {score} / {totalQuestions} 
            <span className="ml-2 px-2 py-1 rounded-full bg-white/20 text-white font-mono text-sm">
              {percentScore}%
            </span>
          </p>
          <p className="mt-4 text-xl font-bold text-yellow-300">{getRemark()}</p>
        </div>

        <div className="flex items-center justify-around">
          <button
            onClick={onRestart}
            className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition cursor-pointer"
          >
            Restart Quiz
          </button>
          <button
            onClick={() => navigate('/leaderboard')}
            className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition cursor-pointer"
          >
            LeaderBoard
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResultScreen;
