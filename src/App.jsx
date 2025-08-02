import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import QuestionSetup from './Pages/QuestionSetUp/QuestionSetup';
import Quiz from './Pages/Quiz/Quiz';
import ResultScreen from './Pages/Result/ResultScreen';
import SignUp from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Home />} />
      <Route path='/questionSetup' element={<QuestionSetup />} />
      <Route path='/quiz' element={<Quiz />} />
      <Route path='/resultscreen' element={<ResultScreen />} />
      <Route path='/auth/signup' element={<SignUp />} />
      <Route path='/auth/login' element={<Login />} />
    </>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
