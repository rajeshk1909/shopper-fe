"use client"

import React, { useContext } from "react"
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { DataContext } from "@/context/DataProvider"
import Loader from "@/components/Loader"

const Wishlist : React.FC = () => {
  const dataContext = useContext(DataContext)

  if (!dataContext) {
    throw new Error("Wishlist must be used within a DataContextProvider")
  }

  const { wishlistItems, setWishlistItems, loading } = dataContext

  const removeFromWishlist = (index: number) => {
    const updatedItems = wishlistItems.filter((_, i) => i !== index)
    setWishlistItems(updatedItems)
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center mb-8'>
          <Link
            href='/'
            className='flex items-center text-gray-600 hover:text-gray-800'>
            <ArrowLeft className='w-5 h-5 mr-2' />
            Back to Shopping
          </Link>
          <h1 className='text-2xl font-bold text-center flex-1'>My Wishlist</h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {wishlistItems.length > 0 &&
            wishlistItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className='bg-white rounded-xl cursor-pointer h-80 shadow overflow-hidden group relative'>
                <div
                  className='absolute inset-0 bg-cover'
                  style={{ backgroundImage: `url(${item.image})` }}></div>

                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4'>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='bg-white text-red-500 p-2 rounded-full'
                    onClick={() => removeFromWishlist(index)}>
                    <Heart className='w-5 h-5 fill-current' />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='bg-green-500 text-white p-2 rounded-full'>
                    <ShoppingBag className='w-5 h-5' />
                  </motion.button>
                </div>

                <div className='absolute bottom-0 bg-black/40 rounded-xl w-full z-10 p-4 text-white'>
                  <h3 className='font-medium text-white mb-1'>{item.name}</h3>
                  <p className='text-sm mb-2'>{item.category}</p>
                  <div className='flex items-center gap-2'>
                    <span className='text-lg font-bold'>
                      ₹{Math.floor(item.discountPrice)}
                    </span>
                    <span className='text-sm line-through'>
                      ₹{Math.floor(item.price)}
                    </span>
                    <span className='text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full ml-auto'>
                      -{item.discountPercentage}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {loading ? (
          <Loader />
        ) : (
          wishlistItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='text-center py-16'>
              <Heart className='w-16 h-16 mx-auto text-gray-300 mb-4' />
              <h2 className='text-xl font-medium text-gray-600 mb-2'>
                Your wishlist is empty
              </h2>
              <p className='text-gray-500 mb-6'>
                Start adding items you love to your wishlist
              </p>
              <Link
                href='/'
                className='inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition-colors'>
                <ShoppingBag className='w-5 h-5 mr-2' />
                Start Shopping
              </Link>
            </motion.div>
          )
        )}
      </div>
    </div>
  )
}

export default Wishlist
