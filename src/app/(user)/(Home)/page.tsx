"use client"
import { ProductsDataTypes } from "@/app/admin/products/page"
import Banner from "@/components/AutoSlider"
import Loader from "@/components/Loader"
import Marquee from "@/components/marquee"
import { ProductCard } from "@/components/ProductCard"
import categories, { categoriesTypes } from "@/const/categories"
import api from "@/Utility/axiosInstance"
import Image from "next/image"
import React, { useEffect, useState } from "react"

const Home = () => {
  const [productsData, setProductsData] = useState<ProductsDataTypes[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await api.get("/api/products")

        if (response.status === 200) {
          setProductsData(response.data.products)
        } else {
          console.log("Failed to fetch data")
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <Banner />
      <div className='mx-[10%]'>
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
        {isLoading ? (
          <Loader />
        ) : productsData?.length > 0 ? (
          <div className='grid justify-center items-center 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 gap-5 py-20'>
            {productsData.map((product) => (
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
