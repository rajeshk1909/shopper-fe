"use client"

import { useContext, useState } from "react"
import { Star, ShoppingBag, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ProductDetailModal } from "./ProductDetailModal"
import { DataContext } from "@/context/DataProvider"
import { ProductsDataTypes } from "@/types/dataTypes"

interface ProductCardProps {
  product: ProductsDataTypes
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dataContext = useContext(DataContext)

  if (!dataContext) {
    throw new Error(
      "ProductsContainer must be used within a DataContextProvider"
    )
  }

  const { addToCart } = dataContext

  const [isHovered, setIsHovered] = useState(false)

  const [open, setOpen] = useState<boolean>(false)
  const [detailProduct, setDetailProduct] = useState<ProductsDataTypes>({
    _id: "",
    name: "",
    price: 0,
    discountPercentage: 0,
    category: "",
    starRating: 0,
    image: "",
    discountPrice: 0,
  })

  const handleClose = () => {
    setOpen(false)
  }

  const handleQuickView = (product: ProductsDataTypes) => {
    setOpen(true)
    setDetailProduct(product)
    setIsHovered(false)
  }

  const handleAddToCart = (id : string) => {
    addToCart(id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-[350px] min-w-[300px] sm:min-w-[270px]'>
      <div
        className='overflow-hidden bg-white shadow-md rounded-lg relative group border border-gray-200'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* Image Section */}
        <motion.div
          className='relative h-48 overflow-hidden rounded-t-lg'
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}>
          <Image
            src={product.image}
            alt={product.name}
            className='object-fill'
            width={300}
            height={200}
            loading='lazy'
          />

          <div className='absolute top-3 left-3 group-hover:top-4 group-hover:left-5 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium'>
            -{product.discountPercentage}%
          </div>

          <motion.div
            className='absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}>
            <motion.button
              onClick={() => handleQuickView(product)}
              className='bg-white text-black px-3 py-1 rounded-full font-medium text-sm transform hover:scale-105 transition-transform'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.7 }}>
              Quick View
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <div className='p-4 space-y-2'>
          <div className='flex justify-between items-start'>
            <h3 className='text-sm font-medium truncate'>{product.name}</h3>
            <div className='flex items-center'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < product.starRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Category and Stock */}
          <div className='flex justify-between items-center text-xs'>
            <span className='bg-blue-100 text-blue-600 px-2 py-1 rounded-full'>
              {product.category}
            </span>
            <div className='flex items-center text-gray-500'>
              <ShoppingBag className='w-3 h-3 mr-1' />
              In Stock
            </div>
          </div>

          {/* Pricing and Add to Cart */}
          <div className='flex justify-between items-center'>
            <div>
              <div className='flex items-center gap-2'>
                <span className='text-lg font-bold text-green-600'>
                  ₹{Math.floor(product.discountPrice)}
                </span>
                <span className='text-xs text-gray-500 line-through'>
                  ₹{Math.floor(product.price)}
                </span>
              </div>
              <div className='flex items-center text-xs text-green-500'>
                <TrendingUp className='w-3 h-3 mr-1' />
                Price dropped
              </div>
            </div>
            <motion.button
              onClick={() => handleAddToCart(product._id)}
              className='bg-green-500 text-white px-3 py-1 rounded-full font-medium shadow hover:bg-green-600 text-sm'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Add to Cart
            </motion.button>
          </div>
        </div>
        <ProductDetailModal
          detailProduct={detailProduct}
          open={open}
          onClose={handleClose}
        />
      </div>
    </motion.div>
  )
}
