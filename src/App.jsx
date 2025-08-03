import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { useLoader } from './Context/LoaderContext.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './Pages/Home/Home.jsx';
import QuestionSetup from './Pages/QuestionSetUp/QuestionSetup';
import Quiz from './Pages/Quiz/Quiz';
import ResultScreen from './Pages/Result/ResultScreen';
import SignUp from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';
import Loader from './components/Loader.jsx';
import MainLayout from './Layout/MainLayout.jsx';
import AuthLayout from './Layout/AuthLayout.jsx';
import Leaderboard from './Pages/LeaderBoard/LeaderBoard.jsx';
import QuizApp from './Pages/Quiz/QuizApp.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route element={<AuthLayout />}>
      <Route path='/auth/signup' element={<SignUp />} />
      <Route path='/auth/login' element={<Login />} />
    </Route>

    <Route element={<MainLayout />}>
      <Route path='/' element={<Home />} />
      <Route path='/quiz' element={<QuizApp />} />
      <Route path='leaderboard' element={<Leaderboard />} />
    </Route>
    </>
  )
)

const App = () => {
  const { loading } = useLoader();

  return (
    <>
      {/* Your app routes */}
      <RouterProvider router={router} />
      {/* Loader Overlay */}
        <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
