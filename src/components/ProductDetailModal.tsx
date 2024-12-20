"use client"

import React from "react"
import { Dialog, DialogContent } from "@mui/material"
import Image from "next/image"
import { Star, TrendingUp, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"

export interface Product {
  name: string
  price: number
  discountPercentage: number
  category: string
  starRating: number
  image: string
  discountPrice: number
}

interface ProductDetailModalProps {
  detailProduct: Product
  open: boolean
  onClose: () => void
}

export const ProductDetailModal = ({
  detailProduct,
  open,
  onClose,
}: ProductDetailModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      className='backdrop-blur-sm'>
      <motion.div
        className='bg-white rounded-lg p-6 max-h-[90vh] py-10 flex flex-col overflow-hidden'
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}>
        <div className='flex justify-end items-center'>
          <motion.button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-800 transition duration-200'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
            ✕
          </motion.button>
        </div>

        <DialogContent className='flex flex-col items-center md:flex-row gap-6 overflow-auto'>
          <motion.div
            className='flex-1 flex justify-center items-center'
            whileHover={{ scale: 1.05 }}>
            <Image
              src={detailProduct.image}
              alt={detailProduct.name}
              width={300}
              height={300}
              className='object-cover rounded-lg shadow-lg'
            />
          </motion.div>

          <div className='flex-1 space-y-6 font-lexend'>
            <h1 className='text-2xl font-bold'>{detailProduct.name}</h1>

            <div className='flex items-center'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < detailProduct.starRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Pricing */}
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <span className='text-2xl font-bold text-green-600'>
                  ₹{Math.floor(detailProduct.discountPrice)}
                </span>
                <span className='text-sm text-gray-500 line-through'>
                  ₹{Math.floor(detailProduct.price)}
                </span>
              </div>
              <div className='flex items-center text-sm text-green-500'>
                <TrendingUp className='w-4 h-4 mr-1' />
                Price dropped by {detailProduct.discountPercentage}%
              </div>
            </div>

            <div className='flex justify-between items-center text-sm'>
              <span className='bg-blue-100 text-blue-600 px-3 py-1 rounded-full'>
                {detailProduct.category.toUpperCase()}
              </span>
              <div className='flex items-center text-gray-500'>
                <ShoppingBag className='w-4 h-4 mr-1' />
                In Stock
              </div>
            </div>

            <motion.button
              onClick={() => alert("Added to Cart")}
              className='w-full py-2 bg-green-500 text-white mt-5 rounded-lg shadow hover:bg-green-600 transition'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}>
              Add to Cart
            </motion.button>
          </div>
        </DialogContent>
      </motion.div>
    </Dialog>
  )
}
