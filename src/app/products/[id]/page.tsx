"use client"

import { useContext, useEffect, useState } from "react"
import { DataContext } from "@/context/DataProvider"
import Image from "next/image"
import { ArrowLeft, Star, TrendingDown } from "lucide-react"
import { ProductsDataTypes } from "@/types/dataTypes"
import { useParams } from "next/navigation"
import Link from "next/link"
import Loader from "@/components/Loader"

export const ProductDetailPage = () => {
  const params = useParams()
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
    <div className='px-[10%] sm:py-16  py-10 flex flex-col items-center'>
      {/* Header Section */}
      <div className='flex items-center mb-8 w-full'>
        <Link
          href='/'
          className='md:flex items-center hidden text-gray-600 hover:text-gray-800 transition-colors duration-200'>
          <ArrowLeft className='w-5 h-5 mr-2' />
          Continue Shopping
        </Link>
        <h1 className='text-3xl font-bold text-center flex-1'>
          Product Details
        </h1>
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

      <div className='mt-12 p-8 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-xl flex flex-col items-center'>
        <h2 className='text-4xl font-extrabold mb-4 text-center'>
          Hot Deal!{" "}
          <span className='text-xl font-normal'>Limited Time Offer</span>
        </h2>
        <p className='text-lg leading-relaxed text-center'>
          This product is a hot favorite and is available at a great discount!
          Crafted with precision, ensuring top-tier quality and performance.
          Do not miss out on this deal—grab it while the price is still low!
        </p>
        <div className='mt-6 flex justify-center'>
          <button className='px-8 py-3 bg-white text-red-500 font-semibold rounded-full shadow-md transform hover:scale-105 transition duration-300'>
            Grab the Deal
          </button>
        </div>
      </div>

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
