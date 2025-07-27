import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Import photos
import photo1 from '../assets/namrata_chauhan_birthday_photo_1.jpeg'
import photo2 from '../assets/namrata_chauhan_birthday_photo_2.jpeg'
import photo3 from '../assets/namrata_chauhan_birthday_photo_3.jpeg'
import photo4 from '../assets/namrata_chauhan_birthday_photo_4.jpeg'
import photo5 from '../assets/namrata_chauhan_birthday_photo_5.jpeg'

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const photos = [
    { src: photo1, title: "Beautiful Family Gathering", description: "A wonderful moment with loved ones" },
    { src: photo2, title: "Celebration Time", description: "Everyone together for the special day" },
    { src: photo3, title: "Happy Moments", description: "Smiles and joy all around" },
    { src: photo4, title: "Sweet Memories", description: "Creating lasting memories" },
    { src: photo5, title: "Special Bond", description: "Cherishing the beautiful relationship" }
  ]

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setSelectedImage(photos[index])
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % photos.length
    setCurrentIndex(nextIndex)
    setSelectedImage(photos[nextIndex])
  }

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length
    setCurrentIndex(prevIndex)
    setSelectedImage(photos[prevIndex])
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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
    <div className="pt-24 pb-12 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Birthday Memories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Beautiful moments captured during Namrata's special celebration. Click on any photo to view it in full size.
          </p>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white p-2">
                <div className="aspect-square overflow-hidden rounded-xl">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-semibold text-lg">{photo.title}</h3>
                      <p className="text-sm opacity-90">{photo.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                className="relative max-w-4xl max-h-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <Button
                  onClick={closeLightbox}
                  className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 text-white border-none"
                  size="sm"
                >
                  <X size={20} />
                </Button>

                {/* Navigation Buttons */}
                <Button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-none"
                  size="sm"
                >
                  <ChevronLeft size={20} />
                </Button>

                <Button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-none"
                  size="sm"
                >
                  <ChevronRight size={20} />
                </Button>

                {/* Image */}
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white rounded-b-lg">
                  <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                  <p className="text-sm opacity-90">{selectedImage.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm opacity-75">
                      {currentIndex + 1} of {photos.length}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PhotoGallery

