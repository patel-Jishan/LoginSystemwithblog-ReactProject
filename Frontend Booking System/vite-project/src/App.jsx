import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./Signup"
import Login from "./Login"
import ForgotPassword from "./ForgotPassword"
import ResetPassword from "./ResetPassword"
import Logout from "./Logut"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App