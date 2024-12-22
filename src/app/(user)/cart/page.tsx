"use client"

import React, { useContext } from "react"
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { DataContext } from "@/context/DataProvider"
import Loader from "@/components/Loader"

const  CartPage : React.FC = () => {
  const dataContext = useContext(DataContext)

  if (!dataContext) {
    throw new Error("CartPage must be used within a DataContextProvider")
  }

  const { cartItems, setCartItems, loading } = dataContext

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 10) return
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems]
      updatedItems[index].quantity = newQuantity
      return updatedItems
    })
  }

  const removeItem = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index))
  }

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.discountPrice * item.quantity,
    0
  )
  const shipping = 99
  const total = subtotal + shipping

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center mb-8'>
          <Link
            href='/'
            className='flex items-center text-gray-600 hover:text-gray-800'>
            <ArrowLeft className='w-5 h-5 mr-2' />
            Continue Shopping
          </Link>
          <h1 className='text-2xl font-bold text-center flex-1'>
            Shopping Cart
          </h1>
        </div>

        {loading && <Loader />}

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {!loading &&  (
            <div className='lg:col-span-2 space-y-4'>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className='bg-white rounded-lg shadow p-6'>
                    <div className='flex items-center gap-6'>
                      <div className='relative w-24 h-24'>
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className='object-cover rounded-md'
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-medium text-gray-800'>
                          {item.name}
                        </h3>
                        <p className='text-sm text-gray-500'>{item.category}</p>
                        <div className='flex items-center gap-2 mt-1'>
                          <span className='text-lg font-bold text-green-600'>
                            ₹{Math.floor(item.discountPrice)}
                          </span>
                          <span className='text-sm text-gray-500 line-through'>
                            ₹{Math.floor(item.price)}
                          </span>
                        </div>
                      </div>
                      <div className='flex items-center gap-4'>
                        <div className='flex items-center border rounded-full'>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className='p-2'
                            onClick={() =>
                              updateQuantity(index, item.quantity - 1)
                            }>
                            <Minus className='w-4 h-4' />
                          </motion.button>
                          <span className='px-4'>{item.quantity}</span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className='p-2'
                            onClick={() =>
                              updateQuantity(index, item.quantity + 1)
                            }>
                            <Plus className='w-4 h-4' />
                          </motion.button>
                        </div>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeItem(index)}
                          className='text-red-500 hover:text-red-600'>
                          <Trash2 className='w-5 h-5' />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <h1 className='text-center text-gray-500'>
                  Your cart is empty.
                </h1>
              )}
            </div>
          )}

          {!loading && cartItems.length > 0 && (
            <div className='lg:col-span-1'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='bg-white rounded-lg shadow p-6 sticky top-4'>
                <h2 className='text-lg font-semibold mb-4'>Order Summary</h2>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Subtotal</span>
                    <span>₹{Math.floor(subtotal)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>
                  <div className='border-t pt-3'>
                    <div className='flex justify-between font-semibold'>
                      <span>Total</span>
                      <span>₹{Math.floor(total)}</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='w-full bg-green-500 text-white rounded-full py-3 mt-6 font-medium hover:bg-green-600 transition-colors'>
                  Proceed to Checkout
                </motion.button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartPage
