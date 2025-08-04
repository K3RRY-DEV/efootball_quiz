import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { useLoader } from './Context/LoaderContext.jsx';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './Pages/Home/Home.jsx';
import SignUp from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';
import Loader from './components/Loader.jsx';
import MainLayout from './Layout/MainLayout.jsx';
import AuthLayout from './Layout/AuthLayout.jsx';
import Leaderboard from './Pages/LeaderBoard/LeaderBoard.jsx';
import QuizApp from './Pages/Quiz/QuizApp.jsx';
import NotFound from './components/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path='/auth/signup' element={<SignUp />} />
        <Route path='/auth/login' element={<Login />} />
      </Route>

      {/* Main App Routes */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/quiz' element={<QuizApp />} />
          <Route path='/leaderboard' element={<Leaderboard />} />
        </Route>

        {/* Fallback for undefined routes */}
        <Route path='*' element={<NotFound />} />
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
