import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddRule from './Pages/AddRule/AddRule';
import Home from './Pages/Home/Home';
import Test from './Pages/Test/Test';
import CheckRule from './Pages/CheckRule/CheckRule';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <div>
          {/* Define the Routes */}
          <Routes>
          <Route path="/" element={<Home/>} />

            <Route path="/addRule" element={<AddRule />} />
            <Route path="/CheckRule" element={<CheckRule />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App;
