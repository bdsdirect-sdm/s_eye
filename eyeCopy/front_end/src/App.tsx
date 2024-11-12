// import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Dashboard from "./components/Dashoard"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/app/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
