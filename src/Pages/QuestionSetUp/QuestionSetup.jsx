import { useState, useEffect } from 'react';
import { categories, difficulties } from './setUp';
import { quizData } from '../../utils/quizData';
import { AnimatePresence, motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { useLoader } from '../../Context/LoaderContext';
import 'react-toastify/dist/ReactToastify.css';
import efootball_logo from '../../Images/efootball_logo.png';
import K3RRY_logo from '../../Images/K3RRY.png'
import '../../index.css';

const QuestionSetup = ({ onStart }) => {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState(null);
  const [activeDifficultyTab, setActiveDifficultyTab] = useState(null);

  const { showLoader, hideLoader } = useLoader();

  const totalQuestions = quizData.filter((q) => {
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesDifficulty = selectedCategory === 'All' || q.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  const selectCat = (event, index) => {
    const selected = event.target.textContent;
    setActiveCategoryTab(index);
    setSelectedCategory(selected);
  };

  const selectDiff = (event, index) => {
    const selected = event.target.textContent;
    setActiveDifficultyTab(index);
    setSelectedDifficulty(selected);
  };

  useEffect(() => {
    if (selectedCategory === 'All') {
      setSelectedDifficulty('');
      setActiveDifficultyTab(null);
    }
  }, [selectedCategory]);

  const playGame = () => {
    showLoader();
    setTimeout(() => {
      if (totalQuestions.length === 0) {
        hideLoader();
        toast.error(
          <div className="flex items-center gap-3">
            <XCircle className="text-white bg-red-600 rounded-full p-1 w-6 h-6" />
            <div>
              <p className="font-semibold text-sm">
                No questions found for the selected category and difficulty.
              </p>
              <p className="text-xs opacity-80">Please try a different combination.</p>
            </div>
          </div>,
          {
            className:
              "bg-white text-gray-900 shadow-lg rounded-lg px-4 py-3 border-l-4 border-red-600",
            progressClassName: "bg-red-600",
            icon: false,
          }
        );
        return;
      }
      hideLoader();
      onStart(selectedCategory, selectedDifficulty, totalQuestions);
    }, 1000);
  };

  // Button styles
  const activeClass =
    "bg-gradient-to-tr from-[#0b1d3a] to-[#00224d] text-[#ffcc00] shadow-lg shadow-[#ffcc0044] border border-[#ffcc00]";
  const inActiveClass =
    "bg-transparent text-white border border-white/40 hover:bg-[#0b1d3a] hover:text-[#ffcc00] hover:border-[#ffcc00] transition-colors duration-300";

  const baseClass =
    "w-[110px] h-[42px] rounded-md flex justify-center items-center text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:ring-offset-2 cursor-pointer";

  return (
    <>
      <ToastContainer
          position="top-center"
          autoClose={3000}
          toastClassName="!max-w-sm mx-auto"
        />
      <section className="h-screen flex flex-col space-y-10 justify-center items-center px-5 bg-gradient-to-tr from-black via-[#0b1d3a] to-black">
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

        <p className="text-white font-semibold mb-2 select-none mt-8">Select Category:</p>
        <div className="gap-5 sm:gap-15 flex justify-center items-center">
          {categories.map((c, index) => (
            <button 
              key={index}  
              onClick={(event) => selectCat(event, index)} 
              className={`${baseClass} ${activeCategoryTab === index ? activeClass : inActiveClass}`}
              type="button"
              aria-pressed={activeCategoryTab === index}
            >
              {c.name}
            </button>
          ))}
        </div>

        <p className="text-white font-semibold mb-2 select-none mt-8">Select Difficulty:</p>
        <div className="gap-5 sm:gap-15 flex justify-center items-center">
          {difficulties.map((d, index) => (
            <button
              key={index}
              onClick={selectedCategory === 'All' ? undefined : (event) => selectDiff(event, index)}
              className={`${baseClass} ${activeDifficultyTab === index ? activeClass : inActiveClass}
                ${selectedCategory === 'All' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#0b1d3a] hover:text-[#ffcc00] hover:border-[#ffcc00]'}`}
              type="button"
              aria-disabled={selectedCategory === 'All'}
              aria-pressed={activeDifficultyTab === index}
              disabled={selectedCategory === 'All'}
            >
              {d.name}
            </button>
          ))}
        </div>

        {selectedCategory && (selectedCategory === 'All' || selectedDifficulty) && (
          <AnimatePresence mode='wait'>
            <motion.div 
              initial={{opacity:0, x:20}}
              animate={{opacity:1, x:0}}
              exit={{opacity:0, x:-10}}
              transition={{duration:0.3, ease:"easeInOut"}}
            >
              <button
                onClick={playGame}
                className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-black rounded-[16px] bg-gradient-to-t from-[#8122b0] to-[#dc98fd] active:scale-95"
                type="button"
              >
                <span className="w-full h-full flex items-center gap-2 px-8 py-3 bg-[#B931FC] text-white rounded-[14px] bg-gradient-to-t from-[#a62ce2] to-[#c045fc]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M8 13V9m-2 2h4m5-2v.001M18 12v.001m4-.334v5.243a3.09 3.09 0 0 1-5.854 1.382L16 18a3.618 3.618 0 0 0-3.236-2h-1.528c-1.37 0-2.623.774-3.236 2l-.146.292A3.09 3.09 0 0 1 2 16.91v-5.243A6.667 6.667 0 0 1 8.667 5h6.666A6.667 6.667 0 0 1 22 11.667Z" />
                  </svg>
                  Play Game
                </span>
              </button>
            </motion.div>
          </AnimatePresence>
        )}
      </section>
    </>
  );
};

export default QuestionSetup;
