import React from 'react'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import Playground from './components/Playground'
import Waiting from './components/Waiting'
import Homepage from './components/Homepage'

const App = () => {
  return (
  <>
    <div className="App" style={{ width: '100vw', height: '100vh' }}>
      <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/waiting" element={<Waiting/>} />
        <Route path="/playground" element={<Playground/>} />
      </Routes>
      </Router>
     </div>    
  </>
  )
}

export default App