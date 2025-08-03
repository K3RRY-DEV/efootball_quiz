import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import QuestionSetup from './Pages/QuestionSetUp/QuestionSetup';
import Quiz from './Pages/Quiz/Quiz';
import ResultScreen from './Pages/Result/ResultScreen';
import SignUp from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';
import Loader from './components/Loader.jsx';
import { useLoader } from './Context/LoaderContext.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import MainLayout from './Layout/MainLayout.jsx';
import AuthLayout from './Layout/AuthLayout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route element={<AuthLayout />}>
      <Route path='/auth/signup' element={<SignUp />} />
      <Route path='/auth/login' element={<Login />} />
    </Route>

    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path='/questionSetup' element={<QuestionSetup />} />
      <Route path='/quiz' element={<Quiz />} />
      <Route path='/resultscreen' element={<ResultScreen />} />
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
