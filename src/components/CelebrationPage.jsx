import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PartyPopper, Music, Heart, Star, Gift, Cake } from 'lucide-react'

const CelebrationPage = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [confetti, setConfetti] = useState([])
  const [balloons, setBalloons] = useState([])
  const [showMessage, setShowMessage] = useState(false)

  const createConfetti = () => {
    const newConfetti = []
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'][Math.floor(Math.random() * 6)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        velocity: Math.random() * 3 + 2
      })
    }
    setConfetti(newConfetti)
    
    setTimeout(() => setConfetti([]), 3000)
  }

  const createBalloons = () => {
    const newBalloons = []
    for (let i = 0; i < 10; i++) {
      newBalloons.push({
        id: i,
        x: Math.random() * (window.innerWidth - 100),
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 2
      })
    }
    setBalloons(newBalloons)
  }

  const startCelebration = () => {
    setIsPlaying(true)
    createConfetti()
    createBalloons()
    setShowMessage(true)
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsPlaying(false)
      setBalloons([])
      setShowMessage(false)
    }, 5000)
  }

  const birthdayMessages = [
    "🎉 Happy Birthday Namrata! 🎉",
    "✨ May all your dreams come true! ✨",
    "🎂 Another year of wonderful memories! 🎂",
    "💖 You deserve all the happiness! 💖",
    "🌟 Shine bright like the star you are! 🌟"
  ]

  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    if (showMessage) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % birthdayMessages.length)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [showMessage])

  return (
    <div className="pt-20 min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200">
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute pointer-events-none"
            style={{
              backgroundColor: piece.color,
              width: piece.size,
              height: piece.size,
              borderRadius: '50%'
            }}
            initial={{
              x: piece.x,
              y: piece.y,
              rotate: piece.rotation,
              opacity: 1
            }}
            animate={{
              y: window.innerHeight + 100,
              rotate: piece.rotation + 360,
              opacity: 0
            }}
            transition={{
              duration: 3,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>

      {/* Balloons */}
      <AnimatePresence>
        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            className="absolute bottom-0 pointer-events-none"
            initial={{
              x: balloon.x,
              y: window.innerHeight + 100,
              scale: 0
            }}
            animate={{
              y: -200,
              scale: 1,
              x: balloon.x + (Math.random() - 0.5) * 100
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: 4,
              delay: balloon.delay,
              ease: "easeOut"
            }}
          >
            <div
              className="w-16 h-20 rounded-full relative"
              style={{ backgroundColor: balloon.color }}
            >
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-400"></div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8"
            animate={{
              background: isPlaying 
                ? ['linear-gradient(45deg, #ff6b6b, #4ecdc4)', 'linear-gradient(45deg, #4ecdc4, #45b7d1)', 'linear-gradient(45deg, #45b7d1, #96ceb4)']
                : 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
            transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
          >
            Let's Celebrate!
          </motion.h1>

          {/* Dynamic Message */}
          <AnimatePresence mode="wait">
            {showMessage && (
              <motion.div
                key={currentMessage}
                className="text-3xl md:text-4xl font-bold text-white mb-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 shadow-2xl"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {birthdayMessages[currentMessage]}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Celebration Button */}
          <motion.div
            className="mb-12"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={startCelebration}
              disabled={isPlaying}
              className={`text-2xl px-12 py-6 rounded-full shadow-2xl transition-all duration-300 ${
                isPlaying
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white'
              }`}
            >
              <PartyPopper className="mr-3" size={28} />
              {isPlaying ? 'Celebrating...' : 'Start Celebration!'}
            </Button>
          </motion.div>

          {/* Interactive Elements */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { icon: Music, label: 'Play Music', color: 'from-blue-500 to-purple-600' },
              { icon: Heart, label: 'Send Love', color: 'from-pink-500 to-red-600' },
              { icon: Star, label: 'Make a Wish', color: 'from-yellow-500 to-orange-600' },
              { icon: Gift, label: 'Virtual Gift', color: 'from-green-500 to-teal-600' },
              { icon: Cake, label: 'Cut the Cake', color: 'from-purple-500 to-pink-600' },
              { icon: PartyPopper, label: 'More Fun', color: 'from-indigo-500 to-blue-600' }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-r ${item.color} p-6 rounded-2xl text-white cursor-pointer shadow-lg`}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    createConfetti()
                    // Add specific interactions for each button
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Icon size={32} className="mx-auto mb-2" />
                  <p className="text-sm font-semibold">{item.label}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Birthday Cake Animation */}
          <motion.div
            className="mt-12"
            animate={{
              y: isPlaying ? [0, -10, 0] : 0,
              rotate: isPlaying ? [0, 2, -2, 0] : 0
            }}
            transition={{
              duration: 1,
              repeat: isPlaying ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            <div className="text-8xl">🎂</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          >
            {['🎈', '🎉', '🎊', '⭐', '💫', '🌟', '✨', '🎁'][i]}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CelebrationPage

