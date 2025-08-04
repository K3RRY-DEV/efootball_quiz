import './quiz.css';
import { useState, useEffect } from 'react';

const Quiz = ({ filteredQuestions, category, difficulty, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);

  const totalQuestions = filteredQuestions.length;

  useEffect(() => {
    setSelectedOption(null);
    setHasAnswered(false);
  }, [currentQuestionIndex]);

  // When quiz ends, call onFinish callback with final score
  useEffect(() => {
    if (currentQuestionIndex >= totalQuestions && onFinish) {
      onFinish(score);
    }
  }, [currentQuestionIndex, totalQuestions, onFinish, score]);

  if (currentQuestionIndex >= totalQuestions) {
    // Don't render anything because parent will show ResultScreen
    return null;
  }

  const { question, options, answer, image } = filteredQuestions[currentQuestionIndex];

  const handleSelect = (option) => {
    if (hasAnswered) return;
    setSelectedOption(option);
    setHasAnswered(true);
    if (option === answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((i) => i + 1);
  };

  const getOptionStyles = (option) => {
    if (!hasAnswered) {
      return "bg-white/10 backdrop-blur-md border border-transparent hover:border-cyan-400 cursor-pointer text-white";
    }
    if (option === answer) {
      return "bg-green-600 text-white border-green-400 shadow-lg scale-105 cursor-default";
    }
    if (option === selectedOption && option !== answer) {
      return "bg-red-600 text-white border-red-400 shadow-lg cursor-default";
    }
    return "bg-white/10 border-transparent text-white/70 cursor-default";
  };

  return (
    <section
      className="flex flex-col justify-between max-w-3xl mx-auto min-h-screen p-6 sm:p-8 select-none"
      style={{
        background: 'linear-gradient(120deg, #000000, #0b1d3a, #000000)',
        color: 'white',
      }}
    >
      {/* Progress + Category + Score */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
        <div className="flex items-center gap-3">
          <div className="text-sm sm:text-base text-cyan-400 font-medium tracking-wide">
            Q {currentQuestionIndex + 1} / {totalQuestions}
          </div>
          <div
            className="relative w-10 h-10 rounded-full border-2 border-cyan-500 flex items-center justify-center font-semibold text-xs sm:text-sm"
            aria-label="Progress Circle"
          >
            <svg
              className="absolute top-0 left-0 w-10 h-10"
              viewBox="0 0 36 36"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <circle
                cx="18"
                cy="18"
                r="15"
                stroke="currentColor"
                strokeOpacity="0.2"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                stroke="cyan"
                strokeDasharray="94.2"
                strokeDashoffset={94.2 - (94.2 * (currentQuestionIndex + 1)) / totalQuestions}
                strokeLinecap="round"
                strokeWidth="3"
                transform="rotate(-90 18 18)"
              />
            </svg>
            <span className="relative text-cyan-400 select-none">
              {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
            </span>
          </div>
        </div>

        <div className="text-lg sm:text-xl font-semibold tracking-wide text-center sm:text-left truncate max-w-[150px] sm:max-w-none">
          {category || 'Category'}
        </div>

        <div className="text-lg sm:text-xl font-semibold tracking-wide text-cyan-400">
          Score: {score}
        </div>
      </header>

      {/* Question card */}
      <article
        className="bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-10 flex flex-col gap-8"
        style={{ minHeight: '360px' }}
      >
        {/* Optional image */}
        {image && (
          <div className="w-full max-h-48 rounded-lg overflow-hidden mb-4 shadow-lg self-center">
            <img
              src={image}
              alt="Question visual"
              className="object-contain w-full h-full"
              loading="lazy"
            />
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-md leading-snug">
          {question}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={hasAnswered}
              className={`rounded-xl px-5 py-3 text-base sm:text-lg font-semibold transition-transform duration-200
                border-2 focus:outline-none focus:ring-4 focus:ring-cyan-500
                ${getOptionStyles(option)}
                ${!hasAnswered ? 'hover:scale-105' : ''}
              `}
              aria-pressed={selectedOption === option}
            >
              {option}
            </button>
          ))}
        </div>
      </article>

      {/* Next Button */}
      <div className="flex justify-center mt-8">
        {hasAnswered && (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-3 bg-gradient-to-tr from-cyan-600 to-blue-700
              hover:from-cyan-500 hover:to-blue-600 active:scale-95
              rounded-full px-10 py-3 text-white font-semibold text-lg shadow-lg
              transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-400 cursor-pointer"
            type="button"
            aria-label="Next question"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default Quiz;
