"use client"
import Banner from "@/components/AutoSlider"
import Loader from "@/components/Loader"
import { ProductCard } from "@/components/ProductCard"
import { DataContext } from "@/context/DataProvider"
import { ProductsDataTypes } from "@/types/dataTypes"
import React, { useContext, useMemo } from "react"

const KidsPage = () => {
  const dataContext = useContext(DataContext)

  if (!dataContext) {
    throw new Error(
      "ProductsContainer must be used within a DataContextProvider"
    )
  }

  const { products, loading } = dataContext

  const kidsProduct : ProductsDataTypes[] = useMemo(() => {
    return products.filter(
      (product: ProductsDataTypes) => product.category === "kids"
    )
  }, [products])

  return (
    <div>
      <Banner />
      <div className='md:px-[10%] px-[5%]'>
        {loading ? (
          <Loader />
        ) : kidsProduct?.length > 0 ? (
          <div className='grid justify-center items-center 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 gap-5 py-7 md:py-20'>
            {kidsProduct.map((product: ProductsDataTypes) => (
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

export default KidsPage
