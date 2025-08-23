import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Playground from './components/Playground'
import Chat from './components/Chat'
import Waiting from './components/Waiting';
import Homepage from './components/Homepage'


function App() {

  return (
    <>

      <div className="App" style={{ width: '100vw', height: '100vh' }}>
      <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/waiting/:roomId" element={<Waiting/>} />
        <Route path="/playground/:roomId" element={<Playground/>} />
      </Routes>
      </Router>
     </div>
     </>
  )
}

export default App
