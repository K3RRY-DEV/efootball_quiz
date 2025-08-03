import { useState, useEffect } from 'react';
import QuestionSetup from '../QuestionSetUp/QuestionSetup';
import Quiz from './Quiz';
import ResultScreen from '../Result/ResultScreen';

const QuizApp = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const isQuizInProgress = localStorage.getItem("quizInProgress") === "true";
    if (isQuizInProgress) {
      setQuizStarted(true);
    }
  }, []);

  const startQuiz = (category, difficulty, questions) => {
    if (!questions.length) return;
    setSelectedCategory(category);
    setSelectedDifficulty(difficulty);
    setFilteredQuestions(questions);
    setQuizStarted(true);
    setQuizFinished(false);
    localStorage.setItem("quizInProgress", "true");
  };

  const finishQuiz = (finalScore) => {
    setScore(finalScore);
    setQuizFinished(true);
    setQuizStarted(false);
    localStorage.removeItem("quizInProgress");
  };

  const restartQuiz = () => {
    setSelectedCategory("");
    setSelectedDifficulty("");
    setFilteredQuestions([]);
    setScore(0);
    setQuizStarted(false);
    setQuizFinished(false);
    localStorage.removeItem("quizInProgress");
  };

   try {
    if (quizFinished) {
      return (
        <ResultScreen
          score={score}
          totalQuestions={filteredQuestions.length}
          category={selectedCategory}
          difficulty={selectedDifficulty}
          onRestart={restartQuiz}
        />
      );
    }

    if (quizStarted) {
      return (
        <Quiz
          filteredQuestions={filteredQuestions}
          category={selectedCategory}
          difficulty={selectedDifficulty}
          onFinish={finishQuiz}
        />
      );
    }

    return <QuestionSetup onStart={startQuiz} />;
  } catch (error) {
    console.error("QuizApp render error:", error);
    return <div>Oops, something went wrong!</div>;
  }


  

  return <QuestionSetup onStart={startQuiz} />;
};

export default QuizApp;
