
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Produto from './components/Produtos'
import Home from './components/Home'
import './index.css'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Produto />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App