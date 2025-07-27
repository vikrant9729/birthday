import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Heart, Gift, Sparkles, Calendar, Camera, PartyPopper } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center px-4">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Birthday Title */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4">
            Happy Birthday
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-2">
            Namrata Chauhan
          </h2>
          <motion.div
            className="flex items-center justify-center space-x-2 text-xl text-gray-600"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Calendar className="text-pink-500" />
            <span>July 28th</span>
            <Sparkles className="text-purple-500" />
          </motion.div>
        </motion.div>

        {/* Birthday Wishes Cards */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Deepak's Wish */}
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-200"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">From Deepak Singh</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Dear Namrata, on your special day, I wish you all the happiness in the world! 
              May this new year of your life bring you endless joy, success, and beautiful moments. 
              You deserve all the wonderful things life has to offer. Happy Birthday, dear sister-in-law! 🎂✨
            </p>
          </motion.div>

          {/* Nikki's Wish */}
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-200"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center">
                <Gift className="text-white" size={24} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">From Nikki Chauhan</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Happy Birthday to the most amazing sister! 🌟 May your day be filled with laughter, 
              love, and all your favorite things. You bring so much light into our lives, and I'm 
              grateful to have you as family. Here's to another year of adventures and memories together! 💕🎉
            </p>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/gallery')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <Camera className="mr-2" size={20} />
            View Photo Gallery
          </Button>
          
          <Button
            onClick={() => navigate('/celebration')}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <PartyPopper className="mr-2" size={20} />
            Start Celebration!
          </Button>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight + 100,
                rotate: 0 
              }}
              animate={{ 
                y: -100, 
                rotate: 360,
                x: Math.random() * window.innerWidth
              }}
              transition={{ 
                duration: Math.random() * 3 + 5, 
                repeat: Infinity, 
                delay: Math.random() * 2 
              }}
            >
              {['🎂', '🎉', '🎈', '🌟', '💖', '🎁'][i]}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default HomePage

