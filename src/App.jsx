import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Course from './pages/Course';

function App() {
  return (
    <>
      <Routes>
        <Route path="/course" element={<Course />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        
      </Routes>
    </>
  )
}

export default App
