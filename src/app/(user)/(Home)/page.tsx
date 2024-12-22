"use client"
import Banner from "@/components/AutoSlider"
import Loader from "@/components/Loader"
import Marquee from "@/components/marquee"
import { ProductCard } from "@/components/ProductCard"
import categories, { categoriesTypes } from "@/const/categories"
import { DataContext } from "@/context/DataProvider"
import Image from "next/image"
import React, { useContext, useMemo } from "react"

const Home: React.FC = () => {
  const dataContext = useContext(DataContext)

  if (!dataContext) {
    throw new Error(
      "ProductsContainer must be used within a DataContextProvider"
    )
  }

  const { products, loading } = dataContext

  const shuffledProduct = useMemo(() => {
    return products.sort(() => Math.random() - 0.5)
  }, [products])

  return (
    <div>
      <Banner />
      <div className='md:px-[10%] px-[5%]'>
        <Marquee>
          {categories.map((item: categoriesTypes, index: number) => (
            <div
              key={index}
              className='flex w-[300px] hover:cursor-pointer justify-between text-sm p-5 rounded-xl border bg-white shadow-sm hover:scale-105 duration-500 transition-all border-gradient-to-r from-gray-300 to-gray-100'>
              <div className='flex items-center justify-center gap-5'>
                <div className='h-14 w-14 bg-gray-100 rounded-md flex items-center justify-center'>
                  <Image
                    src={item.imgSrc}
                    alt={item.altText}
                    width={32}
                    height={32}
                  />
                </div>
                <div className=''>
                  <p className='font-semibold text-gray-800'>{item.title}</p>
                  <button className='text-sm font-medium text-red-500 hover:text-red-600 transition-all'>
                    Show All
                  </button>
                </div>
              </div>
              <p className='text-gray-500 text-xs'>{`(${item.amount})`}</p>
            </div>
          ))}
        </Marquee>

        {/* product */}
        {loading ? (
          <Loader />
        ) : shuffledProduct?.length > 0 ? (
          <div className='grid justify-center items-center 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 gap-5 py-7 md:py-20'>
            {shuffledProduct.slice(0, 12).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className='text-center text-gray-500'>No products available.</p>
        )}
      </div>
    </div>
  )
}

export default Home
