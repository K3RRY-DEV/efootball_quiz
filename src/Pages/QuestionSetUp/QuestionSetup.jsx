import { useState, useEffect } from 'react';
import { categories, difficulties } from './setUp';
import { quizData } from '../../utils/quizData';
import { AnimatePresence, motion } from 'framer-motion';
import efootball_logo from '../../Images/efootball_logo.png';
import K3RRY_logo from '../../Images/K3RRY.png'
import Quiz from '../Quiz/Quiz';
import '../../index.css';

const QuestionSetup = () => {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [startQuiz, setStartQuiz] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState(null);
  const [activeDifficultyTab, setActiveDifficultyTab] = useState(null);


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
  }
}, [selectedCategory]);


  if(startQuiz === true) {
    return <Quiz filteredQuestions={totalQuestions} category={selectedCategory}/>
  }

  const playGame = () => {
    setStartQuiz(true);
  };

  const activeclass = "bg-amber-700";
  const inActiveclass = "bg-white/10";
  const baseClass = "backdrop-blur-md rounded-md border border-white/20 w-[100px] h-[38px] flex justify-center items-center text-white transition duration-300 ease-in-out hover:bg-white/20 hover:border-white/30 hover:shadow-lg cursor-pointer";



  return (
    <section  className="h-screen flex flex-col space-y-20 justify-center items-center px-5">
      {/* K3RRY & EFOOTBALL LOGO */}
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
      {/* CATEGORY */}
      <div className="gap-5 sm:gap-15 flex justify-center items-center">
        {categories.map((c, index) => (
          <span 
            key={index}  
            onClick={(event) => selectCat(event, index)} 
            className={`${baseClass} ${activeCategoryTab === index ? activeclass : inActiveclass}`}>
          {c.name}
        </span>
        ) )}
      </div>

      {/* DIFFICULTY */}
      <div className="gap-5 sm:gap-15 flex justify-center items-center">
        {difficulties.map((d, index) => (
          <span
            key={index}
            onClick={selectedCategory === 'All' ? undefined : (event) => selectDiff(event, index)}
            className={`${baseClass} ${activeDifficultyTab === index ? activeclass : inActiveclass}
              ${selectedCategory === 'All' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20 hover:border-white/30 hover:shadow-lg cursor-pointer'}`}
            aria-disabled={selectedCategory === 'All'}
          >
            {d.name}
          </span>
        ))}
      </div>


      {/* BUTTON */}
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
  )
}

export default QuestionSetup