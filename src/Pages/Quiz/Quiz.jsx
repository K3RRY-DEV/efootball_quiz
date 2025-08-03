import './quiz.css';
import ResultScreen from '../Result/ResultScreen';
import { useState } from 'react';
import { quizData } from '../../utils/quizData';

const Quiz = ({filteredQuestions, category}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const totalQuestions = filteredQuestions.length;
  console.log('filteredQuestions:', totalQuestions);


  if(currentQuestionIndex >= totalQuestions) {
    return <ResultScreen score={score} totalQuestions={totalQuestions} />
  }

   const quizQuestions = filteredQuestions[currentQuestionIndex].question;
   const option = filteredQuestions[currentQuestionIndex].options;
  const answer = filteredQuestions[currentQuestionIndex].answer;

  const displayOptions = option.map((option, index) => (
  <span
    key={index}
    onClick={() => userSelection(option)}
    className="bg-sky-700 hover:bg-sky-600 active:bg-sky-800 text-sky-100 w-[200px] text-center p-3 rounded-2xl cursor-pointer transition duration-300 select-none shadow-md"
  >
    {option}
  </span>
));


  const userSelection = (option) => {
    setSelectedOption(option);
    setHasAnswered(true);

    if(option === answer) {
      setScore((prev) => prev + 1)
    };
  };

  const nextBtn = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedOption('');
    setHasAnswered(false);
  };

  return (
    <section className="h-screen p-10 flex flex-col justify-between"
  style={{
    background:
      "linear-gradient(120deg, #000000, #0b1d3a, #000000)",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* PROGRESS, TIMER, DIFFICULTY */}
  <div className="flex justify-between text-lg sm:text-2xl font-semibold tracking-wide text-cyan-400">
    <span>{score} of {totalQuestions}</span>
    <span>00:00</span>
    <span>Easy</span>
  </div>

  {/* CATEGORY */}
  <div className="mb-6">
    <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left tracking-tight text-sky-300">
      {category}
    </h1>
  </div>

  {/* QUESTIONS AND IMAGE */}
  <div className="bg-[#0f204b] rounded-xl p-6 flex flex-col items-center gap-10 shadow-lg max-w-4xl mx-auto">
    
    {/* Image placeholder */}
    <div className="w-full max-w-md h-48 bg-sky-700 rounded-lg flex items-center justify-center text-white font-semibold text-xl">
      Image
    </div>
    
    {/* Question */}
    <h2 className="text-xl sm:text-2xl font-semibold text-center px-4 text-sky-200">
      {quizQuestions}
    </h2>

    {/* Options grid */}
    <div className="bg-[#162b67] rounded-lg p-4 w-full max-w-4xl
          grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6
          justify-items-center text-sky-300">
      {displayOptions}
    </div>
  </div>

  {/* NEXT QUESTION BUTTON */}
  <div className="flex justify-center mt-6">
    {hasAnswered && (
      <button
        onClick={() => nextBtn()}
        className="flex items-center gap-3 bg-cyan-600 hover:bg-cyan-700
      text-white font-semibold text-lg rounded-full px-8 py-3 shadow-md
      transition duration-300 active:scale-95"
      >
        <span>Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 74 74"
          height="28"
          width="28"
          stroke="currentColor"
          strokeWidth="3"
          className="text-white next-btn"
        >
          <circle
            r="35.5"
            cy="37"
            cx="37"
            className="stroke-current"
          ></circle>
          <path
            fill="currentColor"
            d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
          ></path>
        </svg>
      </button>
    )}
  </div>
   </section>
  );
};

export default Quiz;
