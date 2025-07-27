import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import HomePage from './components/HomePage'
import PhotoGallery from './components/PhotoGallery'
import CelebrationPage from './components/CelebrationPage'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
        <Navigation />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<PhotoGallery />} />
            <Route path="/celebration" element={<CelebrationPage />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  )
}

export default App

