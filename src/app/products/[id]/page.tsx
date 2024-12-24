"use client"

import { useContext, useEffect, useState } from "react"
import { DataContext } from "@/context/DataProvider"
import Image from "next/image"
import { ArrowLeft, Star, TrendingDown } from "lucide-react"
import { ProductsDataTypes } from "@/types/dataTypes"
import { useParams } from "next/navigation"
import Link from "next/link"
import Loader from "@/components/Loader"
import { motion } from "framer-motion"

const ProductDetailPage = () => {
  const params = useParams<{ id: string }>()
  const { id } = params
  const dataContext = useContext(DataContext)

  if (!dataContext) {
    throw new Error(
      "ProductsContainer must be used within a DataContextProvider"
    )
  }

  const {
    products,
    addToCart,
    cartItems,
    addToWishlist,
    wishlistItems,
    removeCart,
    removeWishlist,
  } = dataContext
  const [product, setProduct] = useState<ProductsDataTypes | null>(null)

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((item) => item._id === id)
      setProduct(foundProduct || null)
    }
  }, [id, products])

  if (!product) return <Loader />

  return (
    <div className='px-[10%] sm:py-16 py-10 flex flex-col items-center'>
      <div className="flex w-full mb-8">
        <Link
          href='/'
          className='inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200'>
          <ArrowLeft className='w-5 h-5 mr-2' />
          <span className='text-lg'>Back to Products</span>
        </Link>
      </div>

      <div className='flex flex-col md:flex-row gap-5 xl:gap-12 items-center w-full'>
        <div className='w-full md:w-1/2'>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className='object-cover rounded-xl shadow-xl hover:scale-105 transform transition-all duration-300'
          />
        </div>

        <div className='w-full md:w-1/2'>
          <h1 className='text-4xl font-extrabold text-gray-900'>
            {product.name}
          </h1>
          <div className='flex items-center gap-2 mt-4'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < product.starRating ? "fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <div className='mt-6 space-y-3'>
            <p className='text-4xl font-extrabold text-green-600'>
              ₹{Math.floor(product.discountPrice)}
            </p>
            <p className='text-lg text-gray-500 line-through'>
              ₹{Math.floor(product.price)}
            </p>
            <p className='text-sm text-green-500 flex items-center'>
              <TrendingDown className='w-5 h-5 mr-2' />
              Price dropped by {product.discountPercentage}%
            </p>
          </div>

          {/* Action Buttons */}
          <div className='mt-8 flex gap-6'>
            {wishlistItems.some((item) => item._id === product._id) ? (
              <button
                onClick={() => removeWishlist(product._id)}
                className='px-8 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 transition duration-200 transform hover:scale-105'>
                Remove from Wishlist
              </button>
            ) : (
              <button
                onClick={() => addToWishlist(product._id)}
                className='px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow-md hover:bg-gray-300 transition duration-200 transform hover:scale-105'>
                Add to Wishlist
              </button>
            )}

            {cartItems.some((item) => item._id === product._id) ? (
              <button
                onClick={() => removeCart(product._id)}
                className='px-8 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 transition duration-200 transform hover:scale-105'>
                Remove from Cart
              </button>
            ) : (
              <button
                onClick={() => addToCart(product._id)}
                className='px-8 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition duration-200 transform hover:scale-105'>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className='my-16 w-full'>
        <div className='relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 p-8 text-white'>
          <div className='relative z-10'>
            <h2 className='text-3xl font-bold mb-4'>Limited Time Offer!</h2>
            <p className='text-lg opacity-90 max-w-2xl'>
              Don't miss out on this exclusive deal! Get this premium product at
              an unbeatable price. Our limited-time offer brings you exceptional
              quality and value.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='mt-6 px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full hover:bg-opacity-90 transition-colors duration-200'>
              Claim Offer
            </motion.button>
          </div>
          <div className='absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2' />
          <div className='absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2' />
        </div>
      </motion.div>

      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8'>
        <div className='p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition duration-300'>
          <h3 className='text-xl font-semibold mb-3 text-gray-800'>Category</h3>
          <p className='text-gray-600 text-lg'>
            {product.category.toUpperCase()}
          </p>
        </div>
        <div className='p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition duration-300'>
          <h3 className='text-xl font-semibold mb-3 text-gray-800'>
            Dimensions
          </h3>
          <p className='text-gray-600 text-lg'>10 x 10 x 5 cm</p>
        </div>
        <div className='p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition duration-300'>
          <h3 className='text-xl font-semibold mb-3 text-gray-800'>Warranty</h3>
          <p className='text-gray-600 text-lg'>1 Year Manufacturer Warranty</p>
        </div>
        <div className='p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition duration-300'>
          <h3 className='text-xl font-semibold mb-3 text-gray-800'>
            Manufacturer
          </h3>
          <p className='text-gray-600 text-lg'>Premium Tech Co.</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
