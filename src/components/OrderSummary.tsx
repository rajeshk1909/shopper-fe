"use client"

import { motion } from "framer-motion"
import { CreditCard, Truck, Shield, Gift } from "lucide-react"
import React from "react"

interface OrderSummaryProps {
  subtotal: number
  shipping: number
  total: number
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shipping,
  total,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-4'>
      <div className='p-6 space-y-6'>
        <h2 className='text-xl font-bold'>Order Summary</h2>

        <div className='space-y-4'>
          <div className='flex justify-between items-center py-3 border-b border-dashed'>
            <span className='text-gray-600'>Subtotal</span>
            <span className='font-semibold'>₹{Math.floor(subtotal)}</span>
          </div>
          <div className='flex justify-between items-center py-3 border-b border-dashed'>
            <span className='text-gray-600'>Shipping</span>
            <span className='font-semibold'>₹{shipping}</span>
          </div>
          <div className='flex justify-between items-center py-3 text-lg'>
            <span className='font-semibold'>Total</span>
            <span className='font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
              ₹{Math.floor(total)}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {[
            { icon: Truck, text: "Free shipping on orders over ₹999" },
            { icon: Shield, text: "Secure SSL encrypted payment" },
            { icon: Gift, text: "Gift wrapping available" },
            { icon: CreditCard, text: "Multiple payment options" },
          ].map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center text-center p-4 rounded-xl bg-gray-50 gap-2'>
              <item.icon className='w-5 h-5 text-purple-600' />
              <span className='text-xs text-gray-600'>{item.text}</span>
            </div>
          ))}
        </div>

        <div className='relative'>
          <div className='absolute -left-6 -right-6 top-1/2 transform -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent' />
          <div className='relative bg-white px-4 py-2 text-center'>
            <span className='text-sm text-gray-500'>
              Estimated delivery time: 2-4 business days
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl py-4 font-semibold shadow-lg shadow-purple-200 flex items-center justify-center gap-2 hover:shadow-xl transition-shadow'>
          <CreditCard className='w-5 h-5' />
          Proceed to Checkout
        </motion.button>
      </div>
    </motion.div>
  )
}

export default OrderSummary
