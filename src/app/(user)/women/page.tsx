"use client"
import { ProductsDataTypes } from "@/app/admin/products/page"
import Banner from "@/components/AutoSlider"
import Loader from "@/components/Loader"
import { ProductCard } from "@/components/ProductCard"
import api from "@/Utility/axiosInstance"
import React, { useEffect, useState } from "react"

const WomensPage = () => {
  const [productsData, setProductsData] = useState<ProductsDataTypes[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await api.get("/api/products")

        if (response.status === 200) {
          const data = response.data.products

          const filterdData = data.filter(
            (data: ProductsDataTypes) => data.category === "women"
          )
          setProductsData(filterdData)
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
      <div className='md:px-[10%] px-[5%]'>
        {isLoading ? (
          <Loader />
        ) : productsData?.length > 0 ? (
          <div className='grid justify-center items-center 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 gap-5 py-7 md:py-20'>
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

export default WomensPage
